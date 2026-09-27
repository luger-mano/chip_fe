"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import styles from "./create-account-screen.module.css";

const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const genders = ["Homem", "Mulher", "Não binário", "Outro", "Prefiro não dizer"];
const titles = ["Quase lá. Só falta uma senha", "Vamos deixar do seu jeito.", "Termos de Uso · Política de Privacidade"];

function Arrow({ back = false }: { back?: boolean }) {
  return <span className={back ? styles.arrowBack : styles.arrow} aria-hidden="true" />;
}

export function CreateAccountScreen() {
  const router = useRouter();
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [news, setNews] = useState(false);
  const [partnerNews, setPartnerNews] = useState(false);
  const [message, setMessage] = useState("");
  const rules = [/[A-Za-zÀ-ÿ]/.test(password), password.length >= 8, /[\d\W_]/.test(password)];
  const currentYear = new Date().getFullYear();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    if (step === 1) {
      if (!rules.every(Boolean)) {
        setMessage("Crie uma senha que atenda aos três requisitos.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (Number(year) > currentYear) {
        setMessage("O ano de nascimento não pode estar no futuro.");
        return;
      }
      const birthDate = new Date(Number(year), Number(month) - 1, Number(day));
      const valid = birthDate.getFullYear() === Number(year) && birthDate.getMonth() === Number(month) - 1 && birthDate.getDate() === Number(day) && birthDate <= new Date();
      if (!valid) {
        setMessage("Informe uma data de nascimento válida.");
        return;
      }
      setStep(3);
    } else {
      router.push("/cadastro/confirmar-token");
    }
  }

  function goBack() {
    setMessage("");
    setStep((value) => Math.max(1, value - 1));
  }

  return (
    <section className={styles.screen} aria-label="Criar conta no CHIP">
      <div className={styles.layout}>
        <div className={styles.logo}><Image src="/images/auth/logo-chip-white.svg" alt="CHIP" width={167} height={50} priority /></div>
        <div className={styles.progress} role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3} aria-label="Etapa do cadastro"><span style={{ width: `${step / 3 * 100}%` }} /></div>
        <p className={styles.stepCount}>Etapa <span className={step === 3 ? styles.finalStep : undefined}>{step} de 3</span></p>
        <div className={styles.formArea}>
          <div className={styles.headingRow} data-step={step}>
            {step === 1
              ? <Link className={styles.backButton} href="/cadastro" aria-label="Voltar ao cadastro"><Arrow back /></Link>
              : <button className={styles.backButton} type="button" onClick={goBack} aria-label="Voltar à etapa anterior"><Arrow back /></button>}
            <h1>{titles[step - 1]}</h1>
          </div>
          <form className={styles.form} onSubmit={submit}>
            {step === 1 && <>
              <label className={styles.fieldLabel} htmlFor="password">Senha</label>
              <div className={styles.passwordField}>
                <input ref={passwordInputRef} id="password" type={visible ? "text" : "password"} value={password} onChange={(event) => { setPassword(event.target.value); setMessage(""); }} placeholder="••••••••" autoComplete="new-password" required aria-describedby="password-rules" />
                <button type="button" onClick={() => { setVisible(!visible); passwordInputRef.current?.focus(); }} aria-label={visible ? "Ocultar senha" : "Mostrar senha"} aria-pressed={visible}>
                  {visible ? <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M1 10s3.25-5.5 9-5.5 9 5.5 9 5.5-3.25 5.5-9 5.5S1 10 1 10Z" stroke="currentColor" strokeWidth="1.5"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/></svg> : <Image src="/images/auth/password-hidden.svg" alt="" width={20} height={20} />}
                </button>
              </div>
              <div className={styles.requirements} id="password-rules">
                <p>Sua senha precisa ter pelo menos</p>
                <ul>
                  <li><span className={rules[0] ? styles.checked : styles.check} aria-hidden="true">{rules[0] ? "✓" : ""}</span>1 letra</li>
                  <li><span className={rules[1] ? styles.checked : styles.check} aria-hidden="true">{rules[1] ? "✓" : ""}</span>8 caracteres</li>
                  <li><span className={rules[2] ? styles.checked : styles.check} aria-hidden="true">{rules[2] ? "✓" : ""}</span>1 número ou caractere especial <span className={styles.muted}>(ex: # ? ! &amp;)</span></li>
                </ul>
              </div>
            </>}
            {step === 2 && <>
              <label className={styles.fieldLabel} htmlFor="name">Nome</label>
              <p className={styles.nameHint}>É assim que você aparecerá na plataforma.</p>
              <input className={styles.textField} id="name" name="name" type="text" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required />
              <fieldset className={styles.genderField}>
                <legend>Gênero</legend>
                <p className={styles.hint}>Você pode preferir não responder.</p>
                <div className={styles.genderOptions}>{genders.map((option) => <label key={option}><input type="radio" name="gender" value={option} checked={gender === option} onChange={() => setGender(option)} /><span>{option}</span></label>)}</div>
              </fieldset>
              <fieldset className={styles.birthField}>
                <legend>Data de Nascimento</legend>
                <p className={styles.hint}>Precisamos dessa informação para garantir que sua experiência esteja de acordo com sua faixa etária.</p>
                <div className={styles.birthInputs}>
                  <input aria-label="Dia de nascimento" type="text" inputMode="numeric" autoComplete="bday-day" placeholder="Dia" maxLength={2} pattern="[0-9]{1,2}" value={day} onChange={(event) => setDay(event.target.value.replace(/\D/g, ""))} required />
                  <select aria-label="Mês de nascimento" value={month} onChange={(event) => setMonth(event.target.value)} required><option value="" disabled>Mês</option>{months.map((value, index) => <option key={value} value={index + 1}>{value}</option>)}</select>
                  <input aria-label="Ano de nascimento" type="text" inputMode="numeric" autoComplete="bday-year" placeholder="Ano" maxLength={4} pattern="[0-9]{4}" value={year} onChange={(event) => setYear(event.target.value.replace(/\D/g, ""))} required />
                </div>
              </fieldset>
            </>}
            {step === 3 && <>
              <label className={styles.choiceCard}><input type="checkbox" checked={news} onChange={(event) => setNews(event.target.checked)} /><span><strong>Quero receber novidades</strong><small>Receba novidades sobre novos artistas, lançamentos, playlists e recursos da plataforma.</small></span></label>
              <label className={styles.choiceCard}><input type="checkbox" checked={partnerNews} onChange={(event) => setPartnerNews(event.target.checked)} /><span><strong>Quero receber ofertas e novidades de parceiros</strong><small>Podemos usar seus dados para enviar comunicações de parceiros e conteúdos que possam ser relevantes para você.</small></span></label>
              <p className={styles.agreement}>Ao continuar, você concorda com nossos <span>Termos de Uso</span> e reconhece que leu nossa <span>Política de privacidade</span>.</p>
            </>}
            <button className={styles.nextButton} type="submit" aria-label={step === 3 ? undefined : "Continuar para a próxima etapa"}>{step === 3 ? "Começar" : <Arrow />}</button>
            {message && <p className={styles.feedback} role="status">{message}</p>}
          </form>
        </div>
        <footer className={styles.legal}>This site is protected by reCAPTCHA and the Google<br className={styles.desktopBreak} />{" "}<a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms of Service</a> apply.</footer>
      </div>
    </section>
  );
}
