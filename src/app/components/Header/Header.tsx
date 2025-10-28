"use client";

import Link from "next/link";
import { useEffect, useState, ReactNode } from "react";
import { useCartStore } from "@/src/app/store/cartStore";
import { useWishStore } from "@/src/app/store/wishStore";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <html lang="en">
      <body>
        <header style={headerStyle}>
          <nav style={navStyle}>
            <Link href="/">Home</Link>

            {!loading && (
              <select
                onChange={(e) => (window.location.href = `/categories/${e.target.value}`)}
                style={selectStyle}
                defaultValue=""
              >
                <option value="" disabled>
                  Categories
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            )}
          </nav>

          <div style={cartWishStyle}>
            <Link href="/wishlist" style={iconLinkStyle}>
              💖 {totalWish}
            </Link>
            <Link href="/checkout" style={iconLinkStyle}>
              🛒 {totalCart}
            </Link>
          </div>
        </header>

        <main style={{ padding: "20px" }}>{children}</main>
      </body>
    </html>
  );
}

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#f4f4f4",
  padding: "10px 20px",
  borderBottom: "1px solid #ddd",
};

const navStyle: React.CSSProperties = {
  display: "flex",
  gap: "20px",
  alignItems: "center",
};

const selectStyle: React.CSSProperties = {
  padding: "5px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const cartWishStyle: React.CSSProperties = {
  display: "flex",
  gap: "15px",
  alignItems: "center",
  fontWeight: "bold",
};

const iconLinkStyle: React.CSSProperties = {
  textDecoration: "none",
  color: "#222",
  fontSize: "18px",
};
