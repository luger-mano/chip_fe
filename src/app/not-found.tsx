import Link from "next/link";

export default function NotFound() {
  return (
    <section className="message">
      <h1>Página não encontrada</h1>
      <p>O endereço acessado não existe ou foi alterado.</p>
      <Link className="button" href="/">Voltar ao início</Link>
    </section>
  );
}
