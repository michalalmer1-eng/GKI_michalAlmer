"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCartStore } from "@/src/app/store/cartStore";
import { useWishStore } from "@/src/app/store/wishStore";
import { useCartUIStore } from "@/src/app/store/cartUiStore";
import s from "./product.module.css";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function ProductDetailsPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const addToCart = useCartStore((st) => st.addToCart);
  const addToWish = useWishStore((st) => st.addToWish);
  const openCart = useCartUIStore((st) => st.open);

  useEffect(() => {
    if (!id) return;
    async function fetchProduct() {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`, { cache: "no-store" });
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  if (loading) return <main className={s.wrap}>Loading product...</main>;
  if (!product) return <main className={s.wrap}>Product not found.</main>;

  const backHref = `/categories/${encodeURIComponent(product.category)}`;

  return (
    <main className={s.wrap}>
      <Link href={backHref} className={s.back}>
        <span>↩</span> Back To {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
      </Link>

      <section className={s.row}>
        <div className={s.media}>
          <img src={product.image} alt={product.title} />
        </div>

        <div>
          <h1 className={s.title}>{product.title}</h1>
          <div className={s.category}>{product.category}</div>
          <p className={s.desc}>{product.description}</p>

          <div className={s.price}>PRICE: ${product.price.toFixed(2)}</div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              className={s.cta}
              onClick={() => {
                addToCart({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  quantity: 1,
                  image: product.image,
                });
                openCart(); // פותח את מסגרת העגלה
              }}
            >
              ADD TO CART
            </button>

            {/* אופציונלי: שמירה ל־Wish */}
            <button
              className={s.cta}
              style={{ background: "#111", color: "#fff" }}
              onClick={() =>
                addToWish({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.image,
                })
              }
            >
              SAVE TO WISH
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
