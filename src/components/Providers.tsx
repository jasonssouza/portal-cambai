'use client';

import { SessionProvider } from "next-auth/react";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ReactQueryProvider>
        {children}
      </ReactQueryProvider>
    </SessionProvider>
  );
}