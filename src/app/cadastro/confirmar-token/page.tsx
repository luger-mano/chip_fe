import type { Metadata } from "next";
import { TokenConfirmationScreen } from "@/features/auth/components/token-confirmation-screen";

export const metadata: Metadata = { title: "Confirmar código" };

export default function ConfirmTokenPage() {
  return <TokenConfirmationScreen />;
}
