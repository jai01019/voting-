import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import {
  Vote,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  BarChart3,
  Users,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, children, icon: Icon, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive(to)
          ? "bg-indigo-700 text-white"
          : "text-indigo-100 hover:bg-indigo-600 hover:text-white"
      }`}
    >
      {Icon && <Icon className="h-4 w-4 mr-2" />}
      {children}
    </Link>
  );

  return (
    <nav className="w-full bg-indigo-600 px-6 py-4">
      <div className="flex items-center justify-between text-white">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to={
                isAuthenticated
                  ? isAdmin
                    ? "/admin/dashboard"
                    : "/dashboard"
                  : "/"
              }
              className="flex items-center"
            >
              <Vote className="h-8 w-8 text-white mr-2" />
              <span className="text-white text-xl font-bold">VoteSystem</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-4">
              {isAdmin ? (
                // Admin Navigation
                <>
                  <NavLink to="/admin/dashboard" icon={BarChart3}>
                    Dashboard
                  </NavLink>
                  <NavLink to="/admin/users" icon={Users}>
                    Users
                  </NavLink>
                  <NavLink to="/admin/candidates" icon={Settings}>
                    Candidates
                  </NavLink>
                  <NavLink to="/admin/results" icon={BarChart3}>
                    Results
                  </NavLink>
                </>
              ) : (
                // User Navigation
                <>
                  <NavLink to="/dashboard" icon={User}>
                    Dashboard
                  </NavLink>
                  <NavLink to="/vote" icon={Vote}>
                    Vote
                  </NavLink>
                </>
              )}

              {/* User Menu */}
              <div className="relative">
                <div className="flex items-center space-x-4">
                  <NavLink to="/profile" icon={User}>
                    Profile
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-600 hover:text-white transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Mobile menu button */}
          {isAuthenticated && (
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        {isAuthenticated && isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {user?.name && (
                <div className="text-indigo-100 px-3 py-2 text-sm">
                  Welcome, {user.name}
                </div>
              )}

              {isAdmin ? (
                // Admin Mobile Navigation
                <>
                  <NavLink
                    to="/admin/dashboard"
                    icon={BarChart3}
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/admin/users"
                    icon={Users}
                    onClick={() => setIsOpen(false)}
                  >
                    Users
                  </NavLink>
                  <NavLink
                    to="/admin/candidates"
                    icon={Settings}
                    onClick={() => setIsOpen(false)}
                  >
                    Candidates
                  </NavLink>
                  <NavLink
                    to="/admin/results"
                    icon={BarChart3}
                    onClick={() => setIsOpen(false)}
                  >
                    Results
                  </NavLink>
                </>
              ) : (
                // User Mobile Navigation
                <>
                  <NavLink
                    to="/dashboard"
                    icon={User}
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/vote"
                    icon={Vote}
                    onClick={() => setIsOpen(false)}
                  >
                    Vote
                  </NavLink>
                </>
              )}

              <NavLink
                to="/profile"
                icon={User}
                onClick={() => setIsOpen(false)}
              >
                Profile
              </NavLink>

              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-600 hover:text-white transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
