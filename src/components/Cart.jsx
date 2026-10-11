import { useState } from "react";
import { pizzaCart } from "../utils/pizza.js";
import { formatCurrency } from "../utils/formatCurrency.js";

const Cart = () => {
  const [cart, setCart] = useState(pizzaCart);

  const changeCount = (id, amount) => {
    setCart((currentCart) =>
      currentCart
        .map((pizza) =>
          pizza.id === id
            ? { ...pizza, count: pizza.count + amount }
            : pizza
        )
        .filter((pizza) => pizza.count > 0)
    );
  };

  const total = cart.reduce(
    (sum, pizza) => sum + pizza.price * pizza.count,
    0
  );

  return (
    <main className="container my-5">
      <h1 className="fs-1 cart-title">Detalles del pedido:</h1>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        cart.map((pizza) => (
          <div
            key={pizza.id}
            className="d-flex align-items-center justify-content-between gap-3 border-bottom py-3"
          >
            <div className="d-flex align-items-center gap-3">
              <img
                src={pizza.img}
                alt={`Pizza ${pizza.name}`}
                width="80"
                height="80"
                style={{ objectFit: "cover" }}
              />
              <span>Pizza {pizza.name}</span>
            </div>

            <div className="d-flex align-items-center gap-2">
              <span>${formatCurrency(pizza.price)}</span>
              <button
                type="button"
                className="btn btn-outline-danger"
                aria-label={`Disminuir cantidad de pizza ${pizza.name}`}
                onClick={() => changeCount(pizza.id, -1)}
              >
                −
              </button>
              <span>{pizza.count}</span>
              <button
                type="button"
                className="btn btn-outline-primary"
                aria-label={`Aumentar cantidad de pizza ${pizza.name}`}
                onClick={() => changeCount(pizza.id, 1)}
              >
                +
              </button>
            </div>
          </div>
        ))
      )}

      <h2 className="fs-2 mt-4 cart-total">
        Total: ${formatCurrency(total)}
      </h2>
      <button type="button" className="btn btn-dark mt-3">
        Pagar
      </button>
    </main>
  );
};

export default Cart;