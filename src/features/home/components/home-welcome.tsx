import styles from "./home-welcome.module.css";

export function HomeWelcome() {
  return (
    <section className={styles.hero} aria-labelledby="welcome-title">
      <span className={styles.eyebrow}>BEM-VINDO AO CHIP</span>
      <h1 id="welcome-title">Grandes ideias.<br /><span>Novos começos.</span></h1>
      <p>Estamos preparando uma nova experiência. Este é o primeiro passo de tudo o que vem pela frente.</p>
      <div className={styles.status}><span aria-hidden="true" />Projeto em construção</div>
    </section>
  );
}
