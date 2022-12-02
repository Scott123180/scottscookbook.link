import * as React from "react";
import { Link } from "gatsby";
import PatreonSVG from "../Icons/PatreonSVG";
import PersonalWebsiteSVG from "../Icons/PersonalWebsiteSVG";
import GitHubSVG from "../Icons/GithubSVG";

const Footer = () => {
  return (
    <div className="footer-container">
      <hr className="horizontal-line" />
      <div className="footer-content-container">
        <div className="copyright">© {(new Date().getFullYear())} &nbsp;
          <Link to="/" style={{ textDecoration: "none", color: "black"}}>Scott's Cookbook</Link>
        </div>
        <div className="social-icons-container">
          <a href="https://www.scotthansen.io/" target="_blank" rel="noreferrer">
            <PersonalWebsiteSVG />
          </a>
          <a href="https://github.com/Scott123180/eatwell.link" target="_blank" rel="noreferrer">
            <GitHubSVG />
          </a>
          <a href="https://www.patreon.com/scotthansen" target="_blank" rel="noreferrer">
            <PatreonSVG />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer;