import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Accueil" },
  { to: "/nouveautes", label: "Nouveautés" },
  { to: "/collections", label: "Collections" },
  { to: "/ensembles", label: "Ensembles" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <div className="bg-primary py-2.5 text-center text-primary-foreground">
        <p className="eyebrow text-[0.6rem] opacity-90">Livraison partout en Tunisie · Paiement à la livraison</p>
      </div>
      <header className={cn("sticky top-0 z-40 border-b bg-background/95 backdrop-blur transition-all", scrolled ? "border-border" : "border-transparent")}>
        <div className={cn("mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-5 transition-all md:px-10", scrolled ? "py-3" : "py-6")}>
          <button className="lg:hidden" aria-label="Menu" onClick={() => setOpen(true)}>
            <Menu className="h-5 w-5 stroke-[1.25] text-primary" />
          </button>
          <nav className="hidden gap-7 lg:flex">
            {NAV.slice(0, 3).map((n) => (
              <Link key={n.to} to={n.to} className="eyebrow link-underline text-[0.62rem] text-primary" activeProps={{ className: "text-gold" }} activeOptions={{ exact: true }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <Link to="/" className={cn("font-serif tracking-[0.35em] text-primary transition-all", scrolled ? "text-2xl" : "text-3xl md:text-4xl")}>
            ARIMENE
          </Link>
          <div className="flex items-center justify-end gap-7">
            <nav className="hidden gap-7 lg:flex">
              {NAV.slice(3).map((n) => (
                <Link key={n.to} to={n.to} className="eyebrow link-underline text-[0.62rem] text-primary" activeProps={{ className: "text-gold" }}>
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4 text-primary">
              <button aria-label="Rechercher" className="hidden sm:block"><Search className="h-[18px] w-[18px] stroke-[1.25]" /></button>
              <button aria-label="Compte" className="hidden sm:block"><User className="h-[18px] w-[18px] stroke-[1.25]" /></button>
              <Link to="/panier" aria-label="Panier" className="relative">
                <ShoppingBag className="h-[18px] w-[18px] stroke-[1.25]" />
                {count > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[0.55rem] text-primary-foreground">{count}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background px-8 py-6 animate-in fade-in lg:hidden">
          <div className="flex items-center justify-between">
            <span className="font-serif text-2xl tracking-[0.35em] text-primary">ARIMENE</span>
            <button aria-label="Fermer" onClick={() => setOpen(false)}><X className="h-5 w-5 stroke-[1.25] text-primary" /></button>
          </div>
          <nav className="mt-16 flex flex-col gap-6">
            {NAV.map((n, i) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="display animate-rise text-5xl text-primary" style={{ animationDelay: `${i * 60}ms` }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <p className="eyebrow mt-auto text-[0.6rem] text-gold">Mode pudique · Tunisie</p>
        </div>
      )}
    </>
  );
}

export function Footer() {
  const col = "eyebrow mb-6 text-[0.6rem] text-gold";
  const li = "text-sm text-primary-foreground/75 transition-colors hover:text-primary-foreground";
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1440px] px-6 pb-10 pt-20 md:px-10">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-serif text-4xl tracking-[0.35em]">ARIMENE</p>
            <p className="mt-6 max-w-xs font-serif text-xl italic text-primary-foreground/70">La beauté dans chaque détail.</p>
          </div>
          <div>
            <p className={col}>Boutique</p>
            <ul className="space-y-3">
              <li><Link to="/nouveautes" className={li}>Nouveautés</Link></li>
              <li><Link to="/collections" className={li}>Collections</Link></li>
              <li><Link to="/ensembles" className={li}>Ensembles</Link></li>
            </ul>
          </div>
          <div>
            <p className={col}>Service client</p>
            <ul className="space-y-3">
              <li><Link to="/contact" className={li}>Contact</Link></li>
              <li><span className={li}>Livraison & retours</span></li>
              <li><span className={li}>Guide des tailles</span></li>
              <li><Link to="/a-propos" className={li}>À propos</Link></li>
            </ul>
          </div>
          <div>
            <p className={col}>Nous suivre</p>
            <ul className="space-y-3">
              <li><span className={li}>Instagram</span></li>
              <li><span className={li}>Facebook</span></li>
              <li><span className={li}>TikTok</span></li>
            </ul>
            <p className="mt-8 text-sm text-primary-foreground/60">+216 00 000 000<br />contact@arimene.tn</p>
          </div>
        </div>
        <div className="mt-20 flex flex-col justify-between gap-4 border-t border-gold/25 pt-8 text-xs text-primary-foreground/50 md:flex-row">
          <span>© {new Date().getFullYear()} ARIMENE. Tous droits réservés.</span>
          <span className="eyebrow text-[0.56rem]">Fait avec soin en Tunisie</span>
        </div>
      </div>
    </footer>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-12 pt-16 text-center md:px-10 md:pt-24">
      <p className="eyebrow text-gold">{eyebrow}</p>
      <h1 className="display mt-5 text-6xl text-primary md:text-8xl">{title}</h1>
      {children && <div className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">{children}</div>}
      <div className="mx-auto mt-10 h-px w-16 bg-gold" />
    </section>
  );
}

export function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <section className="border-t border-border">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-24 md:grid-cols-2 md:items-end md:px-10">
        <div>
          <p className="eyebrow text-gold">Le cercle ARIMENE</p>
          <h2 className="display mt-4 text-5xl text-primary md:text-6xl">Recevez nos nouveautés <em>en avant-première</em>.</h2>
        </div>
        {done ? (
          <p className="font-serif text-2xl italic text-primary">Merci, bienvenue dans le cercle.</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="flex items-end gap-6">
            <input type="email" required placeholder="Votre adresse e-mail" className="field" />
            <button className="btn-primary shrink-0">S'inscrire</button>
          </form>
        )}
      </div>
    </section>
  );
}
