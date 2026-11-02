// Placeholder catalog — real names, prices and photography supplied by the client later.
export type Swatch = { name: string; token: string };

export const COLORS: Record<string, Swatch> = {
  marine: { name: "Marine", token: "bg-swatch-navy" },
  bordeaux: { name: "Bordeaux", token: "bg-burgundy" },
  sable: { name: "Sable", token: "bg-swatch-sand" },
  noir: { name: "Noir", token: "bg-swatch-black" },
};

export type Category = "ensembles" | "pantalons" | "hauts";
export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "ensembles", label: "Ensembles coordonnés" },
  { id: "pantalons", label: "Pantalons larges" },
  { id: "hauts", label: "Hauts élégants" },
];

export type Product = {
  id: string;
  ref: string;
  category: Category;
  colors: (keyof typeof COLORS)[];
  isNew: boolean;
};

const make = (n: number, category: Category, colors: Product["colors"], isNew: boolean): Product => ({
  id: `ref-${String(n).padStart(2, "0")}`,
  ref: `Réf. ${String(n).padStart(2, "0")}`,
  category,
  colors,
  isNew,
});

export const PRODUCTS: Product[] = [
  make(1, "ensembles", ["marine", "bordeaux"], true),
  make(2, "ensembles", ["bordeaux", "marine"], true),
  make(3, "pantalons", ["sable", "noir"], true),
  make(4, "hauts", ["sable", "bordeaux"], true),
  make(5, "ensembles", ["marine"], false),
  make(6, "pantalons", ["marine", "bordeaux", "noir"], true),
  make(7, "hauts", ["noir", "sable"], false),
  make(8, "ensembles", ["bordeaux", "sable"], true),
  make(9, "hauts", ["marine"], false),
  make(10, "pantalons", ["sable"], false),
  make(11, "ensembles", ["noir", "marine"], false),
  make(12, "hauts", ["bordeaux"], false),
];

export const categoryLabel = (c: Category) => CATEGORIES.find((x) => x.id === c)?.label ?? "";
export const productName = (p: Product) => `Nom du produit — ${p.ref}`;
export const PRICE_PLACEHOLDER = "Prix · TND";

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const GOVERNORATES = [
  "Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba", "Kairouan",
  "Kasserine", "Kébili", "Le Kef", "Mahdia", "La Manouba", "Médenine", "Monastir", "Nabeul",
  "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan",
];
