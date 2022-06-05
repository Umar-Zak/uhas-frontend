import React from 'react'

import { Line } from '@ant-design/charts';
import "@ant-design/flowchart/dist/index.css";

const AnalyticsPage = ({age = 0, fat = 0, height = 0, weight = 0}) => {

    const data = [
        { year: 'Average Age', value: age},
        { year: 'Average Fat', value: fat },
        { year: 'Average Weight', value: weight },
        { year: 'Average Height', value: height },
         
      ];
    
      const config = {
        data,
        xField: 'year',
        yField: 'value',
        point: {
          size: 5,
          shape: 'diamond',
        },
      };
    return (  
        <Line {...config} />
    );
}
 
export default AnalyticsPage;