import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { COLORS, GOVERNORATES, PRICE_PLACEHOLDER, PRODUCTS, productName } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { PhotoSlot } from "@/components/site/PhotoSlot";

export const Route = createFileRoute("/commande")({
  head: () => ({
    meta: [
      { title: "Commande — ARIMENE" },
      { name: "description", content: "Finalisez votre commande ARIMENE, paiement à la livraison." },
      { property: "og:title", content: "Commande — ARIMENE" },
      { property: "og:description", content: "Finalisez votre commande ARIMENE." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { lines, clear } = useCart();
  const [done, setDone] = useState(false);

  if (done)
    return (
      <section className="mx-auto max-w-xl px-6 py-32 text-center">
        <p className="eyebrow text-gold">Commande confirmée</p>
        <h1 className="display mt-6 text-6xl text-primary">Merci.</h1>
        <p className="mt-6 text-muted-foreground">Notre équipe vous contactera par téléphone pour confirmer votre commande avant l'expédition.</p>
        <Link to="/" className="btn-ghost mt-10">Retour à l'accueil</Link>
      </section>
    );

  return (
    <section className="mx-auto grid max-w-[1200px] gap-16 px-6 py-16 md:px-10 lg:grid-cols-[1fr_400px]">
      <form onSubmit={(e) => { e.preventDefault(); clear(); setDone(true); }} className="space-y-10">
        <div>
          <p className="eyebrow text-gold">Étape finale</p>
          <h1 className="display mt-4 text-6xl text-primary">Commande</h1>
        </div>
        <fieldset className="space-y-6">
          <legend className="eyebrow mb-4 text-[0.6rem] text-primary">Vos coordonnées</legend>
          <input required placeholder="Nom et prénom" className="field" autoComplete="name" />
          <input required type="tel" inputMode="tel" pattern="[0-9 +]{8,}" placeholder="Téléphone (ex. 20 000 000)" className="field" autoComplete="tel" />
          <select required defaultValue="" className="field text-primary">
            <option value="" disabled>Gouvernorat</option>
            {GOVERNORATES.map((g) => <option key={g}>{g}</option>)}
          </select>
          <input required placeholder="Adresse complète" className="field" autoComplete="street-address" />
        </fieldset>
        <fieldset>
          <legend className="eyebrow mb-4 text-[0.6rem] text-primary">Paiement</legend>
          <label className="flex cursor-pointer items-center gap-4 border border-primary p-5">
            <input type="radio" defaultChecked name="pay" className="accent-primary" />
            <div><p className="font-serif text-xl text-primary">Paiement à la livraison</p><p className="text-xs text-muted-foreground">Réglez en espèces à la réception de votre colis.</p></div>
          </label>
        </fieldset>
        <button disabled={lines.length === 0} className="btn-primary w-full disabled:opacity-40">Confirmer la commande</button>
      </form>

      <aside className="h-fit bg-card p-8 lg:sticky lg:top-28">
        <p className="eyebrow text-[0.6rem] text-gold">Votre commande</p>
        {lines.length === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">Votre panier est vide. <Link to="/collections" className="text-primary underline">Découvrir</Link></p>
        ) : (
          <ul className="mt-6 space-y-5">
            {lines.map((l) => {
              const p = PRODUCTS.find((x) => x.id === l.productId)!;
              return (
                <li key={l.key} className="grid grid-cols-[56px_1fr] gap-4">
                  <PhotoSlot ratio="3/4" />
                  <div className="text-sm">
                    <p className="font-serif text-lg leading-tight text-primary">{productName(p)}</p>
                    <p className="text-xs text-muted-foreground">{COLORS[l.color].name} · {l.size} · ×{l.qty}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <div className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Sous-total</span><span>{PRICE_PLACEHOLDER}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Livraison</span><span>{PRICE_PLACEHOLDER}</span></div>
          <div className="flex justify-between font-serif text-xl text-primary"><span>Total</span><span>{PRICE_PLACEHOLDER}</span></div>
        </div>
      </aside>
    </section>
  );
}
