"use client";

import { useCartStore } from "@/src/app/store/cartStore";
import s from "./checkout.module.css";

export default function CheckoutPage() {
  const items = useCartStore((st) => st.items);
  const increase = useCartStore((st) => st.increase);
  const decrease = useCartStore((st) => st.decrease);
  const removeFromCart = useCartStore((st) => st.removeFromCart);
  const total = useCartStore((st) => st.total);

  if (items.length === 0) {
    return <main className={s.wrap}><h1 className={s.title}>Order <em>Summary</em></h1>אין פריטים בעגלה.</main>;
  }

  return (
    <main className={s.wrap}>
      <h1 className={s.title}>
        Order <em>Summary</em>
      </h1>

      <section className={s.list}>
        {items.map((it) => (
          <div key={it.id} className={s.row}>
            {it.image ? (
              <img src={it.image} alt={it.title} className={s.thumb} />
            ) : (
              <div className={s.thumb} />
            )}

            <div>
              <div className={s.name}>{it.title}</div>
              <div className={s.counter}>
                <button className={s.btn} onClick={() => decrease(it.id)}>−</button>
                <span>{it.quantity}</span>
                <button className={s.btn} onClick={() => increase(it.id)}>+</button>
                <button
                  className={s.btn}
                  style={{ marginLeft: 10, width: "auto", padding: "0 8px" }}
                  onClick={() => removeFromCart(it.id)}
                  title="Remove item"
                >
                  Remove
                </button>
              </div>
            </div>

            <div className={s.price}>${(it.price * it.quantity).toFixed(2)}</div>
          </div>
        ))}
      </section>

      <div className={s.footer}>
        <div className={s.totalBadge}>Total: ${total().toFixed(2)}</div>
        <button
          className={s.checkoutBtn}
          onClick={() => alert("Order completed (demo)")}
        >
          COMPLETE ORDER
        </button>
      </div>
    </main>
  );
}
