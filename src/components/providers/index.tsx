"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { RoleProvider } from "./role-context";
import { RoleGate } from "../role/RoleGate";
import { PWARegister } from "./PWARegister";
import { ThemeProvider } from "./theme-provider"; // Added import

type Props = {
  children: ReactNode;
};

export function Providers({ children }: Props) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 30,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <ThemeProvider>
      <QueryClientProvider client={client}>
        <RoleProvider>
          {children}
          <RoleGate />
          <PWARegister />
        </RoleProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}


