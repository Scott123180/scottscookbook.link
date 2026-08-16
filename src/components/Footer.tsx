import * as React from "react";
import { Link } from "gatsby";
import PatreonSVG from "../Icons/PatreonSVG";
import PersonalWebsiteSVG from "../Icons/PersonalWebsiteSVG";
import GitHubSVG from "../Icons/GithubSVG";

const ICON_FILL = "rgba(255, 253, 249, 0.75)";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-content-container">
          <div className="copyright">© {(new Date().getFullYear())} &nbsp;
            <Link to="/" style={{ textDecoration: "none", color: "inherit"}}>Scott's Cookbook</Link>
          </div>
          <div className="social-icons-container">
            <a href="https://www.scotthansen.io/" target="_blank" rel="noreferrer">
              <PersonalWebsiteSVG fill={ICON_FILL} />
            </a>
            <a href="https://github.com/Scott123180/eatwell.link" target="_blank" rel="noreferrer">
              <GitHubSVG fill={ICON_FILL} />
            </a>
            <a href="https://www.patreon.com/scotthansen" target="_blank" rel="noreferrer">
              <PatreonSVG fill={ICON_FILL} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
