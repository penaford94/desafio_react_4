import { formatCurrency } from "../utils/formatCurrency";

const CardPizza = ({ name, price, ingredients, img, desc}) => {
  return (
    <article className="card h-100">
      <img
        src={img}
        className="card-img-top pizza-image"
        alt={`Pizza ${name}`}
      />

      <div className="card-body d-flex flex-column">
        <h2 className="card-title fs-5">Pizza {name}</h2>
        <p className="card-title fs-5">Descripción: {desc}</p>

        <hr />

        <p className="text-center text-secondary mb-2">Ingredientes:</p>

        <ul className="list-unstyled text-center flex-grow-1">
          {ingredients.map((ingredient) => (
            <li key={ingredient}>🍕 {ingredient}</li>
          ))}
        </ul>

        <hr />

        <p className="text-center fs-4">
          Precio: ${formatCurrency(price)}
        </p>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-outline-dark">
            Ver más 👀
          </button>

          <button type="button" className="btn btn-dark">
            Añadir 🛒
          </button>
        </div>
      </div>
    </article>
  );
};

export default CardPizza;