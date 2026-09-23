import type { Metadata } from "next";
import { LoginScreen } from "@/features/auth/components/login-screen";

export const metadata: Metadata = { title: "Cadastro" };

export default function SignupPage() {
  return <LoginScreen variant="signup" />;
}
