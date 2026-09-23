"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import styles from "./login-screen.module.css";

type LoginScreenProps = {
  variant?: "login" | "signup";
};

export function LoginScreen({ variant = "login" }: LoginScreenProps) {
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const isPhone = method === "phone";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("O acesso ainda não está disponível. A integração de autenticação será habilitada em breve.");
  }

  function switchMethod() {
    setMethod(isPhone ? "email" : "phone");
    setMessage("");
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  return (
    <section className={styles.screen} aria-label={variant === "signup" ? "Cadastro no CHIP" : "Acesse o CHIP"}>
      <div className={styles.content}>
        <h1 className={styles.logo}>
          <Image src="/images/auth/white-logo.svg" alt="CHIP" width={170} height={51} priority />
        </h1>

        <form className={styles.form} onSubmit={submit}>
          <label htmlFor="login-identifier">{isPhone ? "Celular" : "Email"}</label>
          <div className={styles.emailRow}>
            <input
              key={method}
              ref={inputRef}
              id="login-identifier"
              name={method}
              type={isPhone ? "tel" : "email"}
              autoComplete={isPhone ? "tel" : "email"}
              placeholder={isPhone ? "(11) 99999-9999" : "john@doe.com"}
              pattern={isPhone ? "[+0-9() .-]{8,20}" : undefined}
              title={isPhone ? "Informe seu número com DDD." : undefined}
              required
              onChange={() => setMessage("")}
              aria-describedby={message ? "login-message" : undefined}
            />
            <button className={styles.continueButton} type="submit" aria-label={isPhone ? "Continuar com celular" : "Continuar com email"}>
              <Image src="/images/auth/arrow-right.svg" alt="" width={24} height={24} />
            </button>
          </div>
        </form>

        <div className={styles.divider}>ou</div>

        <div className={styles.providers}>
          <button className={styles.provider} type="button" onClick={switchMethod}>
            <Image className={styles.providerIcon} src="/images/auth/phone.svg" alt="" width={30} height={36} />
            <span>{isPhone ? "Entrar com o seu email" : "Entrar com o seu número de celular"}</span>
          </button>
          <button className={styles.provider} type="button" onClick={() => setMessage("O acesso com Google ainda não está disponível.")}>
            <Image className={styles.providerIcon} src="/images/auth/google.svg" alt="" width={30} height={30} />
            <span>Começar com o Google</span>
          </button>
          <button className={styles.provider} type="button" onClick={() => setMessage("O acesso com Apple ainda não está disponível.")}>
            <Image className={styles.providerIcon} src="/images/auth/apple.svg" alt="" width={30} height={30} />
            <span>Começar com a Apple</span>
          </button>
        </div>

        <div className={styles.existingAccount}>
          <p>{variant === "login" ? "Não está na cena?" : "Já está na cena?"}</p>
          <Link href={variant === "login" ? "/cadastro" : "/login"} prefetch scroll={false}>
            {variant === "login" ? "Abrir Conta" : "Entrar"}
          </Link>
        </div>

        <p className={styles.feedback} id="login-message" role="status">{message}</p>

        <footer className={styles.legal}>
          This site is protected by reCAPTCHA and the Google<br className={styles.desktopBreak} />{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>{" "}
          and <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms of Service</a> apply.
        </footer>
      </div>
    </section>
  );
}
