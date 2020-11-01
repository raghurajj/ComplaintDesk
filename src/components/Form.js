import React,{Component} from 'react';
import Styles from './Components.module.css';

class Form extends Component{

    constructor(props){
        super(props);
        this.state={
            topic:"",
            description:"",
            lattitude:"",
            longitude:""
        };
        this.getLocation= this.getLocation.bind(this);
        this.getCoordinates=this.getCoordinates.bind(this);
        this.onChangeInput=this.onChangeInput.bind(this);
    }

    getLocation(event) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.getCoordinates);
        } else {
          alert("Geolocation is not supported by this browser.");
        }
        event.preventDefault();

    }

    getCoordinates(position)
    {
        this.setState({
            lattitude:position.coords.latitude,
            longitude:position.coords.longitude
        })
    }

    onChangeInput(event){
        this.setState({
            [event.target.name]:event.target.value
        })

    }

    render(){
        return (
            <div >
                <form>
                    <div className={Styles.C_input}>
                        <input onChange={this.onChangeInput}  type="text" name="topic" placeholder="Topic"/><br/> 
                    </div>  
                    <div className={Styles.C_input}>
                        <textarea onChange={this.onChangeInput} type="text" name="description" placeholder="Description"/><br/> 
                    </div> 
                    <div className={Styles.C_input}>
                        <input onChange={this.onChangeInput} type="number" name="lattitude" placeholder="Lattitude" value={this.state.lattitude}/><br/> 
                    </div> 
                    <div className={Styles.C_input}>
                        <input onChange={this.onChangeInput} type="number" name="longitude" placeholder="Longitude" value={this.state.longitude}/><br/> 
                    </div> 

                    <button onClick={this.getLocation }   className={`${Styles.btn} ${Styles.fill_button}`}>getlocation</button>
                    
                </form>
            </div>

        );
    }
}

export default Form;