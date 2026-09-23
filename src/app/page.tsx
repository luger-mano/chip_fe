import type { Metadata } from "next";
import { HomeWelcome } from "@/features/home/components/home-welcome";

export const metadata: Metadata = {
  title: "CHIP",
  icons: {
    icon: { url: "/images/auth/white-logo.svg", type: "image/svg+xml" },
  },
};

export default function HomePage() {
  return <HomeWelcome />;
}
