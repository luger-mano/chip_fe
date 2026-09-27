"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore, type ClipboardEvent, type FormEvent, type KeyboardEvent } from "react";
import styles from "./token-confirmation-screen.module.css";

const emptySubscribe = () => () => {};
const getStoredIdentifier = () => sessionStorage.getItem("chip-signup-identifier") ?? "";
const getServerIdentifier = () => "";

function maskDestination(stored: string) {
  try {
    const { method, value } = JSON.parse(stored) as { method?: string; value?: string };
    if (method === "email" && value?.includes("@")) {
      const [local, domain] = value.split("@");
      const [host, ...suffix] = domain.split(".");
      const maskedLocal = local.length > 1 ? local[0] + "*****" + local.at(-1) : local + "*****";
      const maskedHost = host.length > 1 ? host[0] + "*" + host.at(-1) : host + "*";
      return { label: "e-mail", value: maskedLocal + "@" + maskedHost + (suffix.length ? "." + suffix.join(".") : "") };
    }
    if (method === "phone" && value) {
      const numbers = value.replace(/\D/g, "");
      return { label: "celular", value: "••••••" + numbers.slice(-4) };
    }
  } catch {
    // Direct visits may not have an identifier from the signup screen.
  }
  return { label: "seu e-mail", value: "" };
}

export function TokenConfirmationScreen() {
  const storedIdentifier = useSyncExternalStore(emptySubscribe, getStoredIdentifier, getServerIdentifier);
  const destination = maskDestination(storedIdentifier);
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [message, setMessage] = useState("");
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  function updateDigit(index: number, value: string) {
    const numbers = value.replace(/\D/g, "").slice(0, 6 - index);
    if (numbers.length > 1) {
      setDigits((previous) => {
        const next = [...previous];
        for (let offset = 0; offset < numbers.length; offset++) next[index + offset] = numbers[offset];
        return next;
      });
      inputs.current[Math.min(index + numbers.length, 5)]?.focus();
    } else {
      setDigits((previous) => previous.map((current, position) => position === index ? numbers : current));
      if (numbers && index < 5) inputs.current[index + 1]?.focus();
    }
    setMessage("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>, index: number) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      inputs.current[index - 1]?.focus();
    }
    if (event.key === "ArrowRight" && index < 5) {
      event.preventDefault();
      inputs.current[index + 1]?.focus();
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>, index: number) {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6 - index);
    if (!pasted) return;
    event.preventDefault();
    setDigits((previous) => {
      const next = [...previous];
      for (let offset = 0; offset < pasted.length; offset++) next[index + offset] = pasted[offset];
      return next;
    });
    setMessage("");
    inputs.current[Math.min(index + pasted.length, 5)]?.focus();
  }

  function confirm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(digits.some((digit) => !digit)
      ? "Digite os seis números do código."
      : "A confirmação do código estará disponível quando a integração de token for habilitada.");
  }

  return (
    <section className={styles.screen} aria-label="Confirmação do código">
      <div className={styles.layout}>
        <div className={styles.content}>
          <Link className={styles.backButton} href="/cadastro/criar-conta" aria-label="Voltar às etapas de cadastro"><span aria-hidden="true" /></Link>
          <h1>Confirmar o código enviado<br className={styles.desktopBreak} /> para o {destination.label}{destination.value ? " " + destination.value : ""}</h1>
          <form onSubmit={confirm}>
            <div className={styles.codeInputs} role="group" aria-label="Código de confirmação de seis dígitos">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => { inputs.current[index] = element; }}
                  aria-label={"Dígito " + (index + 1) + " do código"}
                  type="text"
                  inputMode="numeric"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  pattern="[0-9]*"
                  maxLength={6}
                  autoFocus={index === 0}
                  value={digit}
                  onChange={(event) => updateDigit(index, event.target.value)}
                  onFocus={(event) => event.target.select()}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  onPaste={(event) => handlePaste(event, index)}
                />
              ))}
            </div>
            <button className={styles.resendButton} type="button" onClick={() => setMessage("O reenvio do código estará disponível quando a integração de token for habilitada.")}>Gerar outro código</button>
            <button className={styles.confirmButton} type="submit">Confirmar</button>
          </form>
          <button className={styles.passwordButton} type="button" onClick={() => setMessage("O acesso por senha estará disponível quando a autenticação for integrada.")}>Digitar senha</button>
          {message && <p className={styles.feedback} role="status">{message}</p>}
        </div>
        <footer className={styles.legal}>This site is protected by reCAPTCHA and the Google<br className={styles.desktopBreak} />{" "}<a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms of Service</a> apply.</footer>
      </div>
    </section>
  );
}
