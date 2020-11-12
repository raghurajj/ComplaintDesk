import React,{Component} from 'react';
import axios from 'axios';
import Styles from './Components.module.css';


class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            complaintData:[]
        };
        this.LoadData=this.LoadData.bind(this);
    }

    async LoadData(){
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get('/complaint/api/', config);
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
            <div>
                {this.state.complaintData &&
                this.state.complaintData.map(complaint => {

                    return (
                        <div className={Styles.complaint}>
                            <div className="card">
                                <div className="card-header">
                                {complaint.Category}
                                </div>
                                <div className="card-body">
                                    {/* <h5 className="card-title">Special title treatment</h5> */}
                                    <p className="card-text">{complaint.description}</p>
                                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                                </div>
                            </div>
                        </div>
                    
                    // <div className={Styles.complaint}>
                    //     <h4>{complaint.Category}</h4>
                    //     <p>{complaint.description}</p>
                    // </div>
                    );
                })}
            </div>
        );
    }
}

export default Home;