import React,{Component} from 'react';
import Styles from './Components.module.css';
import ReactMapboxGl, { Layer, Feature,Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

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
                const pk = window.location.pathname.slice(-1);
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
        const pathname = window.location.pathname.slice(-1);
        console.log(this.state.complaintData[0])
        return(
            <div>
                <div className="row">
                    <h1>{this.state.complaintData[0]?this.state.complaintData[0].Category:null}</h1>
                </div>
                <div className="row my-5 mx-5">
                    <div className={`col ${Styles.c_detail}`}>
                        <p>{this.state.complaintData[0]?this.state.complaintData[0].description:null}</p>
                        <br/>
                        <p>{this.state.complaintData[0]?this.state.complaintData[0].latitude:null}</p>
                        <p>{this.state.complaintData[0]?this.state.complaintData[0].longitude:null}</p>
                    </div>
                    <div className="col">
                        <Map
                            style="mapbox://styles/mapbox/streets-v9"
                            containerStyle={{
                                height: '50vh',
                                width: '50vw'
                            }}
                            center={[80.94615925,26.8467088]}
                            zoom={[9]}
                        >
                            <Layer
                                type="circle"
                                id="marker"
                                paint={{
                                    "circle-color": "#ff5200",
                                    "circle-stroke-width": 1,
                                    "circle-stroke-color": "#fff",
                                    "circle-stroke-opacity": 1
                                }}
                                >
                                <Feature coordinates={[-0.132, 51.518]} />
                                <Feature coordinates={[-0.142, 51.518]} />
                            </Layer>
                        </Map>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default ComplaintDetail;