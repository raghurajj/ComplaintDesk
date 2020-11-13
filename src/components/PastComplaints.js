import React,{Component} from 'react';
import axios from 'axios';
import Styles from './Components.module.css';
import {Link} from 'react-router-dom'



class PastComplaint extends Component{
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
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get('/complaint/api/pastcomplaint/', config);
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
            <div className={Styles.container}>
                {this.state.complaintData &&
                this.state.complaintData.map(complaint => {
                    {console.log(complaint.pk)}

                    return (
                        <Link className={Styles.linkk} to={`complaintdetail/${complaint.pk}`}>
                            <div className={Styles.complaint}>
                                <div className="card">
                                    <div className="card-header">
                                    <h4>{complaint.Category}</h4>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">{complaint.description}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        );
    }
}

export default PastComplaint;



















// import React from 'react';
// import Styles from './Components.module.css';

// const PastComplaint = ()=>{
//     return(
//         <div>
//             <button className={`${Styles.btn} ${Styles.fill_button}`}>PastComplaint </button>
//             <button className={`${Styles.btn} ${Styles.empty_button}`}>PastComplaint </button>
//         </div>
//     );
// }

// export default PastComplaint;