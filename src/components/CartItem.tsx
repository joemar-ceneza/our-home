import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import type { CartItem as CartItemType } from "../types";

// Shared column template — Cart's header row uses the same string so the
// labels line up with the values in every item row.
export const CART_GRID =
  "grid-cols-[96px_minmax(0,1fr)_7rem_9rem_7rem_2.5rem]";

function QtyControls({
  amount,
  onDec,
  onInc,
  onInput,
}: {
  amount: number;
  onDec: () => void;
  onInc: () => void;
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-lg border border-ink/15 overflow-hidden">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={onDec}
        className="w-9 h-9 grid place-items-center hover:bg-ink/5 transition-colors">
        −
      </button>
      <input
        type="number"
        aria-label="Quantity"
        value={`${amount}`}
        onChange={onInput}
        className="w-10 h-9 text-center bg-transparent outline-none"
      />
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={onInc}
        className="w-9 h-9 grid place-items-center hover:bg-ink/5 transition-colors">
        +
      </button>
    </div>
  );
}

export default function CartItem({ item }: { item: CartItemType }) {
  const { removeFromCart, handleInput, addQty, reduceQty } =
    useContext(CartContext);

  const unitPrice =
    item.isOnSale && item.salePrice !== 0 ? item.salePrice : item.regularPrice;
  const lineTotal = unitPrice * item.amount;

  const Thumb = (
    <Link
      to={`/product/${item.slug}`}
      className="block h-24 w-24 bg-white rounded-lg overflow-hidden shrink-0">
      <img
        src={`${item.image}`}
        alt={item.name}
        loading="lazy"
        className="h-full w-full object-contain p-1.5"
      />
    </Link>
  );

  const Remove = (
    <button
      type="button"
      onClick={() => removeFromCart(item._id)}
      aria-label="Remove item"
      className="grid place-items-center h-8 w-8 rounded-full text-muted hover:bg-ink/5 hover:text-ink transition-colors">
      <IoMdClose />
    </button>
  );

  return (
    <div className="border-t border-ink/10 py-5">
      {/* Desktop: aligned grid row */}
      <div className={`hidden md:grid ${CART_GRID} items-center gap-4 text-left`}>
        {Thumb}
        <Link to={`/product/${item.slug}`} className="min-w-0">
          <h2 className="font-medium text-ink line-clamp-2 hover:text-clay transition-colors">
            {item.name}
          </h2>
        </Link>
        <p className="text-center text-muted">₱ {unitPrice.toLocaleString()}</p>
        <div className="flex justify-center">
          <QtyControls
            amount={item.amount}
            onDec={() => reduceQty(item._id)}
            onInc={() => addQty(item._id)}
            onInput={(e) => handleInput(e, item._id)}
          />
        </div>
        <p className="text-right font-semibold text-ink">
          ₱ {lineTotal.toLocaleString()}
        </p>
        <div className="flex justify-end">{Remove}</div>
      </div>

      {/* Mobile: stacked card */}
      <div className="md:hidden flex gap-3 text-left">
        {Thumb}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <Link to={`/product/${item.slug}`} className="min-w-0">
              <h2 className="font-medium text-ink text-sm line-clamp-2">
                {item.name}
              </h2>
            </Link>
            {Remove}
          </div>
          <p className="text-sm text-muted mt-1">
            ₱ {unitPrice.toLocaleString()}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <QtyControls
              amount={item.amount}
              onDec={() => reduceQty(item._id)}
              onInc={() => addQty(item._id)}
              onInput={(e) => handleInput(e, item._id)}
            />
            <p className="font-semibold text-ink">
              ₱ {lineTotal.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
