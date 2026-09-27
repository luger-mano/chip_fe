import type { Metadata } from "next";
import { CreateAccountScreen } from "@/features/auth/components/create-account-screen";

export const metadata: Metadata = { title: "Criar conta" };

export default function CreateAccountPage() {
  return <CreateAccountScreen />;
}
