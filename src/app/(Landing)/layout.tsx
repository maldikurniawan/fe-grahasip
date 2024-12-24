"use client";

import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const access = localStorage.getItem("access");
    if (access) {
      router.push("/dashboard");
    }
  }, [router]);

  return <div>{children}</div>;
};

export default RootLayout;
