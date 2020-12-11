import React,{Component, Fragment} from 'react';
import {NavLink,Link, Redirect} from 'react-router-dom'
import Styles from './Components.module.css';
import { Navbar, NavbarBrand,Nav, NavbarToggler, Collapse , NavItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPlusSquare, faArchive, faSignInAlt ,faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { LOGOUT } from '../actions/types';
import store from '../store';

class Header extends Component{
    constructor(props){
        super(props);
        this.state={
            isNavOpen:false,
            redirect:false,
        };
        // handlelogout
        this.toggleNav=this.toggleNav.bind(this);
        this.handlelogout=this.handlelogout.bind(this);
    }

    toggleNav(){
        this.setState({
            isNavOpen:!this.state.isNavOpen
        });
    }

    handlelogout(){
        store.dispatch({ type: LOGOUT });
        this.setState({
            redirect:true
        });
    }


    render(){
        return(
            <Fragment>
                <Navbar dark className={`sticky-top ${Styles.nvbr}`} expand="md">
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
                                    <FontAwesomeIcon icon={faArchive} />&nbsp;Past Complaints&nbsp;&nbsp;
                                    </NavLink>
                                </NavItem>
                                {
                                    this.props.isAuthenticated?
                                    <NavItem>
                                    <NavLink className={`${Styles.navlink}`} to='#!' onClick={this.handlelogout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} />&nbsp;Logout
                                    </NavLink>
                                    </NavItem>:
                                    <NavItem>
                                    <NavLink className={`${Styles.navlink}`} to="/login">
                                    <FontAwesomeIcon icon={faSignInAlt} />&nbsp;Login
                                    </NavLink>
                                    </NavItem>
                                    

                                }
                            </Nav>
                        </Collapse>
                        
                    </div>
                </Navbar>
                {this.state.redirect? <Redirect to="/" /> : <Fragment></Fragment>}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Header);

// store.dispatch({ type: LOGOUT })