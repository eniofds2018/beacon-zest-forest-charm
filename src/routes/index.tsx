import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppShell } from "@/components/research/shell";
import { useResearch } from "@/lib/research/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  useEffect(() => {
    void useResearch.persist.rehydrate();
  }, []);
  return <AppShell />;
}
