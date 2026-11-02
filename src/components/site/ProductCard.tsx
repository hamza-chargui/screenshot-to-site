import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useState } from "react";
import { COLORS, PRICE_PLACEHOLDER, categoryLabel, productName, type Product } from "@/lib/catalog";
import { PhotoSlot } from "./PhotoSlot";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);
  return (
    <article className="group">
      <div className="relative">
        <Link to="/produit/$id" params={{ id: product.id }} className="block">
          <PhotoSlot ratio="3/4" label="Photo produit" className="transition-transform duration-700 group-hover:scale-[1.01]" />
        </Link>
        {product.isNew && <span className="eyebrow absolute left-4 top-4 text-[0.58rem] text-primary">Nouveau</span>}
        <button
          aria-label="Ajouter aux favoris"
          onClick={() => setLiked((v) => !v)}
          className="absolute right-3 top-3 p-2 text-primary transition-opacity hover:opacity-70"
        >
          <Heart className={cn("h-4 w-4 stroke-[1.25]", liked && "fill-primary")} />
        </button>
        <Link
          to="/produit/$id"
          params={{ id: product.id }}
          className="eyebrow absolute inset-x-3 bottom-3 translate-y-2 bg-background/95 py-3 text-center text-[0.6rem] text-primary opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Aperçu rapide
        </Link>
      </div>
      <div className="mt-4 space-y-1.5">
        <p className="eyebrow text-[0.56rem] text-gold">{categoryLabel(product.category)}</p>
        <Link to="/produit/$id" params={{ id: product.id }} className="block font-serif text-lg leading-tight text-primary">
          {productName(product)}
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-xs tracking-wide text-muted-foreground">{PRICE_PLACEHOLDER}</span>
          <div className="flex gap-1.5">
            {product.colors.map((c) => (
              <span key={c} title={COLORS[c].name} className={cn("h-2.5 w-2.5 rounded-full ring-1 ring-gold/50 ring-offset-1 ring-offset-background", COLORS[c].token)} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
