import { formatCurrency } from "../utils/formatCurrency";

const Navbar = () => {
  const total = 25000;
  const token = false;

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">Pizzería Mamma Mia!</span>

      <div className="d-flex flex-wrap gap-2 align-items-center flex-grow-1">
        {/* Siempre visible */}
        <button type="button" className="btn btn-outline-light btn-sm">
          🍕 Home
        </button>

        {/* Depende del token */}
        {token ? (
          <>
            <button type="button" className="btn btn-outline-light btn-sm">
              🔓 Profile
            </button>

            <button type="button" className="btn btn-outline-light btn-sm">
              🔒 Logout
            </button>
          </>
        ) : (
          <>
            <button type="button" className="btn btn-outline-light btn-sm">
              🔐 Login
            </button>

            <button type="button" className="btn btn-outline-light btn-sm">
              🔐 Register
            </button>
          </>
        )}

        {/* Siempre visible */}
        <button
          type="button"
          className="btn btn-outline-info btn-sm ms-lg-auto"
        >
          🛒 Total: ${formatCurrency(total)}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;