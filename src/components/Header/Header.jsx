import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import "./Header.scss";
import { Button } from "../utils/buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction, removeUserAction } from "../../features/slices/authSlice";

export const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.value);
  
  useEffect(() => {
    const getData = () => {
      dispatch(getUserAction())
    }
    getData()
  }, [])

  const handleLogout = () => {
    dispatch(removeUserAction())
  }

  const logoONG = "/images/assets/logo.png";
  //! This function will request the image url from a database
  // const getLogo = async () => {
  //   const response = await fetch(DATABASE_URL + "/logo");
  //   const blob = await response.blob();
  //   const src = URL.createObjectURL(blob);
  //   return src;
  // };
  const [isOpen, setOpen] = useState(false);
  const showNavbar = isOpen ? "show-navbar" : "";
  const itemsNav = [
    { title: "Inicio", route: "" },
    { title: "Nosotros", route: "about" },
    { title: "Novedades", route: "novelties" },
    { title: "Testimonios", route: "testimonials" },
    { title: "contacto", route: "contacts" },
    { title: "Contribuye", route: "contribute" },
  ];
  const location = useLocation();
  useEffect(() => {
    const itemsHeader = Array.from(document.querySelectorAll(".navbar-list a"));
    itemsHeader.map((item) => {
      item.pathname === location.pathname
        ? item.classList.add("active")
        : item.classList.remove("active");
    });
  }, [location.pathname]);
  return (
    <header>
      <Link className="logo" to="/">
        <img src={logoONG} alt="Logo SOMOS ONG" />
      </Link>

      <nav className={`navbar ${showNavbar}`}>
        <figure className="logo navbar-logo">
          <img src={logoONG} alt="Logo SOMOS ONG" />
        </figure>
        <ul className="navbar-list">
          {itemsNav.map((item, index) => (
            <Link
              onClick={() => setOpen(false)}
              key={index}
              to={`/${item.route}`}
            >
              {item.title}
            </Link>
          ))}
        </ul>
        <div className="buttons-container">
          {!user? 
              <>
                <Button url="auth/login" className="button button-primary" title="Ingresar"/>
                <Button url="auth/register" className="button button-outline" title="Registrarse"/>
              </>
              : <Button url="/" className="button button-primary" onClick={handleLogout} title="Cerrar sesión"/>
          }
        </div>
      </nav>
      <Hamburger toggled={isOpen} toggle={() => setOpen(!isOpen)} />
    </header>
  );
};