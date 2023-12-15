import * as React from "react"
import { Link } from "gatsby"

class Nav extends React.Component  {
  constructor() {
    super();
    this.state = {
      tools_active: false,
      about_active: false,
      is_post: false,
      tools_classname: "nav-item",
      about_classname: "nav-item",
      post_nav_container: "nav-container",
    }
  }
  
  componentDidMount() {
    if(window.location.href.includes("resources")) {
      this.setState({ 
        tools_active: false,
        about_active: false,
        is_post: true,
        tools_classname: "nav-item",
        about_classname: "nav-item",
        post_nav_container: "post-nav-container",
      })
    }
    else if(window.location.href.includes("about")) {
      this.setState({ 
        tools_active: false,
        about_active: true,
        is_post: false,
        bean_converter_classname: "nav-item",
        about_classname: "nav-item active-link",
        post_nav_container: "post-nav-container",
      })
    } else if(window.location.href.includes("tools")){
      this.setState({ 
        tools_active: true,
        about_active: false,
        is_post: false,
        tools_classname: "nav-item active-link",
        about_classname: "nav-item",
        post_nav_container: "post-nav-container",
      })

    }
  }
  
  render() {
    const { tools_classname: tools_classname, about_classname, post_nav_container } = this.state; 
    return(
      <div className={post_nav_container} id="nav-bar" style={{marginLeft: "5%", marginRight: "5%"}} >
        <Link to="/" className="nav-brand">
          <strong>S</strong>cott's<strong> C</strong>ookbook
        </Link>
        <ul className="nav-item-container">
          <li className={tools_classname} id="tools">
            <Link to="/tools">Cooking Tools</Link>
            <div className="underline"></div>
          </li>
          &nbsp; &nbsp;
          <li className={about_classname} id="about">
            <Link to="/about">About</Link>
            <div className="underline"></div>
          </li>
        </ul>
      </div>
    );
  }
}


export default Nav;