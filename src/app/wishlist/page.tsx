"use client";

import { useWishStore } from "../store/wishStore";

export default function WishListPage() {
  const items = useWishStore((state) => state.items);
  const removeFromWish = useWishStore((state) => state.removeFromWish);

  if (items.length === 0) return <p>Your wish list is empty.</p>;

  return (
    <main style={{ padding: "20px" }}>
      <h1>Wish List</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {items.map((item) => (
          <div key={item.id} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px" }}>
            <img src={item.image} alt={item.title} style={{ width: "100px", height: "100px", objectFit: "contain" }} />
            <h3>{item.title}</h3>
            <p>${item.price}</p>
            <button onClick={() => removeFromWish(item.id)}>Remove</button>
          </div>
        ))}
      </div>
    </main>
  );
}
