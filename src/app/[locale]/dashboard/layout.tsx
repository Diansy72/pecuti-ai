"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (!auth) {
      router.replace("/id/login");
    } else {
      setIsAuthed(true);
    }
  }, [router]);

  if (isAuthed === null) {
    // Loading state while checking auth
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)]">
        <div className="w-8 h-8 border-3 border-[var(--primary)]/30 border-t-[var(--primary)] rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
