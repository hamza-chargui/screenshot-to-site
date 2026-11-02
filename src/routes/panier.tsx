import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { COLORS, PRICE_PLACEHOLDER, PRODUCTS, productName } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { PhotoSlot } from "@/components/site/PhotoSlot";
import { PageIntro } from "@/components/site/Layout";

export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [
      { title: "Panier — ARIMENE" },
      { name: "description", content: "Votre panier ARIMENE." },
      { property: "og:title", content: "Panier — ARIMENE" },
      { property: "og:description", content: "Votre panier ARIMENE." },
    ],
  }),
  component: Cart,
});

function Cart() {
  const { lines, setQty, remove, count } = useCart();
  return (
    <>
      <PageIntro eyebrow={`${count} article${count > 1 ? "s" : ""}`} title="Panier" />
      <section className="mx-auto max-w-[1200px] px-6 pb-24 md:px-10">
        {lines.length === 0 ? (
          <div className="py-12 text-center">
            <p className="font-serif text-3xl italic text-muted-foreground">Votre panier est vide.</p>
            <Link to="/collections" className="btn-primary mt-10">Découvrir la collection</Link>
          </div>
        ) : (
          <div className="grid gap-16 lg:grid-cols-[1fr_360px]">
            <ul className="divide-y divide-border border-y border-border">
              {lines.map((l) => {
                const p = PRODUCTS.find((x) => x.id === l.productId)!;
                return (
                  <li key={l.key} className="grid grid-cols-[96px_1fr] gap-5 py-6 md:grid-cols-[120px_1fr]">
                    <Link to="/produit/$id" params={{ id: p.id }}><PhotoSlot ratio="3/4" /></Link>
                    <div className="flex flex-col">
                      <div className="flex justify-between gap-4">
                        <p className="font-serif text-xl leading-tight text-primary">{productName(p)}</p>
                        <button aria-label="Retirer" onClick={() => remove(l.key)} className="text-muted-foreground hover:text-primary"><X className="h-4 w-4 stroke-[1.25]" /></button>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">{COLORS[l.color].name} · Taille {l.size}</p>
                      <div className="mt-auto flex items-center justify-between pt-4">
                        <div className="flex items-center border border-border">
                          <button aria-label="Moins" onClick={() => setQty(l.key, l.qty - 1)} className="p-3 text-primary"><Minus className="h-3 w-3" /></button>
                          <span className="w-6 text-center text-sm">{l.qty}</span>
                          <button aria-label="Plus" onClick={() => setQty(l.key, l.qty + 1)} className="p-3 text-primary"><Plus className="h-3 w-3" /></button>
                        </div>
                        <span className="text-sm text-muted-foreground">{PRICE_PLACEHOLDER}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <aside className="h-fit bg-card p-8">
              <p className="eyebrow text-[0.6rem] text-gold">Récapitulatif</p>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Sous-total</span><span>{PRICE_PLACEHOLDER}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Livraison</span><span>Calculée à l'étape suivante</span></div>
              </div>
              <Link to="/commande" className="btn-primary mt-8 w-full">Passer la commande</Link>
              <Link to="/collections" className="eyebrow link-underline mx-auto mt-6 block w-fit text-[0.6rem] text-primary">Continuer mes achats</Link>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}
