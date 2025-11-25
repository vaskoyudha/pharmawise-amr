"use client";

import { ReactNode, createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase/client";

export type ExperienceRole = "juri" | "farmasis" | "admin" | "pengguna" | "dummy";

type ExperienceMode = "demo" | "empty" | "unknown";

type RoleContextValue = {
  role: ExperienceRole | null;
  mode: ExperienceMode;
  user: User | null;
  personaName: string | null;
  hydrated: boolean;
  chooseRole: (role: ExperienceRole) => void;
  loginPengguna: (email: string, password: string) => Promise<void>;
  registerPengguna: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  savePersonaName: (name: string) => void;
  clearRole: () => void;
};

const privilegedRoles: Record<ExperienceRole, ExperienceMode> = {
  juri: "demo",
  farmasis: "demo",
  admin: "demo",
  dummy: "demo",
  pengguna: "empty",
};

const RoleContext = createContext<RoleContextValue | undefined>(undefined);
const ROLE_KEY = "pharmawise-role";
const NAME_KEY = "pharmawise-name";

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<ExperienceRole | null>(null);
  const [personaName, setPersonaName] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedRole = localStorage.getItem(ROLE_KEY) as ExperienceRole | null;
    if (savedRole) {
      setRole(savedRole);
    }
    const savedName = localStorage.getItem(NAME_KEY);
    if (savedName) {
      setPersonaName(savedName);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const chooseRole = useCallback((nextRole: ExperienceRole) => {
    setRole(nextRole);
    if (typeof window !== "undefined") {
      localStorage.setItem(ROLE_KEY, nextRole);
    }
  }, []);

  const savePersonaName = useCallback((name: string) => {
    setPersonaName(name);
    if (typeof window !== "undefined") {
      localStorage.setItem(NAME_KEY, name);
    }
  }, []);

  const clearRole = useCallback(() => {
    setRole(null);
    setPersonaName(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(ROLE_KEY);
      localStorage.removeItem(NAME_KEY);
    }
  }, []);

  const loginPengguna = useCallback(
    async (email: string, password: string) => {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      chooseRole("pengguna");
    },
    [chooseRole]
  );

  const registerPengguna = useCallback(
    async (email: string, password: string) => {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      chooseRole("pengguna");
    },
    [chooseRole]
  );

  const loginWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(firebaseAuth, provider);
    chooseRole("pengguna");
  }, [chooseRole]);

  const mode: ExperienceMode = role ? privilegedRoles[role] : "unknown";

  const value = useMemo(
    () => ({
      role,
      mode,
      user,
      personaName,
      hydrated,
      chooseRole,
      loginPengguna,
      registerPengguna,
      loginWithGoogle,
      savePersonaName,
      clearRole,
    }),
    [role, mode, user, personaName, hydrated, chooseRole, loginPengguna, registerPengguna, loginWithGoogle, savePersonaName, clearRole]
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) {
    throw new Error("useRole must be used within RoleProvider");
  }
  return ctx;
}

