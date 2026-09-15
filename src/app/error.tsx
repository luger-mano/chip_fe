"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="message">
      <h1>Algo deu errado</h1>
      <p>Não foi possível carregar esta página. Tente novamente.</p>
      <button className="button" onClick={reset}>Tentar novamente</button>
    </section>
  );
}
