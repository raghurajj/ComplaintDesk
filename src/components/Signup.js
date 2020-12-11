import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { signup } from '../actions/auth';
import Styles from './Components.module.css';
import { Spring } from 'react-spring/renderprops'; 
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle, faTwitter } from "@fortawesome/free-brands-svg-icons"


const Signup = ({ signup, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname:'',
        email: '',
        password: '',
        re_password: '',
        is_employee:false
    });

    const [accountCreated, setAccountCreated] = useState(false);

    const { firstname,lastname, email, password, re_password, is_employee } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onChangecheckbox = e => setFormData({ ...formData, [e.target.name]: e.target.checked });
    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup({ firstname,lastname, email, password, re_password });
            setAccountCreated(true);
        }
        else{
            alert("Both passwords must be same!");
        }
        console.log(formData);
    };
    
    const continueWithGoogle = async()=>{
        try{
            const res = await axios.get('/auth/o/google-oauth2/?redirect_uri=http://localhost:8000/google')
            window.location.replace(res.data.authorization_url);
        }
        catch(err){
            // co
        }
    };
    
    const continueWithFacebook = async()=>{
        try{
            const res = await axios.get('/auth/o/facebook/?redirect_uri=http://localhost:8000/facebook')
            window.location.replace(res.data.authorization_url);
        }
        catch(err){
            // co
        }
    };

    const continueWithTwitter = async()=>{
        try{
            const res = await axios.get('/auth/o/twitter/?redirect_uri=http://localhost:8000/twitter')
            window.location.replace(res.data.authorization_url);
        }
        catch(err){
            // co
        }
    };

    if (isAuthenticated)
        return <Redirect to='/' />;
    if (accountCreated)
        return <Redirect to='login' />;
    
    return (
        <Spring
            from={{opacity:0,marginLeft:-500}}
            to={{opacity:1,marginLeft:0}}
            config={{duration:1000}}
            >
                {props =>(
                   <div style={props}>
                        <div className={Styles.fitpage}>
                            <div className='row mx-3'>
                                <div className="col-md-5 mx-auto my-auto"> 
                                    <h1>Sign Up</h1>
                                    <p>Create your Account</p>
                                    <form onSubmit={e => onSubmit(e)}>
                                        <div className='form-group'>
                                            <input 
                                                className='form-control'
                                                type='text'
                                                placeholder='First Name'
                                                name='firstname'
                                                value={firstname}
                                                onChange={e => onChange(e)}
                                                required 
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <input 
                                                className='form-control'
                                                type='text'
                                                placeholder='Last Name'
                                                name='lastname'
                                                value={lastname}
                                                onChange={e => onChange(e)}
                                                required 
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <input 
                                                className='form-control'
                                                type='email'
                                                placeholder='Email*'
                                                name='email'
                                                value={email}
                                                onChange={e => onChange(e)}
                                                required 
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <input
                                                className='form-control'
                                                type='password'
                                                placeholder='Password*'
                                                name='password'
                                                value={password}
                                                onChange={e => onChange(e)}
                                                minLength='6'
                                                required
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <input
                                                className='form-control'
                                                type='password'
                                                placeholder='Confirm Password*'
                                                name='re_password'
                                                value={re_password}
                                                onChange={e => onChange(e)}
                                                minLength='6'
                                                required
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <div className="row">
                                                <div className="col"><p>Is Employee?</p></div>
                                                <div className="col">
                                                    <input
                                                    className='form-control'
                                                    type="checkbox"
                                                    name='is_employee'
                                                    onChange={e => onChangecheckbox(e)}
                                                    />
                                                </div>
                                            </div>
                                            
                                        </div>

                                        { is_employee?
                                            <div className='form-group'>
                                                <div className="row">
                                                    <div className="col col-3"><p>ID Card</p></div>
                                                    <div className="col">
                                                        <input
                                                            className='form-control'
                                                            type='file'
                                                            placeholder='Upload Image'
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                
                                            </div>:null

                                        }

                                        <button className={`${Styles.btn} ${Styles.fill_button}`}  type='submit'>Register</button>
                                    </form>
                                    <p className='mt-3'>
                                        OR
                                    </p>
                                    <p className='mt-3'>
                                        <button className="btn btn-danger" onClick={continueWithGoogle}><FontAwesomeIcon icon={faGoogle} /> &nbsp;Continue with google</button>
                                    </p>
                                    <p className='mt-3'>
                                        <button className="btn btn-primary" onClick={continueWithFacebook}><FontAwesomeIcon icon={faFacebook} /> &nbsp; Continue with facebook</button>
                                    </p>
                                    <p className='mt-3'>
                                        <button className="btn btn-success" onClick={continueWithTwitter}><FontAwesomeIcon icon={faTwitter} /> &nbsp;Continue with twitter</button>
                                    </p>
                                    <p className='mt-3'>
                                        Already have an account? <Link to='/login'>Sign In</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                   </div>
                )}
         </Spring>
       
    );

};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { signup })(Signup);























// import React,{Component} from 'react';
// import {Link} from 'react-router-dom';
// import Styles from './Components.module.css';

// class Signup extends Component{
//     constructor(props){
//         super(props);
//         this.state={
//            username:"",
//            password:""
//         };
//         this.onChangeInput=this.onChangeInput.bind(this);
//         this.handleLogin=this.handleLogin.bind(this);
//     }

//     onChangeInput(event){
//         this.setState({
//             [event.target.name]:event.target.value
//         })

//     }

//     handleLogin(event){
//         event.preventDefault();
//     }

//     render(){
//         return (
//             <div className="row" >
//                 <div className="col-md-5 mx-auto my-5">
//                 <button className={`${Styles.btn} ${Styles.fill_button}`}><Link to="/eregister" className={Styles.navlink}>Register as an Employee</Link></button>
//                     <p>OR</p>
//                     <h3>Register as an User</h3>
//                     <form method="GET">
//                         <div className={Styles.C_input}>
//                             <input onChange={this.onChangeInput}  type="text" name="username" placeholder="Username"/><br/> 
//                         </div>  
//                         <div className={Styles.C_input}>
//                             <input onChange={this.onChangeInput} type="password" name="password" placeholder="Password"/><br/> 
//                         </div> 

//                         <button onClick={this.handleLogin} className={`${Styles.btn} ${Styles.fill_button}`}>Register</button>
                        
//                     </form>
//                 </div>
//             </div>

//         );
//     }
// }

// export default Signup;