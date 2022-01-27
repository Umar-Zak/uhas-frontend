import React, { useState } from 'react'
import {Formik} from "formik"
import * as Yup from "yup"
import Medics from "../assets/medics.svg"
import Footer from '../components/Footer';
import { getQuestions } from '../utils/questions';
import Loader from '../components/Loader';
import {postQuestionnaire} from "../utils/questionaire"

const validationSchema = Yup.object().shape({
    womanId:Yup.string().required("Woman ID is required"),
    localityId:Yup.string().required("Locality ID is required"),
    interviewer:Yup.string().required("Interviewer is required"),
    age:Yup.number().min(1,"Age can not be less than 1")
    .required("Age is required"),
    weight:Yup.number().min(1,"Weight can not be less than 1")
    .required("Weight is re quired"),
    height:Yup.number().min(1,"Height can not be less than 1")
    .required("Height is required"),
    hip:Yup.number().min(1,"Hip circumference can not be less than 1")
    .required("Hip circumference is required"),
    waist:Yup.number().min(1,"Waist circumference can not be less than 1")
    .required("Waist circumference is required"),
    fat:Yup.number().min(1,"Body fat can not be less than 1")
    .required("Body fat is required"),
    triceps:Yup.number().min(1,"Triceps skinfold can not be less than 1")
    .required("Triceps skinfold is required"),
    biceps:Yup.number().min(1,"Biceps skinfold can not be less than 1")
    .required("Biceps skinfold is required"),
    pressure:Yup.number().min(1,"Blood pressure can not be less than 1")
    .required("Blood pressure is required"),
})

const DataCollectionPage = () => {

    const questions = getQuestions()
    const [number,setNumber] = useState(0)
    let [answers,setAnswers] = useState([])
    const [answer,setAnswer] = useState("")
    const [answered,setAnswered] = useState(false)
    const [currentQuestion,setCurrentQuestion] = useState(questions[number])
    const [tgt,setTgt] = useState({})
    const [isFinished,setIsFinished] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const handleNextClick = ()=>{
        tgt.value = ""
        if(!answered || questions.length-1===number) return
        const currentQuest = {...currentQuestion}
        setNumber(number+1)
        currentQuest.answer = answer
       setAnswers([...answers,currentQuest])
        setCurrentQuestion(questions[number +1])
       setAnswered(false)
    }

    const handleOptionSelected = (option)=>{
        setAnswered(true)
        setAnswer(option)
       
    }

    const handleInputChange = ({target})=>{
         setTgt(target)
        setAnswered(true)
        setAnswer(target.value)
    }

    const handleFinish = ()=>{
        setIsFinished(true)
    }

    
    
    return ( <>
   <div className="data-hero">
       <div className="block data-grid">
           <img src={Medics} alt="Medical personnel" className="medics" />
           <div className="data-grid__content">
               <h1 className="data-grid__title">
               Welcome to Our Data Collection Center
               </h1>
               <p className="data-grid__text">
               Data is very essential. But with your health data, 
               we treat it as first class citizen. 
               We don’t comprimize on data privacy
               </p>
           </div>
       </div>
   </div>

  {!isFinished && <div className="question-container">
       <h3 className="question__category">{currentQuestion.section}</h3>
       <div className="simple-flex question-flex">
           <div className="question__number">
               <p>{currentQuestion.number}</p>
           </div>
           <p className="question">
           {currentQuestion.quest}
           </p>
       </div>
       {
           currentQuestion.options.map((option,index) =>(
           <>
            {option.type==="radio" &&(<div key={index} onClick={()=>handleOptionSelected(option.ans)} className="simple-flex answer-flex">
            <div className={`${answer === option.ans ? 'answer__label active-answer':'answer__label '}`}>
                <p>{option.label}</p>
            </div>
            <p className="answer">{option.ans}</p>
        </div>)}
        {option.type!=="radio" && <input key={index} onChange={handleInputChange} className="question-text" type={option.type} placeholder={option.ans} /> }
           </>
           )
          
           )
       }
     
   </div>}

  <div className="next-container">
 {number < questions.length-1 && <button onClick={handleNextClick} className="button button__primary button__normal">Next</button>}
 {number === questions.length-1 && !isFinished && <button onClick={handleFinish}  className="button button__primary button__normal">Finish</button>}
  </div>
 {isFinished && 
 <div className="patient-form">
    <h3 className="patient-form__title">Section E: Anthropometric Assessment Form</h3>
   <Formik
   initialValues={
       {
           womanId:"",
           localityId:"",
           interviewer:"",
           age:"",
           weight:"",
           height:"",
           hip:"",
           waist:"",
           fat:"",
           triceps:"",
           biceps:"",
           pressure:""
       }
   }
   validationSchema={validationSchema}
   onSubmit={values=> postQuestionnaire({data:answers,patient:values.womanId},setIsLoading)}
   >
       {({handleChange,handleSubmit,errors,touched})=>(
          <>
           <div className="form-grid">
          <div>
          <input onChange={handleChange} name="womanId" type="text" placeholder="Womans's ID" className="login-field" />
           {errors["womanId"] && touched["womanId"]&& <p className="error">{errors["womanId"]}</p>}
          </div>
           <div>
           <input onChange={handleChange} name="localityId" type="text" placeholder="Locality ID" className="login-field" />
           {errors["localityId"] && touched["localityId"]&& <p className="error">{errors["localityId"]}</p>}
           </div>
         <div>
         <input onChange={handleChange} name="interviewer" type="text" placeholder="Interviewer" className="login-field" />
         {errors["interviewer"] && touched["interviewer"]&& <p className="error">{errors["interviewer"]}</p>}
         </div>
           <div>
           <input onChange={handleChange} name="age" type="number" placeholder="Woman's Age" className="login-field" />
           {errors["age"] && touched["age"]&& <p className="error">{errors["age"]}</p>}
           </div>
           <div>
           <input onChange={handleChange} name="weight" type="number" placeholder="Weight(Kg)" className="login-field" />
           {errors["weight"] && touched["weight"]&& <p className="error">{errors["weight"]}</p>}
           </div>
         <div>
         <input onChange={handleChange} name="height" type="number" placeholder="Height(cm)" className="login-field" />
         {errors["height"] && touched["height"]&& <p className="error">{errors["height"]}</p>}
         </div>
          <div>
          <input onChange={handleChange} name="hip" type="number" placeholder="Hip circumference(mm)" className="login-field" />
          {errors["hip"] && touched["hip"]&& <p className="error">{errors["hip"]}</p>}
          </div>
          <div>
          <input onChange={handleChange} name="waist" type="number" placeholder="Waist circumference(cm)" className="login-field" />
          {errors["waist"] && touched["waist"]&& <p className="error">{errors["waist"]}</p>}
          </div>
           <div>
           <input onChange={handleChange} name="fat" type="number" placeholder="Body fat(%)" className="login-field" />
           {errors["fat"] && touched["fat"]&& <p className="error">{errors["fat"]}</p>}
           </div>
           <div>
           <input onChange={handleChange} name="triceps" type="number" placeholder="Triceps skinfold(cm)" className="login-field" />
           {errors["triceps"] && touched["triceps"]&& <p className="error">{errors["triceps"]}</p>}
           </div>
          <div>
          <input onChange={handleChange} name="biceps" type="number" placeholder="Biceps skinfold(cm)" className="login-field" />
          {errors["biceps"] && touched["biceps"]&& <p className="error">{errors["biceps"]}</p>}
          </div>
          <div>
          <input onChange={handleChange} name="pressure" type="number" placeholder="Blood Pressure(mm Mercury)" className="login-field" />
          {errors["pressure"] && touched["pressure"]&& <p className="error">{errors["pressure"]}</p>}
          </div>
           </div>
           {!isLoading && <button onClick={handleSubmit}  className="button button__primary button__full submit">Submit</button>}
          { isLoading && <Loader/>}
           </>
       )}
   </Formik>

  </div>
  }
   <Footer/>
    </> );
}
 
export default DataCollectionPage;