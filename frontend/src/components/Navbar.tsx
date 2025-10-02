import { NavLink, useNavigate } from "react-router";
import { assets } from "../assets/assets";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [token, setToken] = useState<boolean>(true);

  return (
    <div className="flex items-centermedia query expectedcss(css-mediaqueryexpected) justify-between text-sm mb-5 py-4 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Prescripto Logo"
      />
      <ul className="hidden md:flex  items-start gap-5 font-medium">
        <NavLink to={"/"}>
          <li className="py-1 ">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/doctors"}>
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/about"}>
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/contact"}>
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative ">
            <img
              className="w-8 rounded-full"
              src={assets.profile_pic}
              alt="Profile Picture"
            />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block right-0 ">
              <div className="min-w-48 rounded bg-stone-100 flex flex-col gap-4 p-4 ">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => setToken(false)}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full
            font-light hidden md:block cursor-pointer"
          >
            Create account
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="menu icon"
        />
        <div
  className={`md:hidden fixed top-0 right-0 h-full z-20 bg-white transition-transform duration-300 ease-in-out
    ${showMenu ? "translate-x-0 w-full" : "translate-x-full w-3/4"}`}
>
          <div className="flex items-center justify-between px-5 py-6">
            <img
            className="w-36"
             src={assets.logo} alt="Logo" />
            <img 
            className="w-7"
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon} alt="cross icon" />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink  to="/" onClick={() => setShowMenu(false)}><p className="px-4 py-2 rounded inline-block">HOME</p></NavLink>
            <NavLink  to="/doctors" onClick={() => setShowMenu(false)}><p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p></NavLink>
            <NavLink  to="/about" onClick={() => setShowMenu(false)}><p className="px-4 py-2 rounded inline-block">ABOUT</p></NavLink>
            <NavLink  to="/contact" onClick={() => setShowMenu(false)}><p className="px-4 py-2 rounded inline-block">CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
