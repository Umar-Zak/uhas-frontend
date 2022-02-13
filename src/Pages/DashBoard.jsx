import React, { useEffect, useState } from 'react';
import * as Yup from "yup"
import {Formik} from "formik"
import {MdCancel} from "react-icons/md"
import {AiFillPlusCircle} from "react-icons/ai"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { ExcelExport } from "@progress/kendo-react-excel-export";


import Footer from '../components/Footer';
import Loader from '../components/Loader';
import {deleteUser, getAllUsers, getCurrentUser, register} from "../utils/auth"
import { getQuestionnaire, transformQuestionnaire ,uploadFile} from '../utils/questionaire';
import { useNavigate } from 'react-router-dom';
const validationSchema = Yup.object().shape({
    email:Yup.string().email("Must be a valid email").required("Email address is reqquired"),
    username:Yup.string().required("Username is required"),
    password:Yup.string().required("Password is required")
})

const Dashboard = () => {
    const MySwal = withReactContent(Swal)
    const _export = React.useRef(null);

   const handleDelete = id =>{
    MySwal.fire({
        title: 'Do you want to delete this user?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Quit`,
      }).then(async (result) => {
        if (result.isConfirmed) {
            await deleteUser(id)
            getAllUsers(setUsers)
        } else if (result.isDenied) {
          Swal.fire('Alright got it', '', 'info')
        }
      })
   }


    const [isLoading,setIsLoading] = useState(false)
    const [showForm,setShowForm] = useState(false)
    const [showFileForm,setShowFileForm] = useState(false)
    let [questionnaire,setQuestionaire] = useState([])
    let [users,setUsers] = useState([])
    const [active,setActive] = useState("data")
    const [search,setSearch] = useState("")
    const [searchUser,setSearchUser] = useState("")
    const [file,setFile] = useState("")
    const navigate = useNavigate()

    const goOverView = id =>{
        navigate(`/overview/${id}`)
    }

    const handleSearch = text =>{
        setSearch(text)
    }

    const handleSearchUser = text =>{
        setSearchUser(text)
    }
         
    useEffect(()=>{
        getQuestionnaire(setQuestionaire)
        getAllUsers(setUsers)
    },[])
   
    

   const excelExport = () => {
    if (_export.current !== null) {
      _export.current.save();
    }
  };
   let transformedData = [];
    if (questionnaire.length > 0)  transformedData = transformQuestionnaire(questionnaire)
    


    questionnaire = questionnaire.filter(ques=>ques.womanId.toLowerCase().startsWith(search.toLowerCase()))
    users = users.filter(user=>user.username.toLowerCase().startsWith(searchUser.toLowerCase()))
   
   
   return ( <>

<div hidden>
<ExcelExport  data={transformedData} ref={_export}>
      <Grid
        data={transformedData}
        style={{
          height: "420px",
        }}
      >
        <GridToolbar>
         
        </GridToolbar>
        <GridColumn field="womanId" title="Woman ID" width="50px" />
        <GridColumn field="localityId" title="Locality ID" width="350px" />
        <GridColumn field="officer" title="Officer" />
        <GridColumn field="collect_on" title="Date Taken" />
        <GridColumn field="height" title="Woman's Height" />
        <GridColumn field="weight" title="Woman's Weight" />
        <GridColumn field="biceps" title="Woman's Biceps" />
        <GridColumn field="triceps" title="Woman's Triceps" />
        <GridColumn field="hip" title="Woman's Hip" />
        <GridColumn field="pressure" title="Woman's Pressure" />
        <GridColumn field="fat" title="Woman's Fat" />
        <GridColumn field="age" title="Woman's Age" />
        <GridColumn field="101" title="Question Reference 101" />
        <GridColumn field="102" title="Question Reference 102" />
        <GridColumn field="103" title="Question Reference 103" />
        <GridColumn field="104" title="Question Reference 104" />
        <GridColumn field="105" title="Question Reference 105" />
        <GridColumn field="106" title="Question Reference 106" />
        <GridColumn field="107" title="Question Reference 107" />
        <GridColumn field="108" title="Question Reference 108" />
        <GridColumn field="109" title="Question Reference 109" />
        <GridColumn field="110" title="Question Reference 110" />
        <GridColumn field="112" title="Question Reference 112" />
        <GridColumn field="113" title="Question Reference 113" />
        <GridColumn field="114" title="Question Reference 114" />
        <GridColumn field="115" title="Question Reference 115" />
        <GridColumn field="116" title="Question Reference 116" />
        <GridColumn field="201" title="Question Reference 201" />
        <GridColumn field="202" title="Question Reference 202" />
        <GridColumn field="203" title="Question Reference 203" />
        <GridColumn field="204" title="Question Reference 204" />
        <GridColumn field="205" title="Question Reference 205" />
        <GridColumn field="206" title="Question Reference 206" />
        <GridColumn field="207" title="Question Reference 207" />
        <GridColumn field="208" title="Question Reference 208" />
        <GridColumn field="601" title="Question Reference 601" />
        <GridColumn field="602" title="Question Reference 602" />
        <GridColumn field="603" title="Question Reference 603" />
        <GridColumn field="604" title="Question Reference 604" />
        <GridColumn field="605" title="Question Reference 605" />
        <GridColumn field="606" title="Question Reference 606" />
        <GridColumn field="607" title="Question Reference 607" />
        <GridColumn field="608" title="Question Reference 608" />
        <GridColumn field="609" title="Question Reference 609" />
        <GridColumn field="610" title="Question Reference 610" />
        <GridColumn field="611" title="Question Reference 611" />
        <GridColumn field="612" title="Question Reference 612" />
        <GridColumn field="613" title="Question Reference 613" />
        <GridColumn field="614" title="Question Reference 614" />
        <GridColumn field="615" title="Question Reference 615" />
        <GridColumn field="616" title="Question Reference 616" />
        <GridColumn field="617" title="Question Reference 617" />
        <GridColumn field="618" title="Question Reference 618" />
        <GridColumn field="620" title="Question Reference 620" />
        <GridColumn field="624" title="Question Reference 624" />
        <GridColumn field="625" title="Question Reference 625" />
        <GridColumn field="626" title="Question Reference 626" />
        <GridColumn field="627" title="Question Reference 627" />
        <GridColumn field="628" title="Question Reference 628" />
        <GridColumn field="629" title="Question Reference 629" />
        <GridColumn field="630" title="Question Reference 630" />
        <GridColumn field="631" title="Question Reference 631" />
        <GridColumn field="632" title="Question Reference 632" />
        <GridColumn field="633" title="Question Reference 633" />
      </Grid>
    </ExcelExport>


</div>
             { showForm &&  <div className="login-container register-container">
                 <div className="cancel-container">
                    <MdCancel onClick={()=>setShowForm(false)} style={{cursor:"pointer"}} size={25} color='white'/>
                 </div>
                     <Formik 
                     initialValues={{email:"",password:"",username:""}} 
                     validationSchema={validationSchema}
                     onSubmit={(values,form)=>register(values,form,setIsLoading)}
                     >
                         {({handleChange,handleSubmit,errors,touched})=>(
                            <>
                              <input onChange={handleChange} name="email" type="email" placeholder="example@gmail.com" className="login-field" />
                              {errors.email && touched.email && <p className="error">{errors.email}</p>}
                              <input onChange={handleChange} name="username" type="text" placeholder="User12" className="login-field" />
                              {errors.username && touched.username && <p className="error">{errors.username}</p>}
                              <input onChange={handleChange}  type="password" name="password" placeholder="************" className="login-field" />
                              {errors.password && touched.password && <p className="error">{errors.password}</p>}
                          { !isLoading &&  <button onClick={handleSubmit} className="button button__primary button__full">Register</button>}
                          { isLoading &&  <Loader/>}
                            </>
                            
                         )}
                     </Formik>
                </div>}
                {showFileForm &&  <div className="login-container register-container">
                 <div className="cancel-container">
                    <MdCancel onClick={()=>setShowFileForm(false)} style={{cursor:"pointer"}} size={25} color='white'/>
                 </div>
                 <input accept='.xlsx' onChange={({target})=>setFile(target.files[0])}  name="file" type="file" placeholder=" " className="login-field" />
                 { !isLoading &&  <button disabled={!file}  onClick={()=>uploadFile(file,setIsLoading,setShowFileForm)}  className="button button__primary button__full">Upload</button>}
                 { isLoading &&  <Loader/>}
                </div>}
    <div className="dashboard">
        <div className="add-user-button">
        <button
        onClick={()=>setShowFileForm(true)}
        style={{marginRight:"15px"}}
            className="button button__light"
          >
        Import
        </button>
        <button
            title="Export Excel"
            className="button button__light"
            onClick={excelExport}
          >
            Export
          </button>
            <AiFillPlusCircle onClick={()=>navigate("/questionaire")} style={{marginInline:"15px",cursor:"pointer"}} size={40} />
            <div onClick={()=>setShowForm(!showForm)} className="button button__primary">Add user</div>
             
        </div>
        <div className="counter-grid">
        <div onClick={()=>setActive("data")} className={`${active === "data"? "counter counter--orange active-counter":"counter counter--orange"}`}>
                <h3 className="counter__title">Overall Data</h3>
                <p className="counter__text">{questionnaire.length}</p>
            </div>
            <div onClick={()=>setActive("users")} className={`${active === "users"? "counter  active-counter":"counter"}`}>
                <h3 className="counter__title">Total Users</h3>
                <p className="counter__text">{users.length}</p>
            </div>
           
            <div className={`${active === "overall"? "counter counter--blue active-counter":"counter counter--blue"}`}>
                <h3 className="counter__title">Monthly Updates</h3>
                <p className="counter__text">540</p>
            </div>
        </div>
     {
         active === "data" &&
         <div className="data">
         <div className="data-search">
              <h2 className="data-overview">Data Overview</h2>
              <input onChange={({target})=>handleSearch(target.value)} placeholder="Search data" type="text" className="search-input" />
          </div>
          <table className="table table-responsive table-hover">
              <thead>
                  <tr className='t__head'>
                      <th scope="col">Woman ID</th>
                      <th scope="col">Date</th>
                      <th scope="col">Officer</th>
                  </tr>
              </thead>
              <tbody>
                 {questionnaire.map(({womanId,officer,collected_on,_id})=>(
                      <tr onClick={()=>goOverView(_id)} className='t__row' style={{cursor:"pointer"}} key={collected_on}>
                      <td>{womanId}</td>
                      <td>{collected_on.toString().substr(0,10)}</td>
                      <td>{officer.name}</td>
                  </tr>
                 ))}
              </tbody>
          </table>
         </div>
     }

{
         active === "users" &&
         <div className="data">
         <div className="data-search">
              <h2 className="data-overview">Active Users</h2>
              <input onChange={({target})=>handleSearchUser(target.value)} placeholder="Search data" type="text" className="search-input" />
          </div>
          <table className="table table-hover">
              <thead>
                  <tr className='t__head'>
                      <th  scope="col">Username</th>
                      <th scope="col">Email</th>
                      <th scope="col">Joined On</th>
                      {getCurrentUser().isAdmin && <th scope="col">Manage</th>}
                  </tr>
              </thead>
              <tbody>
                 {users.map(({username,email,created_at,_id})=>(
                      <tr className='t__row' key={created_at}>
                      <td>{username}</td>
                      <td>{email}</td>
                      <td>{created_at.toString().substr(0,15)}</td>
                     {getCurrentUser().isAdmin &&  <button onClick={()=>handleDelete(_id)}  style={{background:"red",width:"100px",color:"white",padding:"4px",marginBlock:"10px"}} className="button">Delete</button>}
                  </tr>
                 ))}
              </tbody>
          </table>
         </div>
     }
    </div> 
    <Footer/>
    </>);
}
 
export default Dashboard;