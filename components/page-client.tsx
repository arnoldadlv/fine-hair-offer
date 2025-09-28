"use client";

import { useEffect, ReactNode } from "react";

import { trackViewContent } from "@/lib/facebook-client";

interface PageClientProps {
  children: ReactNode;
}

export default function PageClient({ children }: PageClientProps) {
  useEffect(() => {
    trackViewContent();
  }, []);

  return <>{children}</>;
}
