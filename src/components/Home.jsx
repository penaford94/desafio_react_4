import Header from "./Header";
import CardPizza from "./CardPizza";
import { pizzas } from "../utils/pizza.js";

const Home = () => {
  return (
    <main>
      <Header />

      <section className="container my-5">
        <div className="row g-4">
          {pizzas.map((pizza) => (
            <div className="col-12 col-md-4" key={pizza.id}>
              <CardPizza
                name={pizza.name}
                desc={pizza.desc}
                price={pizza.price}
                ingredients={pizza.ingredients}
                img={pizza.img}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;