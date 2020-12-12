import React,{Component} from 'react';
import axios from 'axios';
import Styles from './Components.module.css';
import {Link} from 'react-router-dom';
import { Spring } from 'react-spring/renderprops'; 
import PieChartt from './PieChartt';


class Testing extends Component{
    constructor(props){
        super(props);
        this.state={
            complaintData:[],
            topic:'',
            area:'',
            water:0,
            road:0,
            electricity:0,
            others:0
        };
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
                            <div className="row p-5">
                                <div className= {`${Styles.C_input} col-5 m-auto`}>
                                    <input type="text" placeholder="Topic"></input>
                                </div>
                                <div className={`${Styles.C_input} col-5 m-auto`}>
                                <input type="text" placeholder="Area"></input>
                                </div>
                            </div>
                            <div className="row p-5">
                                <div className="col col-6">
                                    <PieChartt/>
                                </div>

                                <div className="col col-6">
                                    <h4>Total number of complaints : 10</h4>
                                    <h4>Total number of complaints Solved : 4</h4>
                                    <h4>Total number of complaints pending : 3</h4>
                                    <h4>Total number of complaints unsolved : 3</h4>
                                </div>
                                
                            </div>
                         </div>
                    </div>
                )}
               
            </Spring>
        );
    }
}

export default Testing;