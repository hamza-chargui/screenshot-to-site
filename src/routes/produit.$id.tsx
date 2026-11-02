import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { COLORS, PRICE_PLACEHOLDER, PRODUCTS, SIZES, categoryLabel, productName } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { PhotoSlot } from "@/components/site/PhotoSlot";
import { ProductCard } from "@/components/site/ProductCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/produit/$id")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${productName(loaderData.product)} — ARIMENE` : "Pièce introuvable — ARIMENE";
    return {
      meta: [
        { title: t },
        { name: "description", content: "Pièce de mode pudique ARIMENE." },
        { property: "og:title", content: t },
        { property: "og:description", content: "Pièce de mode pudique ARIMENE." },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const navigate = useNavigate();
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [guide, setGuide] = useState(false);
  const [err, setErr] = useState(false);
  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const addToCart = () => {
    if (!size) return setErr(true);
    add({ productId: product.id, color, size, qty });
    navigate({ to: "/panier" });
  };

  return (
    <>
      <div className="mx-auto max-w-[1440px] px-6 pt-8 text-xs text-muted-foreground md:px-10">
        <Link to="/" className="hover:text-primary">Accueil</Link> / <Link to="/collections" className="hover:text-primary">Collections</Link> / <span className="text-primary">{product.ref}</span>
      </div>
      <section className="mx-auto grid max-w-[1440px] gap-12 px-6 py-10 md:px-10 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <div className="-mx-6 flex snap-x snap-mandatory gap-2 overflow-x-auto px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-3 md:overflow-visible md:px-0">
          <PhotoSlot ratio="3/4" label="Vue de face" className="w-[85%] shrink-0 snap-center md:col-span-2 md:w-full" />
          {["Vue de dos", "Détail rayé", "Matière", "Portée"].map((l) => (
            <PhotoSlot key={l} ratio="3/4" label={l} className="w-[85%] shrink-0 snap-center md:w-full" />
          ))}
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow text-[0.6rem] text-gold">{categoryLabel(product.category)}</p>
          <h1 className="display mt-4 text-5xl text-primary md:text-6xl">{productName(product)}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{PRICE_PLACEHOLDER}</p>

          <div className="mt-10">
            <p className="eyebrow mb-4 text-[0.6rem] text-primary">Couleur — <span className="text-muted-foreground">{COLORS[color].name}</span></p>
            <div className="flex gap-3">
              {product.colors.map((c) => (
                <button key={c} aria-label={COLORS[c].name} onClick={() => setColor(c)} className={cn("h-8 w-8 rounded-full ring-offset-2 ring-offset-background transition", COLORS[c].token, color === c ? "ring-1 ring-primary" : "ring-1 ring-gold/40")} />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-4 flex justify-between">
              <p className="eyebrow text-[0.6rem] text-primary">Taille</p>
              <button onClick={() => setGuide((v) => !v)} className="eyebrow link-underline text-[0.6rem] text-muted-foreground">Guide des tailles</button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {SIZES.map((s) => (
                <button key={s} onClick={() => { setSize(s); setErr(false); }} className={cn("border py-3 text-xs transition-colors", size === s ? "border-primary bg-primary text-primary-foreground" : "border-border text-primary hover:border-primary")}>{s}</button>
              ))}
            </div>
            {err && <p className="mt-3 text-xs text-destructive">Veuillez choisir une taille.</p>}
            {guide && (
              <table className="mt-5 w-full text-left text-xs text-muted-foreground animate-in fade-in">
                <thead><tr className="border-b border-border text-primary"><th className="py-2">Taille</th><th>Poitrine</th><th>Taille</th><th>Hanches</th></tr></thead>
                <tbody>{SIZES.map((s, i) => <tr key={s} className="border-b border-border/60"><td className="py-2 text-primary">{s}</td><td>{82 + i * 4} cm</td><td>{64 + i * 4} cm</td><td>{90 + i * 4} cm</td></tr>)}</tbody>
              </table>
            )}
          </div>

          <div className="mt-8 flex gap-3">
            <div className="flex items-center border border-border">
              <button aria-label="Moins" onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-4 text-primary"><Minus className="h-3 w-3" /></button>
              <span className="w-6 text-center text-sm">{qty}</span>
              <button aria-label="Plus" onClick={() => setQty((q) => q + 1)} className="p-4 text-primary"><Plus className="h-3 w-3" /></button>
            </div>
            <button onClick={addToCart} className="btn-primary flex-1">Ajouter au panier</button>
          </div>

          <Accordion type="single" collapsible defaultValue="desc" className="mt-12 border-t border-border">
            {[
              ["desc", "Description", "Ensemble coordonné à la coupe fluide et pudique, rehaussé de délicats détails rayés. Description définitive à fournir par la maison."],
              ["fabric", "Matière & entretien", "Composition à confirmer. Lavage délicat à 30°, repassage doux, ne pas sécher en machine."],
              ["delivery", "Livraison & retours", "Livraison dans les 24 gouvernorats sous 2 à 5 jours ouvrables. Paiement à la livraison. Échange possible sous 7 jours."],
            ].map(([v, t, d]) => (
              <AccordionItem key={v} value={v} className="border-border">
                <AccordionTrigger className="eyebrow text-[0.62rem] text-primary hover:no-underline">{t}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{d}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-10">
        <h2 className="display mb-12 text-center text-5xl text-primary">Vous aimerez aussi</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  );
}
