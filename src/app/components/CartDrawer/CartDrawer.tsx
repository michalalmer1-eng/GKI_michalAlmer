"use client";

import { useCartStore } from "@/src/app/store/cartStore";
import { useCartUIStore } from "@/src/app/store/cartUiStore";
import s from "./CartDrawer.module.css";

export default function CartDrawer() {
  const { isOpen, close } = useCartUIStore();
  const items = useCartStore((st) => st.items);
  const increase = useCartStore((st) => st.increase);
  const decrease = useCartStore((st) => st.decrease);
  const total = useCartStore((st) => st.total);
  const count = useCartStore((st) => st.count);

  if (!isOpen) return null;

  return (
    <div className={s.backdrop} onClick={close}>
      <div className={s.panel} onClick={(e) => e.stopPropagation()}>
        <div className={s.header}>
          Cart ({count()})
          <button className={s.close} onClick={close}>X</button>
        </div>

        <div className={s.list}>
          {items.map((it) => (
            <div key={it.id} className={s.row}>
              {it.image ? <img src={it.image} alt={it.title} className={s.thumb} /> : <div />}
              <div>
                <div className={s.title}>{it.title}</div>
                <div className={s.counter}>
                  <button className={s.btn} onClick={() => decrease(it.id)}>-</button>
                  <span className={s.qty}>{it.quantity}</span>
                  <button className={s.btn} onClick={() => increase(it.id)}>+</button>
                </div>
              </div>
              <div>${(it.price * it.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>

        <div className={s.footer}>
          <div className={s.total}>Total: ${total().toFixed(2)}</div>
          <button className={s.checkout} onClick={() => alert("Checkout coming soon")}>CHECKOUT</button>
        </div>
      </div>
    </div>
  );
}
