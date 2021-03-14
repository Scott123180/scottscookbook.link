import React from 'react'
import { Link } from "gatsby"
import PatreonSVG from "../Icons/PatreonSVG"
import PersonalWebsiteSVG from "../Icons/PersonalWebsiteSVG"

const Footer = () => {
  return (
    <div className="footer-container">
      <hr className="horizontal-line" />
      <div className="footer-content-container">
        <div className="copyright">© {(new Date().getFullYear())} &nbsp;
          <Link to="/" style={{ textDecoration: "none", color: "black"}}>EatWell</Link>
        </div>
        <div className="social-icons-container">
          <a href="https://www.scotthansen.io/" target="_blank">
            <PersonalWebsiteSVG />
          </a>
          <a href="https://www.patreon.com/scotthansen" target="_blank">
            <PatreonSVG />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer;