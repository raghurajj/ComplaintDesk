import React from 'react';
import Styles from './Components.module.css';

const PastComplaint = ()=>{
    return(
        <div>
            <button className={`${Styles.btn} ${Styles.fill_button}`}>PastComplaint </button>
            <button className={`${Styles.btn} ${Styles.empty_button}`}>PastComplaint </button>
        </div>
    );
}

export default PastComplaint;