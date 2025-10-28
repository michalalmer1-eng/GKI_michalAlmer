"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/src/app/store/cartStore";
import { useCartUIStore } from "@/src/app/store/cartUiStore";
import s from "./page.module.css";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const addToCart = useCartStore((state) => state.addToCart);
  const openCart = useCartUIStore((st) => st.open);

  useEffect(() => {
    async function fetchProducts() {
      // בלי limit: נטען את כל המוצרים
      const res = await fetch("https://fakestoreapi.com/products", { cache: "no-store" });
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <>
      <section className={s.hero}>
        <img src="/images/logo2.jpg" alt="M&H Whisky Distillery" />
      </section>

      <h2 className={s.title}>LATEST PRODUCTS</h2>

      <section className={s.grid}>
        {products.map((p) => (
          <div key={p.id} className={s.card}>
            <Link href={`/products/${p.id}`} className={`${s.cardLink} ${s.media}`} aria-label={p.title}>
              <img src={p.image} alt={p.title} />
            </Link>

            <Link href={`/products/${p.id}`} className={s.cardLink}>
              <h3>{p.title}</h3>
            </Link>

            <div className={s.category}>{p.category}</div>
            <div className={s.price}>${p.price.toFixed(2)}</div>

            <button
              className={s.button}
              onClick={() => {
                addToCart({
                  id: p.id,
                  title: p.title,
                  price: p.price,
                  quantity: 1,
                  image: p.image, 
                });
                openCart();
              }}
            >
              ADD TO CART
            </button>
          </div>
        ))}
      </section>
    </>
  );
}
