"use client";
import { useEffect, useState } from "react";
import Loading from "@/app/Loading";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <Loading /> : children;
}