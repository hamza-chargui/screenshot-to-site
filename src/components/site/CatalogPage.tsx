import { useMemo, useState } from "react";
import { CATEGORIES, COLORS, PRODUCTS, type Category } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";
import { PageIntro } from "./Layout";
import { cn } from "@/lib/utils";

export function CatalogPage({ eyebrow, title, intro, initialCategory, onlyNew }: {
  eyebrow: string; title: string; intro: string; initialCategory?: Category; onlyNew?: boolean;
}) {
  const [cat, setCat] = useState<Category | "all">(initialCategory ?? "all");
  const [colors, setColors] = useState<string[]>([]);
  const [sort, setSort] = useState("recent");
  const [price, setPrice] = useState(400);
  const [showFilters, setShowFilters] = useState(false);

  const list = useMemo(() => {
    let l = PRODUCTS.filter((p) => (onlyNew ? p.isNew : true));
    if (cat !== "all") l = l.filter((p) => p.category === cat);
    if (colors.length) l = l.filter((p) => p.colors.some((c) => colors.includes(c)));
    if (sort === "ref") l = [...l].sort((a, b) => a.id.localeCompare(b.id));
    return l;
  }, [cat, colors, sort, onlyNew]);

  const toggleColor = (c: string) => setColors((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));

  const filters = (
    <div className="space-y-10">
      <div>
        <p className="eyebrow mb-4 text-[0.6rem] text-gold">Catégorie</p>
        <ul className="space-y-2.5">
          {[{ id: "all", label: "Tout voir" } as const, ...CATEGORIES].map((c) => (
            <li key={c.id}>
              <button onClick={() => setCat(c.id)} className={cn("text-sm transition-colors", cat === c.id ? "text-primary underline decoration-gold underline-offset-4" : "text-muted-foreground hover:text-primary")}>
                {c.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="eyebrow mb-4 text-[0.6rem] text-gold">Couleur</p>
        <div className="flex flex-wrap gap-3">
          {Object.entries(COLORS).map(([id, c]) => (
            <button key={id} onClick={() => toggleColor(id)} className={cn("flex items-center gap-2 border px-3 py-2 text-xs transition-colors", colors.includes(id) ? "border-primary text-primary" : "border-border text-muted-foreground")}>
              <span className={cn("h-2.5 w-2.5 rounded-full", c.token)} />{c.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="eyebrow mb-4 text-[0.6rem] text-gold">Prix maximum</p>
        <input type="range" min={50} max={400} step={10} value={price} onChange={(e) => setPrice(+e.target.value)} className="w-full accent-primary" />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>50 TND</span><span>{price} TND</span></div>
      </div>
    </div>
  );

  return (
    <>
      <PageIntro eyebrow={eyebrow} title={title}>{intro}</PageIntro>
      <div className="mx-auto max-w-[1440px] px-6 pb-24 md:px-10">
        <div className="mb-10 flex items-center justify-between border-y border-border py-4">
          <button onClick={() => setShowFilters((v) => !v)} className="eyebrow text-[0.6rem] text-primary lg:hidden">
            Filtres {showFilters ? "−" : "+"}
          </button>
          <span className="hidden text-xs text-muted-foreground lg:block">{list.length} pièces</span>
          <label className="flex items-center gap-3">
            <span className="eyebrow text-[0.6rem] text-muted-foreground">Trier</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent text-sm text-primary outline-none">
              <option value="recent">Nouveautés</option>
              <option value="ref">Référence</option>
              <option value="asc">Prix croissant</option>
              <option value="desc">Prix décroissant</option>
            </select>
          </label>
        </div>
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          <aside className={cn("lg:block", showFilters ? "block" : "hidden")}>{filters}</aside>
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 xl:grid-cols-3">
            {list.map((p) => <ProductCard key={p.id} product={p} />)}
            {list.length === 0 && <p className="col-span-full py-20 text-center font-serif text-2xl italic text-muted-foreground">Aucune pièce ne correspond à votre sélection.</p>}
          </div>
        </div>
      </div>
    </>
  );
}
