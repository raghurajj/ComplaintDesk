import React,{Component} from 'react';
import Styles from './Components.module.css';

class RegisterEmployee extends Component{
    constructor(props){
        super(props);
        this.state={
           username:"",
           password:""
        };
        this.onChangeInput=this.onChangeInput.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
    }

    onChangeInput(event){
        this.setState({
            [event.target.name]:event.target.value
        })

    }

    handleLogin(event){
        event.preventDefault();
    }

    render(){
        return (
            <div className="row" >
                <div className="col-md-5 mx-auto my-5">
                    
                    <form method="GET">
                        <div className={Styles.C_input}>
                            <input onChange={this.onChangeInput}  type="text" name="username" placeholder="Username"/><br/> 
                        </div>  
                        <div className={Styles.C_input}>
                            <input onChange={this.onChangeInput} type="password" name="password" placeholder="Password"/><br/> 
                        </div> 

                        <button onClick={this.handleLogin} className={`${Styles.btn} ${Styles.fill_button}`}>Register</button>
                        
                    </form>
                </div>
            </div>

        );
    }
}

export default RegisterEmployee;