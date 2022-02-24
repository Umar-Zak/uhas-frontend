import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import {Formik} from "formik"
import * as Yup from "yup"
import {MdAccountCircle} from "react-icons/md"
import {MdCancel} from "react-icons/md"
 import {login,logout,getCurrentUser} from "../utils/auth"
 import { getDataSets, getPapers, requestData } from '../utils/questionaire'
import briefCase from "../assets/brief-case.svg"
import Idea from "../assets/Idea.svg"
import Lines from "../assets/lines.svg"
import Footer from '../components/Footer'
import Loader from '../components/Loader'

const validationSchema = Yup.object().shape({
    email:Yup.string().email("Must be a valid email").required("Email address is reqquired"),
    password:Yup.string().required("Password is required")
})

const validateRequest = Yup.object().shape({
    email:Yup.string().email("Must be a valid email").required("Email address is reqquired"),
    name:Yup.string().required("Name is required"),
    phone:Yup.string().required("Phone number"),
    description:Yup.string().required("Request description")
})

const HomePage = () => {
    const [showForm,setShowForm] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const [showRequestForm,setShowRequestForm] =useState( false)
    const [announcements, SetAnnouncements] = useState([])
    const [selectedDataSet,setSelectedDataSet] = useState("")
    const [works,setWorks] = useState([])

    useEffect(()=>{
        getDataSets(SetAnnouncements)
        getPapers(setWorks)
    },[])

   
    const navigate = useNavigate()

    const goData = ()=>{
      navigate("/dashboard")
    }

    

    const toggleForm = ()=>{
        setShowForm(!showForm)
    }
  
    return ( <>
               { showForm &&  <div className="login-container">
                     <Formik 
                     initialValues={{email:"",password:""}} 
                     validationSchema={validationSchema}
                     onSubmit={values=> login(values,setIsLoading)}
                     >
                         {({handleChange,handleSubmit,errors,touched})=>(
                            <>
                              <input onChange={handleChange} name="email" type="email" placeholder="example@gmail.com" className="login-field" />
                              {errors.email && touched.email && <p className="error">{errors.email}</p>}
                              <input onChange={handleChange}  type="password" name="password" placeholder="************" className="login-field" />
                              {errors.password && touched.password && <p className="error">{errors.password}</p>}
                          { !isLoading &&  <button onClick={handleSubmit} className="button button__primary button__full">Login</button>}
                          { isLoading &&  <Loader/>}
                            </>
                            
                         )}
                     </Formik>
                </div>
                }
                { showRequestForm &&  <div className="login-container">
                <div className="cancel-container">
                    <MdCancel onClick={()=>setShowRequestForm(false)} style={{cursor:"pointer"}} size={25} color='black'/>
                 </div>
                     <Formik 
                     initialValues={{email:"",name:"",phone:"",description:""}} 
                     validationSchema={validateRequest}
                     onSubmit={values=> requestData(values,setIsLoading)}
                     >
                         {({handleChange,handleSubmit,errors,touched})=>(
                            <>
                             <input onChange={handleChange} name="name" type="email" placeholder="John Doe" className="login-field" />
                              {errors.name && touched.name && <p className="error">{errors.name}</p>}
                              <input onChange={handleChange} name="email" type="email" placeholder="example@gmail.com" className="login-field" />
                              {errors.email && touched.email && <p className="error">{errors.email}</p>}
                              <input onChange={handleChange}  type="tel" name="phone" placeholder="0201348856" className="login-field" />
                              {errors.phone && touched.phone && <p className="error">{errors.phone}</p>}
                              <input onChange={handleChange}  type="text" maxLength={30} name="description" placeholder="Describe the kind of data you need" className="login-field" />
                              {errors.description && touched.description && <p className="error">{errors.description}</p>}
                          { !isLoading &&  <button onClick={handleSubmit} className="button button__primary button__full">Request</button>}
                          { isLoading &&  <Loader/>}
                            </>
                            
                         )}
                     </Formik>
                </div>
                }
            <section className="hero">
            <div className="hero__overlay"></div>
            <nav className="nav-bar">
               {!getCurrentUser() && <button onClick={toggleForm} className="button button__primary">LOGIN</button>}
               {getCurrentUser() && <a className="logout" onClick={logout} href="#">Log Out</a>}
               {getCurrentUser() && <MdAccountCircle style={{cursor:"pointer"}} onClick={goData} color="white" size={25} />}
                {/* <button onClick={goData} style={{marginLeft:"20px"}} className="button button__light">Data</button> */}
            </nav>
           <div className="block">
           <div className="hero__content">
                <div className="hero__content-grid">
                    <h1 className="hero__title">
                    DEPARTMENT OF FAMILY AND COMMUNITY HEALTH
                    UNIVERSITY OF HEALTH AND ALLIED SCIENCES, HO, VOLTA REGION, GHANA
                    </h1>
                    <p className="hero__tagline">
                    Effect of soymilk-burkina intake on gut microbiome 
                    and nutritional status of Ghanaian women
                    </p>
                    <div className="button--container">
                    <button onClick={()=>setShowRequestForm(!showRequestForm)} className="button button__light button__default">
                    Request for data
                    </button>
                    </div>
                </div>
            </div>
           </div>
            </section>
            <div className="announcement-container">
                <div className="announcement">
                    <h2 className="announcement__title">Available Datasets</h2>
                 {
                     announcements.map( (a,index) =>(
                        <a onClick={()=>setSelectedDataSet(a._id)} className={`${selectedDataSet === a._id ? "announcement__item expanded":"announcement__item"}`}>
                        <div className="simple-flex">
                             <div className="circle">
                                 <p className="circled__text">{index+1}</p>
                             </div>
                             <p className="announcement__text">
                              {a.title}
                             </p>
                             
                         </div>
                         <p className="announcement__description">
                              {a.description}
                             </p>
                        </a>
                     ))
                 }
                </div>
            </div>
                 <div className="works-section">
                 <img src={Lines} alt="" className="lines" />
                     <div className="block paper-works">
                         <div>
                             <h3 className="paper-works__title">
                             Our Latest Paper works
                             </h3>
                             <p className="paper-works__tagline">
                             For the sake of public information, we get you informed on our research works
                             </p>
                             <img src={briefCase} alt="" className="paper-works__image" />
                         </div>
                         <div className="news-grid"> 
                            {
                                works.map((work)=>(
                                   <a href={`${work.file}`} target="_blank">
                                        <div className="news">
                                    <div className="simple-flex">
                                        <img src={Idea} alt="" className="idea" />
                                        <div className="news__header">
                                            <h5 className="news__title">
                                            {`${work.heading.substr(0,21)}${work.heading.length>= 21 ? "...":""}`}
                                            </h5>
                                            <div className="news__date">
                                                <p>{work.date.toString().substr(0,10)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="news__writer">
                                   Paper By : {work.user}
                                    </p>
                                </div>
                                
                                   </a>
                                ))
                            }
                         </div>
                     </div>
                    
                 </div>
             <Footer/>
            </>
             );
}
 
export default HomePage;