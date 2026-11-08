"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type CartLine = { productId: string; quantity: number; color?: string; size?: string };
type StoreContextValue = {
  cart: CartLine[];
  favorites: string[];
  compare: string[];
  userName: string | null;
  hydrated: boolean;
  toast: string;
  login: (name: string) => void;
  logout: () => void;
  addToCart: (productId: string, quantity?: number, color?: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string, color?: string, size?: string) => void;
  toggleFavorite: (productId: string) => void;
  toggleCompare: (productId: string) => void;
  notify: (message: string) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [userName, setUserName] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    queueMicrotask(() => {
      try {
        setCart(JSON.parse(localStorage.getItem("emerald-cart") || "[]") as CartLine[]);
        setFavorites(JSON.parse(localStorage.getItem("emerald-favorites") || "[]") as string[]);
        setCompare(JSON.parse(localStorage.getItem("emerald-compare") || "[]") as string[]);
        setUserName(localStorage.getItem("emerald-user-name"));
      } catch {
        setCart([]);
        setFavorites([]);
        setCompare([]);
      }
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("emerald-cart", JSON.stringify(cart));
      localStorage.setItem("emerald-favorites", JSON.stringify(favorites));
      localStorage.setItem("emerald-compare", JSON.stringify(compare));
    }
  }, [cart, favorites, compare, hydrated]);

  const login = useCallback((name: string) => {
    const normalizedName = name.trim();
    if (!normalizedName) return;
    localStorage.setItem("emerald-user-name", normalizedName);
    setUserName(normalizedName);
  }, []);
  const logout = useCallback(() => {
    localStorage.removeItem("emerald-user-name");
    setUserName(null);
  }, []);
  const notify = useCallback((message: string) => setToast(message), []);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const addToCart = useCallback((productId: string, quantity = 1, color?: string, size?: string) => {
    setCart((current) => {
      const existing = current.find((line) => line.productId === productId && line.color === color && line.size === size);
      return existing
        ? current.map((line) => line === existing ? { ...line, quantity: line.quantity + quantity } : line)
        : [...current, { productId, quantity, color, size }];
    });
    notify("کالا به سبد خرید اضافه شد");
  }, [notify]);

  const updateQuantity = useCallback((productId: string, quantity: number, color?: string, size?: string) => {
    setCart((current) => quantity < 1
      ? current.filter((line) => !(line.productId === productId && line.color === color && line.size === size))
      : current.map((line) => line.productId === productId && line.color === color && line.size === size ? { ...line, quantity } : line));
  }, []);
  const removeFromCart = useCallback((productId: string, color?: string, size?: string) => {
    setCart((current) => current.filter((line) => !(line.productId === productId && line.color === color && line.size === size)));
    notify("کالا از سبد خرید حذف شد");
  }, [notify]);
  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((current) => {
      const exists = current.includes(productId);
      notify(exists ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد");
      return exists ? current.filter((id) => id !== productId) : [...current, productId];
    });
  }, [notify]);
  const toggleCompare = useCallback((productId: string) => {
    setCompare((current) => {
      if (current.includes(productId)) {
        notify("از فهرست مقایسه حذف شد");
        return current.filter((id) => id !== productId);
      }
      if (current.length >= 4) {
        notify("حداکثر ۴ کالا را می‌توانید مقایسه کنید");
        return current;
      }
      notify("به فهرست مقایسه اضافه شد");
      return [...current, productId];
    });
  }, [notify]);

  const value = useMemo(() => ({ cart, favorites, compare, userName, hydrated, toast, login, logout, addToCart, updateQuantity, removeFromCart, toggleFavorite, toggleCompare, notify }), [cart, favorites, compare, userName, hydrated, toast, login, logout, addToCart, updateQuantity, removeFromCart, toggleFavorite, toggleCompare, notify]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}

export function ToastViewport() {
  const { toast } = useStore();
  return toast ? <div className="toast" role="status"><span className="toast-dot" />{toast}</div> : null;
}
