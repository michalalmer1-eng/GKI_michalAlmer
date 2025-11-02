"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useCartStore } from "@/src/app/store/cartStore";
import { useCartUIStore } from "@/src/app/store/cartUiStore";
import s from "./category.module.css";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
};

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: encoded } = use(params);
  const category = decodeURIComponent(encoded);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const addToCart = useCartStore((state) => state.addToCart);
  const openCart = useCartUIStore((st) => st.open);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(
        `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`
      );
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, [category]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <>
      <h1 className={s.title}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>

      <section className={s.grid}>
        {products.map((p) => (
          <article key={p.id} className={s.card}>
            <Link href={`/products/${p.id}`} className={s.media} aria-label={p.title}>
              <img src={p.image} alt={p.title} />
            </Link>

            <Link href={`/products/${p.id}`} className={s.name}>
              {p.title}
            </Link>

            <div className={s.category}>{p.category}</div>
            <div className={s.price}>${p.price.toFixed(2)}</div>

            <button
              className={s.button}
              onClick={() => {
                addToCart({ id: p.id, title: p.title, price: p.price, quantity: 1, image: p.image });
                openCart(); 
              }}
            >
              ADD TO CART
            </button>
          </article>
        ))}
      </section>
    </>
  );
}
