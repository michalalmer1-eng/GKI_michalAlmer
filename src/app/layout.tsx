"use client";

import Link from "next/link";
import { useEffect, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import s from "./components/Header/Header.module.css";
import { useCartStore } from "@/src/app/store/cartStore";
import { useWishStore } from "@/src/app/store/wishStore";
import CartDrawer from "@/src/app/components/CartDrawer/CartDrawer";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  const cartItems = useCartStore((state) => state.items);
  const wishItems = useWishStore((state) => state.items);

  const totalCart = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalWish = wishItems.length;

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("https://fakestoreapi.com/products/categories");
      const data = await res.json();
      setCategories(data);
      setLoading(false);
    }
    fetchCategories();
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <html lang="en">
      <body>
        <header className={s.wrap}>
          <div className={s.inner}>
            <Link href="/" className={s.brand} aria-label="SHOP home">
              <img src="/images/logo.png" alt="SHOP logo" className={s.logo} />
              <span>SHOP</span>
            </Link>

            <nav className={s.nav} aria-label="Main">
              <Link
                href="/"
                className={`${s.link} ${isActive("/") ? s.active : ""}`}
                aria-current={isActive("/") ? "page" : undefined}
              >
                Home
              </Link>

              {!loading &&
                categories.map((cat) => {
                  const slug = encodeURIComponent(cat);
                  const href = `/categories/${slug}`;
                  const label = cat.charAt(0).toUpperCase() + cat.slice(1);
                  return (
                    <Link
                      key={cat}
                      href={href}
                      className={`${s.link} ${isActive(href) ? s.active : ""}`}
                      aria-current={isActive(href) ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  );
                })}

              <Link
                href="/contact"
                className={`${s.link} ${isActive("/contact") ? s.active : ""}`}
                aria-current={isActive("/contact") ? "page" : undefined}
              >
                Contact Us
              </Link>
            </nav>

            <div className={s.cart}>
              <Link href="/wishlist" className={s.link}>
                ♥ <span className={s.badge}>{totalWish}</span>
              </Link>{" "}
              <Link href="/checkout" className={s.link}>
                Cart (<span className={s.badge}>{totalCart}</span>)
              </Link>
            </div>
          </div>
        </header>

        <main style={{ padding: "20px" }}>{children}</main>
  <CartDrawer />

      </body>
    </html>
  );
}
