import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Authcontext } from "../Authcontext/Authcontext";

export default function Navbar() {
  const [isOPen, setIsopen] = useState(false);
  const { userToken, setUserToken } = useContext(Authcontext);
  const navigate = useNavigate();
  function siginOut() {
    setUserToken("");
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <header className="bg-gray-800 z-50 absolute w-full">
      <nav className="container mx-auto px-12 py-3">
        <div className="flex items-center ">
          <div className="flex items-center justify-center ">
            <div className="text-white font-bold text-xl me-8">
              <Link>FreshCard</Link>
            </div>
            {userToken && (
              <div className="hidden md:block">
                <ul className="flex items-center space-x-2">
                  <li>
                    <NavLink to={"/"} className="block px-1 py-2 text-white">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/product"}
                      className="block px-1 py-2 text-white"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/categories"}
                      className="block px-1 py-2 text-white "
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/brands"}
                      className="block px-1 py-2 text-white "
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/cart"}
                      className="block px-1 py-2 text-white "
                    >
                      Cart
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/wishlist"}
                      className="block px-1 py-2 text-white "
                    >
                      Wish-list
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
            <div className="md:hidden">
              <button
                onClick={() => {
                  setIsopen(!isOPen);
                }}
                className="outline-none mobile-menu-button"
              >
                <svg
                  className="w-6 h-6 text-white"
                  x-show="!showMenu"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="ms-auto flex items-center gap-2">
            <div className="social-media">
              <i className="fa-brands text-white mx-1 fa-facebook-f"></i>
              <i className="fa-brands text-white mx-1 fa-instagram"></i>
              <i className="fa-brands text-white mx-1 fa-linkedin"></i>
              <i className="fa-brands text-white mx-1 fa-youtube"></i>
              <i className="fa-brands text-white mx-1 fa-twitter"></i>
            </div>
            <div>
              <ul className="flex gap-1">
                {!userToken && (
                  <>
                    <li>
                      <NavLink
                        to={"/login"}
                        className="block px-1 py-2 text-white"
                      >
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/register"}
                        className="block px-1 py-2 text-white"
                      >
                        Register
                      </NavLink>
                    </li>
                  </>
                )}

                {userToken && (
                  <li>
                    <button
                      onClick={siginOut}
                      className="block px-1 py-2 text-white"
                    >
                      SignOut
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        {userToken && (
          <div
            className={
              isOPen
                ? "mobile-menu  md:hidden"
                : "mobile-menu  md:hidden hidden"
            }
          >
            <ul className="mt-4 space-y-4">
              <li>
                <NavLink
                  to={"/"}
                  className="block px-1 py-2 text-white bg-gray-900 rounded"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/product"}
                  className="block px-1 py-2 text-white bg-gray-900 rounded"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/categories"}
                  className="block px-1 py-2 text-white bg-gray-900 rounded"
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/brands"}
                  className="block px-1 py-2 text-white bg-gray-900 rounded"
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/cart"}
                  className="block px-1 py-2 text-white bg-gray-900 rounded"
                >
                  Cart
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
