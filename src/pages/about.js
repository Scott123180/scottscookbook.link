import React from "react"
import SEO from "../components/Seo"
import Nav from "../components/Nav"
import about from "../images/about_page_photo.jpg"

const AboutPage = () => (
  <div>
    <SEO title="About" />
    <Nav />
    <div className = "bio-container">
      <img className="bio-image" src={about} alt='' />
      <div className="containy">
        <h1 className="name">EatWell</h1> 
        <h1 className="short-bio">A Healthy Eating Website</h1> 
      </div>
    </div>
    
    <div className="biography-container">
      <p><span>W</span>elcome to EatWell! 
        The goal of this website is to provide the nutritional tools people need
        to live a happy and fulfilling life. Eating well is the foundation of long lasting health.
      </p>

      <p>
        This website is ad free and will always be ad free. Why? They get in the way of the content.
        Imagine browsing healthy recipes and getting an advertisement for pizza or donuts? Or imagine
        getting advertisements for weight loss pills. The health industry is dubious at best and outright
        snake-oil at the worst.
      </p>
      
      <p>
        My name is Scott Hansen, and I created this website as a part of my journey to better myself.
        There are very few resources out there for eating well. I couldn't
        find a way to promote healthy eating and had the features I wanted. So, I decided to make my own website!
      </p>

      <p>
        This website is based on nutrition eating guidelines set by the USDA (United States Department of Agriculture). 
        These guidelines are updated and revised every 5 years. The current revision are the 2020-2025 guidelines. 
        For more information on these, please visit 
        &nbsp;<a href="http://myplate.gov" target="_blank" rel="noreferrer">MyPlate.gov</a>.
      </p>

      <p>
        Disclaimer: as with any dietary changes, please work with your doctor to adjust your eating habits and preferences.
        Some people may have dietary restrictions that may impact the recipes they try from this website. I.e. Alergies, dietary
        fiber restrictions, etc.
      </p>

      <p>
        This website is 100% funded by we the people. If you like the content and are able to support
        what I do, please support me on patreon. The more support I get, the more features I'll add to this
        website. Thank you again for visiting this site. Enjoy!
      </p>

      <p>
        Patreon support: <a href="https://www.patreon.com/scotthansen" target="_blank" rel="noreferrer">https://www.patreon.com/scotthansen</a>
      </p>

    </div>
  </div>
)

export default AboutPage
