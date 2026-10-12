import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Pizza from "./components/Pizza";
// import Home from "./components/Home";

const App = () => {
  return (
    <div className="app">
      <Navbar />

      {/* <Home /> */}
      <Pizza />

      <Footer />
    </div>
  );
};

export default App;