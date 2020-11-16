import React,{Component} from 'react';
import Styles from './Components.module.css';
import ReactMapboxGl, { Layer, Feature,Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import { Spring } from 'react-spring/renderprops'; 

const Map = ReactMapboxGl({
    accessToken:
    'pk.eyJ1IjoicmFnaHVyYWpqIiwiYSI6ImNrMnJpYzhzZjA2MGIzZXBkb2oxYnV2MWQifQ.1PinwGk6Y3P0q-l7SXkfWg'
});

class ComplaintDetail extends Component{

    constructor(props){
        super(props);
        this.state={
            complaintData:''
        };
        this.LoadData=this.LoadData.bind(this);
    }

    async LoadData(){
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };

            try {
                const pk = (window.location.pathname.split('/'))[2];
                const url = '/complaint/api/pastcomplaint/'+pk+'/';
                const res = await axios.get(url, config);
                console.log(res.data);
                this.setState({
                    complaintData:res.data
                })
            
            } catch (err) {
                console.log(err);
            }
        } 

    }

    componentDidMount() {
        this.LoadData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
          this.LoadData();
        }
    }

    render(){
        return(
            <Spring
                from={{opacity:0,marginLeft:-500}}
                to={{opacity:1,marginLeft:0}}
                config={{duration:1000}}
                >
                    {props =>(
                    <div style={props}>
                         <div className={Styles.container}>
                            <div className="row">
                                <h1>{this.state.complaintData[0]?this.state.complaintData[0].Category:'Category'}</h1>
                            </div>
                            <div className="row my-5 mx-5">
                                <div className={`col-10 col-md-5 mt-3 ${Styles.c_detail}`}>
                                    <p>{this.state.complaintData[0]?this.state.complaintData[0].description:'description'}</p>
                                    <br/>
                                    <p>{this.state.complaintData[0]?this.state.complaintData[0].latitude:'latitude'}</p>
                                    <p>{this.state.complaintData[0]?this.state.complaintData[0].longitude:'longitude'}</p>
                                </div>
                                <div className="col-10 col-md-5 pr-5">
                                    <Map
                                        style="mapbox://styles/mapbox/streets-v9"
                                        containerStyle={{
                                            height: '60vh',
                                            width: '40vw'
                                        }}
                                        center={this.state.complaintData[0]?[this.state.complaintData[0].longitude,this.state.complaintData[0].latitude]:[80.94615925,26.8467088]}
                                        zoom={[5]}
                                    >
                                        {this.state.complaintData[0]?
                                        <Marker
                                            coordinates={[this.state.complaintData[0].longitude,this.state.complaintData[0].latitude]}
                                            anchor="bottom"
                                            width='10px'
                                            height='10px'>
                                            <div className={Styles.mapMarkerStyle} />
                                        </Marker>:
                                        <Marker
                                            coordinates={[80.94615925, 26.8467088]}
                                            anchor="bottom"
                                            width='10px'
                                            height='10px'>
                                            <div className={Styles.mapMarkerStyle} />
                                        </Marker>
                                        }
                                    </Map>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
            </Spring>
        );
    }
}

export default ComplaintDetail;