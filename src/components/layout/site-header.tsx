import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="CHIP — página inicial">
        <span className="brand-mark" aria-hidden="true">c</span>
        {siteConfig.name}
      </Link>
      <span className="header-label">Novas possibilidades começam aqui</span>
    </header>
  );
}
