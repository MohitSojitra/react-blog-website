import React, {useState , useEffect} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import "./NavigationBar.css";
import {Link} from "react-router-dom"

// import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import App from "../../App.js"

function NavigationBar() {
    let location = window.location
    

    const [isOpen,
        setIsOpen] = useState(false);
    
    const [activeLink , setActiveLink] = useState("");

    

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="navBar1">

            <Navbar color="dark" dark className="fixed-top" expand="md">
                <NavItem ><Link to="/" className="text-white">JSOM</Link></NavItem>
                <NavbarToggler onClick={toggle}/>
                <Collapse
                    className="text-center row"
                    isOpen={isOpen}
                    navbar
                    style={{
                    color: "white"
                }}>
                   
                    <NavLink className="col-md-6 text-right" to="/">
                    
                            {!isNaN(location.pathname.split("/")[1]) ? "Authors" : location.pathname.split("/")[1]}
                    
                    </NavLink>
                    

                    <Nav className="ml-auto text-right col-md-4" navbar>
                    
                        <NavItem className={location.pathname.split("/")[1] === "MostLikedPost" ? "d-none" : ""}>
                            {/* <NavLink to="/MostLikedPost"> */}
                            
                                <Link  to="/MostLikedPost">
                                   <p className="text-secondary m-2"> MostLikedPost</p>
                                </Link>
                           
                            {/* </NavLink> */}
                        </NavItem>
                        
                        <NavItem className={location.pathname.split("/")[1] === "MostCommentPost" ? "d-none" : ""}>
                            {/* <NavLink id="2s"> */}
                            <Link  to="/MostCommentPost">
                                   <p className="text-secondary m-2"> MostCommentPost</p>
                            </Link>
                            {/* </NavLink>   */}
                        </NavItem>

                    </Nav>

                </Collapse>
            </Navbar>

        </div>
    );
}

export default NavigationBar;