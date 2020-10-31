import React,{Component} from 'react';
import {NavLink,Link} from 'react-router-dom'
import Styles from './Components.module.css';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavbarBrand,Nav, NavbarToggler, Collapse , NavItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPlusSquare, faArchive } from '@fortawesome/free-solid-svg-icons'

export default class Header extends Component{
    constructor(props){
        super(props);
        this.state={
            isNavOpen:false,
        };
        this.toggleNav=this.toggleNav.bind(this);
    }

    toggleNav(){
        this.setState({
            isNavOpen:!this.state.isNavOpen
        });
    }

    render(){
        var navbarr="navbar ";
        var nav_link = "nav-link ";
        return(
            <Navbar dark className={`${navbarr}${Styles.nvbr}`} expand="md">
                <div className="container" >
                    <NavbarToggler onClick={this.toggleNav} className={Styles.abslt}/>
                    <NavbarBrand href="/" className="mr-auto ">
                        <Link to="/"  className={Styles.navlink}><FontAwesomeIcon icon={faHome} />&nbsp;ComplaintDesk</Link>
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen } navbar>
                        <Nav navbar className="ml-auto">
                            <NavItem>
                                <NavLink className={`${nav_link}${Styles.navlink}`} to="/newcomplaint">
                                <FontAwesomeIcon icon={faPlusSquare} />&nbsp;New Complaint
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={`${nav_link}${Styles.navlink}`} to="/pastcomplaints">
                                <FontAwesomeIcon icon={faArchive} />&nbsp;Past Complaints
                                </NavLink>
                            </NavItem>

                        </Nav>
                    </Collapse>
                    
                </div>
            </Navbar>
            
        );
    }
}
// navbar-dark bg-black

{/* <nav className={`${navbarr}${Styles.nvbr}`}>
            <NavLink to="/" className={`${navbar_brand}${Styles.navlink}`}>ComplaintDesk</NavLink>
            <button className="navbar-toggler" type="" data-toggle="collapse" data-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarMenu">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink to="/newcomplaint" className={Styles.navlink}>New Complaint &nbsp;&nbsp;</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/pastcomplaints" className={Styles.navlink}>Past Complaint</NavLink>
                    </li>
                </ul>
            </div>
        </nav> */}