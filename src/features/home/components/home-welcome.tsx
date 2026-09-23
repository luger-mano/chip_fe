import Image from "next/image";
import Link from "next/link";
import styles from "./home-welcome.module.css";

export function HomeWelcome() {
  return (
    <section className={styles.screen} aria-labelledby="welcome-title">
      <Image
        src="/images/home/chip-welcome.svg"
        alt="CHIP"
        width={1068}
        height={522}
        priority
        className={styles.artwork}
      />
      <div className={styles.actions}>
        <h1 id="welcome-title">Acessar com uma conta gratuita</h1>
        <Link href="/cadastro" prefetch className={styles.signup}>Abrir conta</Link>
        <Link href="/login" prefetch className={styles.login}>Já tenho uma conta</Link>
      </div>
    </section>
  );
}
