import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/lib/catalog";
import { PhotoSlot } from "@/components/site/PhotoSlot";
import { ProductCard } from "@/components/site/ProductCard";
import { Newsletter } from "@/components/site/Layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ARIMENE — L'élégance, naturellement" },
      { name: "description", content: "Mode pudique premium pour femmes : ensembles coordonnés, pantalons larges et hauts élégants." },
      { property: "og:title", content: "ARIMENE — L'élégance, naturellement" },
      { property: "og:description", content: "Mode pudique premium pour femmes, née en Tunisie." },
    ],
  }),
  component: Home,
});

const COLLECTIONS = [
  { title: "Ensembles", to: "/ensembles", n: "01" },
  { title: "Nouveautés", to: "/nouveautes", n: "02" },
  { title: "Collection Femme", to: "/collections", n: "03" },
] as const;

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-[1440px] gap-10 px-6 pb-20 pt-10 md:px-10 lg:grid-cols-12 lg:gap-0 lg:pt-16">
        <div className="relative z-10 flex flex-col justify-center lg:col-span-6 lg:pr-12">
          <p className="eyebrow animate-rise text-gold">Collection Automne · Hiver</p>
          <h1 className="display animate-rise mt-6 text-[4.2rem] text-primary sm:text-8xl xl:text-[9.5rem]" style={{ animationDelay: "120ms" }}>
            L'élégance,<br /><em className="font-light">naturellement.</em>
          </h1>
          <p className="animate-rise mt-8 max-w-md text-base leading-relaxed text-muted-foreground" style={{ animationDelay: "240ms" }}>
            Découvrez une mode pudique où élégance, confort et raffinement se rencontrent.
          </p>
          <div className="animate-rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "360ms" }}>
            <Link to="/collections" className="btn-primary">Découvrir la collection</Link>
            <Link to="/nouveautes" className="btn-ghost">Nos nouveautés</Link>
          </div>
        </div>
        <div className="relative lg:col-span-6">
          <PhotoSlot ratio="4/5" label="Photographie de campagne" />
          <div className="absolute -bottom-6 -left-6 hidden w-40 bg-background p-3 lg:block xl:w-48">
            <PhotoSlot ratio="3/4" label="Détail" />
          </div>
          <p className="eyebrow absolute -right-2 top-1/2 hidden origin-center translate-x-1/2 rotate-90 text-[0.58rem] text-gold xl:block">ARIMENE — MMXXVI</p>
        </div>
      </section>

      {/* Featured collections */}
      <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-10">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="display text-5xl text-primary md:text-6xl">Nos univers</h2>
          <Link to="/collections" className="eyebrow link-underline hidden text-[0.62rem] text-primary md:inline">Tout explorer</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {COLLECTIONS.map((c, i) => (
            <Link key={c.title} to={c.to} className={`group block ${i === 1 ? "md:mt-16" : ""}`}>
              <div className="overflow-hidden">
                <PhotoSlot ratio="4/5" label={c.title} className="transition-transform duration-[1.2s] group-hover:scale-[1.03]" />
              </div>
              <div className="mt-5 flex items-baseline justify-between border-b border-gold/50 pb-4">
                <span className="font-serif text-3xl text-primary">{c.title}</span>
                <span className="flex items-center gap-2 text-xs text-gold">
                  {c.n}<ArrowRight className="h-3.5 w-3.5 stroke-[1.25] transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New arrivals */}
      <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-10">
        <div className="mb-12 text-center">
          <p className="eyebrow text-gold">Fraîchement arrivées</p>
          <h2 className="display mt-4 text-5xl text-primary md:text-6xl">Nouveautés</h2>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
          {PRODUCTS.filter((p) => p.isNew).slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="mt-16 text-center"><Link to="/nouveautes" className="btn-ghost">Voir toutes les nouveautés</Link></div>
      </section>

      {/* Brand statement */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-24 md:px-10 lg:grid-cols-2 lg:py-32">
          <div className="order-2 lg:order-1">
            <p className="eyebrow text-gold">La maison</p>
            <h2 className="display mt-6 text-6xl md:text-7xl">La beauté dans<br /><em>chaque détail.</em></h2>
            <div className="my-10 h-px w-16 bg-gold" />
            <p className="max-w-md leading-relaxed text-primary-foreground/75">
              ARIMENE imagine des silhouettes pudiques pour la femme d'aujourd'hui : des coupes fluides, des matières choisies avec exigence et des ensembles pensés pour s'accorder avec grâce, du quotidien aux grandes occasions.
            </p>
            <Link to="/a-propos" className="eyebrow link-underline mt-10 inline-block text-[0.62rem]">Notre histoire</Link>
          </div>
          <div className="order-1 grid grid-cols-2 gap-4 lg:order-2">
            <PhotoSlot ratio="3/4" label="Atelier" className="mt-12 opacity-90" />
            <PhotoSlot ratio="3/4" label="Matières" className="opacity-90" />
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
