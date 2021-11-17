import React from "react"
import SEO from "../components/Seo";
import Nav from "../components/Nav";
import { StaticImage } from "gatsby-plugin-image";

const AboutPage = () => (
  <div>
    <SEO title="About" />
    <Nav />
    <div className = "bio-container">
      <StaticImage 
        src="../images/about_page_photo.jpg"
        placeholder="blurred"
        className="bio-image"
        loading="lazy"
      />
      <div className="containy">
        <h1 className="name">Scott's Cookbook</h1> 
        <h1 className="short-bio">A Healthy Eating Website</h1> 
      </div>
    </div>
    
    <div className="biography-container">
      <p><span>W</span>elcome to Scott's Cookbook! 
        The main goal of this website is as my own personal cookbook for recipes I have made. Why?
        One answer is convenience. Another answer is that I really hate other online recipe websites. They'll
        give you this massive blog post with pictures, their life story, and other irrelevant things. Then you have to
        scroll all the way down to the bottom of the website to find the recipe but an advertisement pops up in your way.
      </p>

      <p>
        This website is ad free and will always be ad free. If you like this website and consider supporting me with the link below. 
        If not, it's cool.
      </p>
      
      <p>
        You'll notice a theme around the recipes on the website, they're generally healthy. Always use your own judgment when someone
        says something is healthy. If you haven't already, explore scientific dietary guidelines - there's a wealth of information out there,
        as well as a wealth of disinformation. 
      </p>

      <p>
        Hope you enjoy!
      </p>

      <p>
        Patreon support: <a href="https://www.patreon.com/scotthansen" target="_blank" rel="noreferrer">https://www.patreon.com/scotthansen</a>
      </p>

    </div>
  </div>
)

export default AboutPage
