"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishItem = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type WishState = {
  items: WishItem[];
  addToWish: (item: WishItem) => void;
  removeFromWish: (id: number) => void;
};

export const useWishStore = create<WishState>()(
  persist(
    (set, get) => ({
      items: [],
      addToWish: (item) => {
        const exists = get().items.find((i) => i.id === item.id);
        if (!exists) {
          set({ items: [...get().items, item] });
        }
      },
      removeFromWish: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },
    }),
    {
      name: "wish-storage", // שם ב-localStorage
    }
  )
);
