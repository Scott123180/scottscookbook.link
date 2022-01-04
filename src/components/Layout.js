import React from "react";
import PropTypes from "prop-types";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "./layout.css";

const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;
