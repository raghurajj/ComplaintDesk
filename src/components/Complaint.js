import React,{Component} from 'react';
import Styles from './Components.module.css';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

const Map = ReactMapboxGl({
    accessToken:
    'pk.eyJ1IjoicmFnaHVyYWpqIiwiYSI6ImNrMnJpYzhzZjA2MGIzZXBkb2oxYnV2MWQifQ.1PinwGk6Y3P0q-l7SXkfWg'
});

class Complaint extends Component{

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
        this.onClickMap=this.onClickMap.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
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

    async handleSubmit(event){
        event.preventDefault();
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };
    

            const res = await axios.get('/auth/users/me/', config);
            // console.log(res);
            const author = res.data.id;
            const Category = this.state.topic;
            const description = this.state.description;
            const latitude = this.state.lattitude;
            const longitude = this.state.longitude;
            const body = JSON.stringify({author, Category,description,latitude,longitude});
            console.log(body);
            try {
                const res = await axios.post('/complaint/api/',body, config);
                console.log("compliant post success");
            
            } catch (err) {
                console.log("compliant post failed");
            }
        } 

    }

    onClickMap(map, evt) {
        this.setState({
            lattitude:evt.lngLat.lat,
            longitude:evt.lngLat.lng
        })
    }

    render(){
        return(
            <div className={Styles.fitpage}>
                <div className="row">
                    <h1>Add a New Complaint</h1>
                </div>
                <div className="row my-5 mx-5">
                    <div className="col">
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

                            {/* <div className={Styles.C_input}>
                                <input type="file" name="image" placeholder="image" /><br/> 
                            </div> */}
                            <div className="row">
                                <div className="col-md-5 mx-auto" >
                                <button onClick={this.getLocation }   className={`${Styles.btn} ${Styles.fill_button}`}>getlocation</button>
                                </div>
                                <div className="col-md-5 mx-auto" >
                                    <button onClick={this.handleSubmit} className={`${Styles.btn} ${Styles.fill_button}`}> Submit Complaint</button>
                                </div>
                            </div>
                            
                        </form>
                    </div>
                    <div className="col">
                        <div >
                            <Map
                                style="mapbox://styles/mapbox/streets-v9"
                                containerStyle={{
                                    height: '60vh',
                                    width: '45vw'
                                }}
                                center={[80.94615925,26.8467088]}
                                zoom={[9]}
                                onClick={this.onClickMap}
                            />
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default Complaint;