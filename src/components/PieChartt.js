import React, {Component} from 'react';
import Chartjs from 'chart.js'
import { PieChart } from 'react-minimal-pie-chart';


class PieChartt extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="row">
                <div className="col col-6">
                    <PieChart
                        data={[
                            { title: 'water', value: 4, color: 'lightblue',reveal:2 },
                            { title: 'road', value: 5, color: 'red',reveal:2  },
                            { title: 'electricity', value: 3, color: 'orange',reveal:2  },
                            { title: 'others', value: 2, color: 'green' ,reveal:2 },
                        ]}
                    />

                </div>
            </div>
        );
    }
}
export default PieChartt;