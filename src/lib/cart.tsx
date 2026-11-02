import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type CartLine = { key: string; productId: string; color: string; size: string; qty: number };

type Ctx = {
  lines: CartLine[];
  add: (l: Omit<CartLine, "key">) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  count: number;
};

const CartContext = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("arimene-cart");
      if (raw) setLines(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem("arimene-cart", JSON.stringify(lines));
  }, [lines]);

  const add: Ctx["add"] = (l) => {
    const key = `${l.productId}-${l.color}-${l.size}`;
    setLines((prev) => {
      const found = prev.find((p) => p.key === key);
      if (found) return prev.map((p) => (p.key === key ? { ...p, qty: p.qty + l.qty } : p));
      return [...prev, { ...l, key }];
    });
  };

  return (
    <CartContext.Provider
      value={{
        lines,
        add,
        setQty: (key, qty) => setLines((p) => p.map((l) => (l.key === key ? { ...l, qty: Math.max(1, qty) } : l))),
        remove: (key) => setLines((p) => p.filter((l) => l.key !== key)),
        clear: () => setLines([]),
        count: lines.reduce((s, l) => s + l.qty, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
