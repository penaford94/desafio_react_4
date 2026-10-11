import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
//import Login from "./components/Login";
//import Register from "./components/Register";
//import Home from "./components/Home";

//import Header from "./components/Header";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      {/* <Header/> */}
      <Cart/>
      {/*       <main className="auth-main">
        <Home/>
      </main> */}
      {/* <Home /> */}
      {/* <Register/> */}
      {/* <Login/> */}

      <Footer />
    </div>
  );
};

export default App;