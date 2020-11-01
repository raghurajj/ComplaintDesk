import React,{Component} from 'react';
import {NavLink,Link} from 'react-router-dom'
import Styles from './Components.module.css';
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
        return(
            <Navbar dark className={`${Styles.nvbr}`} expand="md">
                <div className="container" >
                    <NavbarToggler onClick={this.toggleNav} className={Styles.abslt}/>
                    <NavbarBrand  className="mr-auto ">
                        <NavLink to="/"  className={Styles.navlink}><FontAwesomeIcon icon={faHome} />&nbsp;ComplaintDesk</NavLink>
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen } navbar>
                        <Nav navbar className="ml-auto">
                            <NavItem>
                                <NavLink className={`${Styles.navlink}`} to="/newcomplaint">
                                <FontAwesomeIcon icon={faPlusSquare} />&nbsp;New Complaint&nbsp;&nbsp;
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={`${Styles.navlink}`} to="/pastcomplaints">
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