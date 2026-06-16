import { Link, Outlet } from "react-router";

export function LDefault() {
  return (
    <>
      <nav className="navbar is-primary">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            Web Library V4
          </Link>
        </div>
      </nav>
      <div className="container pt-2">
        <Outlet />
      </div>
    </>
  );
}
