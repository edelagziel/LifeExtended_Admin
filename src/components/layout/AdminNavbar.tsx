import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";
import type { RootState } from "../../store/store";
import "./AdminNavbar.css";

export default function AdminNavbar() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <header className="admin-navbar">
      <div className="admin-navbar-container">
        <div className="admin-logo">
          <span className="logo-icon">🧬</span>
          <span className="logo-text">LifeExtended</span>
          <span className="logo-badge">Admin</span>
        </div>

        <div className="navbar-right">
          <nav className="admin-nav-links">
            <NavLink to="/" className="nav-link" end>
              <span className="nav-icon">📊</span>
              Dashboard
            </NavLink>
            <NavLink to="/create" className="nav-link">
              <span className="nav-icon">➕</span>
              Create Poll
            </NavLink>
            <NavLink to="/live" className="nav-link">
              <span className="nav-icon">🔴</span>
              Live
            </NavLink>
          </nav>

          <button className="theme-toggle" onClick={handleToggleTheme}>
            {mode === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </header>
  );
}
