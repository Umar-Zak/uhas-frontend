import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import Footer from '../components/Footer'
import { getQuestionById } from '../utils/questionaire'
const SECTIONS = { 
    a:"Section A:",
    b:"Section B:",
    c:"Section C:",
    d:"Section D:"
}
const OverView = () => {
    const {id} = useParams()
    const [_id,setId] = useState(id)
    const [data,setData] = useState("")
    let section_a = [];
    let section_b =[];
    let section_c=[];
    let section_d =[];
   if(data){
     section_a = data.data.filter(d=>d.section.startsWith(SECTIONS.a))
     section_b = data.data.filter(d=>d.section.startsWith(SECTIONS.b))
     section_c = data.data.filter(d=>d.section.startsWith(SECTIONS.c))
     section_d = data.data.filter(d=>d.section.startsWith(SECTIONS.d))
   }

    useEffect(()=>{
        getQuestionById(_id,setData)
    },[_id])

    return ( 
        <>
        <div className="dashboard dashboard--large">
          <div className="basic section">
          <h3 className="basic-data">Anthropometric Assessment Information</h3>
        <table className="table table-responsive table-hover">
              <thead>
                  <tr >
                      <th scope="col">Woman's ID</th>
                      <th scope="col">Locality ID</th>
                      <th scope="col">Interviewer</th>
                      <th scope="col">Woman's age</th>
                      <th scope="col">Weight</th>
                      <th scope="col">Height</th>
                      <th scope="col">Hip Circum...(mm)</th>
                      <th scope="col">Waist Circum...(mm)</th>
                      <th scope="col">Body Fat (%)</th>
                      <th scope="col">Triceps Skin..(cm)</th>
                      <th scope="col">Byceps Skin..(cm)</th>
                      <th scope="col">Blood Pressure(mm)</th>
                  </tr>
              </thead>
              
              <tbody>
                <tr>
                    <td>{data.womanId}</td>
                    <td>{data.localityId}</td>
                    <td>{data.officer?.name}</td>
                    <td>{data.age}</td>
                    <td>{data.weight}</td>
                    <td>{data.height}</td>
                    <td>{data.hip}</td>
                    <td>{data.waist}</td>
                    <td>{data.fat}</td>
                    <td>{data.triceps}</td>
                    <td>{data.biceps}</td>
                    <td>{data.pressure}</td>
                </tr>
              </tbody>
              </table>
          </div>
          <div className="section-a section">
          <h3 className="basic-data">{section_a[0]?.section}</h3>
        <table className="table table-responsive table-hover">
              <thead>
                  <tr >
                      <th scope="col">Question No</th>
                      <th scope="col">Question</th>
                      <th scope="col">Answer</th>
                       
                  </tr>
              </thead>
              
              <tbody>
               {section_a.map(a=>(
                    <tr>
                    <td>{a.number}</td>
                    <td>{a.quest}</td>
                    <td>{a.answer}</td>
                     
                    
                </tr>
               ))}
              </tbody>
              </table>
          </div>
          <div className="section-b section">
          <h3 className="basic-data">{section_b[0]?.section}</h3>
        <table className="table table-responsive table-hover">
              <thead>
                  <tr >
                      <th scope="col">Question No</th>
                      <th scope="col">Question</th>
                      <th scope="col">Answer</th>
                       
                  </tr>
              </thead>
              
              <tbody>
               {section_b.map(a=>(
                    <tr>
                    <td>{a.number}</td>
                    <td>{a.quest}</td>
                    <td>{a.answer}</td>
                     
                    
                </tr>
               ))}
              </tbody>
              </table>
          </div>
          <div className="section-c section">
          <h3 className="basic-data">{section_c[0]?.section}</h3>
        <table className="table table-responsive table-hover">
              <thead>
                  <tr >
                      <th scope="col">Question No</th>
                      <th scope="col">Question</th>
                      <th scope="col">Answer</th>
                       
                  </tr>
              </thead>
              
              <tbody>
               {section_c.map(a=>(
                    <tr>
                    <td>{a.number}</td>
                    <td>{a.quest}</td>
                    <td>{a.answer}</td>
                     
                    
                </tr>
               ))}
              </tbody>
              </table>
          </div>
          <div className="section-d section">
          <h3 className="basic-data">{section_d[0]?.section}</h3>
        <table className="table table-responsive table-hover">
              <thead>
                  <tr >
                      <th scope="col">Question No</th>
                      <th scope="col">Question</th>
                      <th scope="col">Answer</th>
                       
                  </tr>
              </thead>
              
              <tbody>
               {section_d.map(a=>(
                    <tr>
                    <td>{a.number}</td>
                    <td>{a.quest}</td>
                    <td>{a.answer}</td>
                     
                    
                </tr>
               ))}
              </tbody>
              </table>
          </div>
        </div>
        <Footer/>
        </>
    );
}
 
export default OverView;