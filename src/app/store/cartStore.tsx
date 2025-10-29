import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image?: string; 
};

type CartState = {
  items: CartItem[];

  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;

  increase: (id: number) => void;
  decrease: (id: number) => void;

  count: () => number;
  total: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item: CartItem) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? {
                      ...i,
                      quantity: i.quantity + item.quantity,
                      image: item.image ?? i.image,
                    }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      removeFromCart: (id: number) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      clearCart: () => set({ items: [] }),

      increase: (id: number) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        })),

      decrease: (id: number) =>
        set((state) => {
          const it = state.items.find((i) => i.id === id);
          if (!it) return state;
          if (it.quantity <= 1) {
            return { items: state.items.filter((i) => i.id !== id) };
          }
          return {
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            ),
          };
        }),

      count: () => get().items.reduce((s, i) => s + i.quantity, 0),
      total: () =>
        Number(
          get()
            .items.reduce((s, i) => s + i.price * i.quantity, 0)
            .toFixed(2)
        ),
    }),
    { name: "cart-storage" }
  )
);
