"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/id/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB]">
      <div className="w-8 h-8 border-3 border-[#003B73]/30 border-t-[#003B73] rounded-full animate-spin" />
    </div>
  );
}
