"use client";

import { useEffect, useMemo, useState } from "react";
import { useRole } from "@/components/providers/role-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

const roleDescriptions = [
  { key: "juri", title: "Juri", detail: "Tanpa login, langsung lihat data dummy paling lengkap." },
  { key: "farmasis", title: "Farmasis", detail: "Privilege sama dengan admin untuk mengeksplor modul klinis." },
  { key: "admin", title: "Admin", detail: "God mode: pengaturan integrasi + data dummy aggregator." },
  { key: "dummy", title: "Dummy Presenter", detail: "Mode autopilot untuk pitching & demo rekaman." },
  { key: "pengguna", title: "Pengguna biasa", detail: "Lihat kanvas kosong, wajib daftar/login untuk menyimpan data nyata." },
] as const;

type AuthMode = "login" | "register";

export function RoleGate() {
  const {
    role,
    mode,
    hydrated,
    chooseRole,
    loginPengguna,
    registerPengguna,
    loginWithGoogle,
    clearRole,
    savePersonaName,
  } = useRole();
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [nameModalOpen, setNameModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [pendingRole, setPendingRole] = useState<typeof roleDescriptions[number]["key"] | null>(null);
  const [tempName, setTempName] = useState("");
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState<string | null>(null);
  const [pendingAuth, setPendingAuth] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    if (!role) {
      setRoleModalOpen(true);
    } else {
      setRoleModalOpen(false);
    }
  }, [hydrated, role]);

  useEffect(() => {
    const openAuth = () => {
      setPendingRole("pengguna");
      setRoleModalOpen(false);
      setAuthModalOpen(true);
    };
    document.addEventListener("open-auth-modal", openAuth);
    return () => document.removeEventListener("open-auth-modal", openAuth);
  }, []);

  const badgeText = useMemo(() => {
    if (!hydrated) return "Memuat...";
    if (!role) return "Belum memilih";
    return mode === "demo" ? "Demo dummy" : "Empty state";
  }, [hydrated, role, mode]);

  const handleRoleSelect = (selected: typeof roleDescriptions[number]["key"]) => {
    setPendingRole(selected);
    if (selected === "pengguna") {
      setRoleModalOpen(false);
      setAuthModalOpen(true);
    } else {
      setTempName("");
      setRoleModalOpen(false);
      setNameModalOpen(true);
    }
  };

  const submitName = () => {
    if (!pendingRole) return;
    savePersonaName(tempName || pendingRole);
    chooseRole(pendingRole);
    setNameModalOpen(false);
  };

  const submitAuth = async () => {
    try {
      setPendingAuth(true);
      setFormError(null);
      if (authMode === "login") {
        await loginPengguna(credentials.email, credentials.password);
      } else {
        await registerPengguna(credentials.email, credentials.password);
      }
      setAuthModalOpen(false);
    } catch (error) {
      setFormError((error as Error).message);
    } finally {
      setPendingAuth(false);
    }
  };

  const submitGoogle = async () => {
    try {
      setPendingAuth(true);
      await loginWithGoogle();
      setAuthModalOpen(false);
    } catch (error) {
      setFormError((error as Error).message);
    } finally {
      setPendingAuth(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="fixed bottom-6 right-6 z-30 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white/70 backdrop-blur"
        onClick={() => setRoleModalOpen(true)}
      >
        Role: {badgeText}
      </button>

      <AnimatePresence>
        {roleModalOpen && (
          <motion.div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="w-full max-w-4xl rounded-[32px] border border-white/10 bg-[#070b16] p-8 text-white shadow-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/40">Pilih pengalaman</p>
                  <h3 className="text-3xl font-semibold text-white">Siapa kamu hari ini?</h3>
                </div>
                <Button variant="ghost" onClick={() => clearRole()}>
                  Reset pilihan
                </Button>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {roleDescriptions.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleRoleSelect(item.key)}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      role === item.key ? "border-aurora-300 bg-aurora-300/10" : "border-white/10 bg-white/5"
                    }`}
                  >
                    <p className="text-lg font-semibold">{item.title}</p>
                    <p className="text-sm text-white/70">{item.detail}</p>
                    {item.key !== "pengguna" && <p className="mt-2 text-xs text-emerald-200">Tidak perlu login</p>}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {nameModalOpen && (
          <motion.div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="w-full max-w-md rounded-[32px] border border-white/10 bg-[#070b16] p-6 text-white shadow-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <h3 className="text-2xl font-semibold">Masukkan nama tampilan</h3>
              <p className="text-sm text-white/70">Kami gunakan nama ini ketika menampilkan data dummy Anda.</p>
              <Input className="mt-4" placeholder="Nama tampilan" value={tempName} onChange={(e) => setTempName(e.target.value)} />
              <div className="mt-4 flex gap-3">
                <Button className="flex-1" onClick={submitName}>
                  Mulai eksplor
                </Button>
                <Button variant="secondary" onClick={() => setNameModalOpen(false)}>
                  Batal
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {authModalOpen && (
          <motion.div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="w-full max-w-md rounded-[32px] border border-white/10 bg-[#070b16] p-6 text-white shadow-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="flex gap-3 text-sm">
                <Button variant={authMode === "login" ? "primary" : "ghost"} onClick={() => setAuthMode("login")}>
                  Login
                </Button>
                <Button variant={authMode === "register" ? "primary" : "ghost"} onClick={() => setAuthMode("register")}>
                  Registrasi
                </Button>
              </div>
              <div className="mt-4 grid gap-3">
                <Input
                  type="email"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, email: e.target.value }))}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                />
                {formError && <p className="text-sm text-rose-300">{formError}</p>}
                <Button onClick={submitAuth} disabled={pendingAuth}>
                  {pendingAuth ? "Memproses..." : authMode === "login" ? "Masuk" : "Buat akun"}
                </Button>
                <Button variant="secondary" onClick={submitGoogle} disabled={pendingAuth}>
                  Login dengan Google
                </Button>
                <Button variant="ghost" onClick={() => setAuthModalOpen(false)}>
                  Tutup
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

