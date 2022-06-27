import React, {useState, useEffect} from 'react';
import { Line } from '@ant-design/charts';
import AnalyticsPage from '../Pages/AnalyticsPage';
import {getQuestionnaire, getRequests, getPapers, getZips, getProject} from "../utils/questionaire"
import { getAllUsers } from '../utils/auth';


function Analytics() {
    let [questionnaire,setQuestionaire] = useState([])
    let [users,setUsers] = useState([])
    const [papers,setPapers] = useState([])
    const [projects,setProjects] = useState([])
    const [zips,setZips] = useState([])
    const [requests,setRequests] = useState([])

    const data = [
        { year: 'Overall Data', value: questionnaire.length },
        { year: 'Total Users', value: users.length },
        { year: 'Data Requests', value: requests.length },
        { year: 'Publications', value: papers.length },
        { year: 'Datasets', value: zips.length },
        { year: 'Projects', value: projects.length},
      ];
    
      const config = {
        data,
        xField: 'year',
        yField: 'value',
        point: {
          size: 7,
          shape: 'diamond',
        },
      };


      useEffect(() => {
        getQuestionnaire(setQuestionaire)
        getAllUsers(setUsers)
        getRequests(setRequests)
        getProject(setProjects)
        getPapers(setPapers)
        getZips(setZips)
      }, [])

    const computeAverage = data => {
        let average = 0
        if(data.length === 0) return 0
  
        data.forEach(d => {
          average += d
        })
  
        return average
      }
  
      const ages = questionnaire.map(ques => ques.age)
      const weight = questionnaire.map(ques => ques.weight)
      const height = questionnaire.map(ques => ques.height)
      const fats = questionnaire.map(ques => ques.fat)


    return (
        <div className="dashboard">
        <Line {...config} />
       <div style={{marginTop:"100px"}}>
       <AnalyticsPage 
       age={ages.length? computeAverage(ages)/ages.length : 0} 
       fat={fats.length? computeAverage(fats)/fats.length : 0}
       height={height.length? computeAverage(height)/height.length : 0}
       weight={weight.length? computeAverage(weight)/weight.length : 0}
       />
       </div>
      </div>
    );
}

export default Analytics;