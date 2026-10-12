import { useEffect, useState } from "react";
import { formatCurrency } from "../utils/formatCurrency";

const Pizza = () => {
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const getPizza = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/pizzas/p001",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(
            `No se pudo cargar la pizza: HTTP ${response.status}`
          );
        }

        const data = await response.json();

        if (!controller.signal.aborted) {
          setPizza(data);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    getPizza();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return (
      <main className="container my-5">
        <p role="status">Cargando pizza...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container my-5">
        <p className="alert alert-danger" role="alert">
          {error}
        </p>
      </main>
    );
  }

  if (!pizza) {
    return (
      <main className="container my-5">
        <p>No hay información de la pizza.</p>
      </main>
    );
  }

  return (
    <main className="container my-5">
      <article className="card">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={pizza.img}
              alt={`Pizza ${pizza.name}`}
              className="img-fluid w-100 pizza-detail-image"
            />
          </div>

          <div className="col-md-6">
            <div className="card-body">
              <h1 className="card-title fs-2 text-capitalize">
                Pizza {pizza.name}
              </h1>

              <p className="card-text">
                {pizza.desc}
              </p>

              <h2 className="fs-5 mt-4 fw-bold text-dark">
                 Ingredientes
              </h2>

              <ul>
                {pizza.ingredients.map((ingredient) => (
                  <li key={ingredient}>
                    {ingredient}
                  </li>
                ))}
              </ul>

              <p className="fs-4 fw-bold">
                Precio: ${formatCurrency(pizza.price)}
              </p>

              <button
                type="button"
                className="btn btn-dark"
              >
                Añadir 🛒
              </button>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};

export default Pizza;