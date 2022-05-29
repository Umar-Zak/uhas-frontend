import React, { useEffect, useState } from 'react';
import * as Yup from "yup"
import {Formik} from "formik"
import {MdCancel} from "react-icons/md"
import {AiFillPlusCircle,AiFillFileZip} from "react-icons/ai"
import {FaChevronCircleLeft} from "react-icons/fa"
import {GrOverview} from "react-icons/gr"
import {AiFillProject} from "react-icons/ai"
import {BiData} from "react-icons/bi"
import {FaNewspaper} from "react-icons/fa"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { useNavigate } from 'react-router-dom';

import Footer from '../components/Footer';
import Loader from '../components/Loader';
import {deleteUser, getAllUsers, getCurrentUser, makeGuest, priv, register} from "../utils/auth"
import { getQuestionnaire,getSecondQuestionnaire, transformQuestionnaire ,uploadFile,getRequests,postDataSet,postProject, getDataSets, deleteDataSet, getPapers, deletePaper, getProject, deleteProject, getZips, togglePaperStatus, deleteQuestionnaire, toggleDataStatus} from '../utils/questionaire';
import { uploadPaper,uploadZip } from '../utils/firebase';



const validationSchema = Yup.object().shape({
    email:Yup.string().email("Must be a valid email").required("Email address is reqquired"),
    username:Yup.string().required("Username is required"),
    password:Yup.string().required("Password is required")
})

const validateDataset = Yup.object().shape({
    title:Yup.string().required("Title is required").label("Title"),
    description:Yup.string().required("Description is required").label("Description")
})


const validatePaper = Yup.object().shape({
    heading:Yup.string().required("Paper heading is required").label("Heading"),
    file:Yup.string().required("Paper file is required").label("Paper file"),
    type:Yup.string().required("Paper type is required").label("Paper type"),
    author:Yup.string().required("Author of the paper is required").label("Author")
})

const validateZip = Yup.object().shape({
    file:Yup.string().required("Zip file is required").label("Zip file"),
    name:Yup.string().required("Name of zip file is required").label("Name"),
    description:Yup.string().required("Description of zip file is required")
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

   const handleDeleteDataSet = id =>{
    MySwal.fire({
        title: 'Do you want to delete this dataset?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Quit`,
      }).then(async (result) => {
        if (result.isConfirmed) {
            await deleteDataSet(id)
            getDataSets(setDataSets)
        } else if (result.isDenied) {
          Swal.fire('Alright got it', '', 'info')
        }
      })
   }


   const handleDeleteQuestinnaire = async(event, id) => {
    event.stopPropagation()
    MySwal.fire({
      title: 'Do you want to delete this Questinnaire? Action is not reversible',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Quit`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteQuestionnaire(id)
        getQuestionnaire(setQuestionaire)
      } else if (result.isDenied) {
        Swal.fire('Alright got it', '', 'info')
      }
    })

    
   }

   const handleDeletePaper = id =>{
    MySwal.fire({
        title: 'Do you want to delete this paper?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Quit`,
      }).then(async (result) => {
        if (result.isConfirmed) {
            await deletePaper(id)
            getPapers(setPapers)
        } else if (result.isDenied) {
          Swal.fire('Alright got it', '', 'info')
        }
      })
   }

   const handleTogglePaperStatus = async id => {
     await togglePaperStatus(id)
     getPapers(setPapers)
   }

   const handleToggleDataStatus = async id => {
    await toggleDataStatus(id)
    getZips(setZips)
  }


   const handleDeleteProject = id =>{
    MySwal.fire({
        title: 'Do you want to delete this project?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Quit`,
      }).then(async (result) => {
        if (result.isConfirmed) {
            await deleteProject(id)
            getProject(setProjects)
        } else if (result.isDenied) {
          Swal.fire('Alright got it', '', 'info')
        }
      })
   }

   const handleViewPaper = url =>{
     window.open(url, "_blank")
   }


    const [isLoading,setIsLoading] = useState(false)
    const [showForm,setShowForm] = useState(false)
    const [showFileForm,setShowFileForm] = useState(false)
    const [showDatasetForm,setShowDatasetForm] = useState(false)
    const [showProjectForm,setShowProjectForm] = useState(false)
    const [showPaperForm,setShowPaperForm] = useState(false)
    const [showZipForm,setShowZipForm] = useState(false)
    const [requests,setRequests] = useState([])
    let [questionnaire,setQuestionaire] = useState([])
    let [secondQuestionnaire,setSecondQuestionaire] = useState([])
    let [users,setUsers] = useState([])
    const [active,setActive] = useState("data")
    const [search,setSearch] = useState("")
    const [searchUser,setSearchUser] = useState("")
    const [file,setFile] = useState("")
    const [activeLink,setActiveLink] = useState("overview")
    const [datasets,setDataSets] = useState([])
    const [papers,setPapers] = useState([])
    const [projects,setProjects] = useState([])
    const [zips,setZips] = useState([])
    const [searchTip,setSearchTip] = useState("id")
    const [searchDataSet, setSearchDataSet] = useState("")
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
        getRequests(setRequests)
        getDataSets(setDataSets)
        getPapers(setPapers)
        getProject(setProjects)
        getZips(setZips)
        getSecondQuestionnaire(setSecondQuestionaire)
    },[])
   

   const excelExport = () => {
    if (_export.current !== null) {
      _export.current.save();
    }
  };
   let transformedData = [];
    if (questionnaire.length > 0)  transformedData = transformQuestionnaire(questionnaire)
    

    switch (searchTip){
      
      case "year":{
        questionnaire = questionnaire.
        filter(ques=> new Date(ques.collected_on).getFullYear()?.toString().startsWith(search))
        break
      }

      case "month":{
        questionnaire = questionnaire.
        filter(ques=> (new Date(ques.collected_on)
        .getUTCMonth()+1).toString().startsWith(search) && 
        new Date(ques.collected_on).getFullYear()=== new Date().getFullYear())
        break
      }
      case "date":{
        questionnaire = questionnaire.
        filter(ques=> ques.collected_on.toString().startsWith(search))
       break
      }
      default:{
       if(search){
        questionnaire = questionnaire.
        filter(ques => search && ques.womanId.toLowerCase() === search.toLowerCase())
       }
       else {
        questionnaire = questionnaire.
        filter(ques => ques.womanId.toLowerCase().startsWith(search.toLowerCase()))
       }
      }
    }


    
    users = users.filter(user=>user.username.toLowerCase().startsWith(searchUser.toLowerCase()))
   
    const filteredZips = zips.filter(zip => zip.name.toLowerCase().startsWith(searchDataSet.toLowerCase()))

   return ( <>
   <div className="dashboard--header">
   <div style={{overflowX:"scroll"}} className="add-user-button">
   <FaChevronCircleLeft onClick={()=>navigate("/")} style={{marginInline:"15px",cursor:"pointer"}} size={40} />
        { getCurrentUser().isAdmin && <button
        onClick={()=>setShowFileForm(true)}
        style={{marginRight:"15px"}}
            className="button button__light"
          >
        Import
        </button>}
        {getCurrentUser().isAdmin &&  <button
            title="Export Excel"
            className="button button__light"
            onClick={excelExport}
            style={{marginInline:"15px",cursor:"pointer"}}
          >
            Export
          </button>}
   
          {getCurrentUser().isAdmin &&   <button onClick={()=>setShowForm(!showForm)} className="button button__primary">Add user</button>}
          {getCurrentUser().isAdmin || !getCurrentUser().isGuest &&  <AiFillPlusCircle onClick={()=>navigate("/questionaire")} style={{marginInline:"15px",cursor:"pointer"}} size={40} />}
       <button
            title="Export Excel"
            className="button button__primary"
            style={{marginRight:"15px"}}
            onClick={()=>setShowZipForm(true)}
          >
           Upload datasets
          </button>
        {getCurrentUser().isAdmin && <button
            title="Export Excel"
            className="button button__light"
            style={{marginRight:"15px"}}
            onClick={()=>setShowProjectForm(true)}
          >
            Add project
          </button>}
        {/* { getCurrentUser().isAdmin && <button
            title="Export Excel"
            className="button button__light"
            style={{marginRight:"15px"}}
            onClick={()=>setShowDatasetForm(true)}
          >
            Add dataset
          </button>} */}
            <button onClick={()=>setShowPaperForm(true)} className="button button__light">Publication</button>
             
        </div>
   </div>

<div className="dashboard--grid">
    {getCurrentUser().isAdmin &&  <div className="sidebar">
        <div onClick={()=>setActiveLink("overview")} className="link--item">
        <GrOverview size={30} color="green" />
        <a href="#" className={`${activeLink === "overview" ? "link active--link": "link"}`}>OverView</a>
        </div>
        {/* <div onClick={()=>setActiveLink("datasets")} className="link--item">
        <BiData size={30}  />
        <a href="#" className={`${activeLink === "datasets" ? "link active--link": "link"}`}>Data Sets</a>
        </div> */}
        <div onClick={()=>setActiveLink("papers")} className="link--item">
        <FaNewspaper size={30}  />
        <a href="#" className={`${activeLink === "papers" ? "link active--link": "link"}`}>Publications</a>
        </div>
        <div onClick={()=>setActiveLink("projects")} className="link--item">
        <AiFillProject size={30}  />
        <a href="#" className={`${activeLink === "projects" ? "link active--link": "link"}`}>Ongoing Projects</a>
        </div>
        <div onClick={()=>setActiveLink("zip")} className="link--item">
        <AiFillFileZip size={30}  />
        <a href="#" className={`${activeLink === "zip" ? "link active--link": "link"}`}>Data Sets</a>
        </div>
        <div onClick={()=>navigate("/second-questionaire")} className="link--item">
        <AiFillFileZip size={30}  />
        <a href="#" className={`${activeLink === "zip" ? "link active--link": "link"}`}>Take Questionnaire 2</a>
        </div>
        <div onClick={()=>setActiveLink("q2")} className="link--item">
        <AiFillFileZip size={30}  />
        <a href="#" className={`${activeLink === "q2" ? "link active--link": "link"}`}>Questionnaire 2</a>
        </div>
    </div>
}
   {getCurrentUser().isAdmin && activeLink === "overview" && <div className="dashboard">
       
      
        <div className="counter-grid">
        <div onClick={()=>setActive("data")} className={`${active === "data"? "counter counter--orange active-counter":"counter counter--orange"}`}>
                <h3 className="counter__title">Overall Data</h3>
                <p className="counter__text">{questionnaire.length}</p>
            </div>
            <div onClick={()=>setActive("users")} className={`${active === "users"? "counter  active-counter":"counter"}`}>
                <h3 className="counter__title">Total Users</h3>
                <p className="counter__text">{users.length}</p>
            </div>
           
            <div onClick={()=>setActive("requests")} className={`${active === "requests"? "counter counter--blue active-counter":"counter counter--blue"}`}>
                <h3 className="counter__title">Data Requests</h3>
                <p className="counter__text"> {requests.length}</p>
            </div>
        </div>
     {
         active === "data" &&
         <div className="data">
         <div className="data-search">
              <h2 className="data-overview">Data Overview</h2>
             <div className="search-by">
               <button onClick={()=>setSearchTip("id")} className={`${searchTip === "id"? "search-tip active-tip":"search-tip"}`}>ID</button>
               <button onClick={()=>setSearchTip("year")} className={`${searchTip === "year"? "search-tip active-tip":"search-tip"}`}>Year</button>
               <button onClick={()=>setSearchTip("month")} className={`${searchTip === "month"? "search-tip active-tip":"search-tip"}`}>Month</button>
               <button onClick={()=>setSearchTip("date")} className={`${searchTip === "date"? "search-tip active-tip":"search-tip"}`}>Date</button>
             <input onChange={({target})=>handleSearch(target.value)} placeholder="Search by ID or date" type="text" className="search-input" />
             </div>
          </div>
          <table className="table table-responsive table-hover">
              <thead>
                  <tr className='t__head'>
                      <th scope="col">Woman ID</th>
                      <th scope="col">Date</th>
                      <th scope="col">Officer</th>
                      <th scope="col">Manage</th>
                  </tr>
              </thead>
              <tbody>
                 {questionnaire.map(({womanId,officer,collected_on,_id})=>(
                      <tr onClick={()=>goOverView(_id)} className='t__row' style={{cursor:"pointer"}} key={collected_on}>
                      <td>{womanId}</td>
                      <td>{collected_on.toString().substr(0,10)}</td>
                      <td>{officer.name}</td>
                      <td>  {getCurrentUser().isAdmin && <td>  <button onClick={(event)=>handleDeleteQuestinnaire(event, _id)}  style={{background:"red",width:"100px",color:"white",padding:"4px",marginBlock:"10px", fontSize:"15px"}} className="button">Delete</button></td>}</td>
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
                      <th scope="col">Privileges</th>
                      <th scope="col">Manage</th>
                  </tr>
              </thead>
              <tbody>
                 {users.map(({username,email,created_at,_id,isAdmin, isGuest})=>(
                      <tr className='t__row' key={created_at}>
                      <td>{username}</td>
                      <td>{email}</td>
                      <td>{created_at.toString().substr(0,15)}</td>
                      {getCurrentUser().isAdmin && <td>
                        <button onClick={()=> priv(_id,getAllUsers,setUsers)}  style={{background:"green",width:"100px",color:"white",padding:"4px",marginBlock:"10px"}} className="button">{isAdmin ? "Revoke":"Add"}</button>
                       {!isGuest && <button onClick={()=> makeGuest(_id,getAllUsers,setUsers)} style={{background:"gray",width:"100px",color:"white",padding:"4px",marginBlock:"10px", borderRadius:"7px", marginInline:"5px"}}   >Make guest</button>}
                      </td>
                      }
                     {getCurrentUser().isAdmin && <td>  <button onClick={()=>handleDelete(_id)}  style={{background:"red",width:"100px",color:"white",padding:"4px",marginBlock:"10px"}} className="button">Delete</button></td>}
                  </tr>
                 ))}
              </tbody>
          </table>
         </div>
     }
     {
         active === "requests" &&
         <div className="data">
         <div className="data-search">
              <h2 className="data-overview">Data Requests</h2>
              <input onChange={({target})=>handleSearchUser(target.value)} placeholder="Search data" type="text" className="search-input" />
          </div>
          <table className="table table-hover">
              <thead>
                  <tr className='t__head'>
                      <th  scope="col">Name of Enquirer</th>
                      <th scope="col">Email Address</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Description</th>
                      <th scope="col">Reasons</th>
                  </tr>
              </thead>
              <tbody>
                 {requests.map(({ name,email,phone,_id,description,reason})=>(
                      <tr className='t__row' key={_id}>
                      <td>{name}</td>
                      <td>{email}</td>
                      <td>{phone}</td>
                      <td>{description}</td>
                      <td>{reason || "None"}</td>
                  </tr>
                 ))}
              </tbody>
          </table>
         </div>
     }
    </div>}
   {activeLink === "datasets" && <div className="dashboard">

   <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>DataSet Title</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Manage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datasets.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="right"><button onClick={()=>handleDeleteDataSet(row._id)} style={{background:"red",width:"100px",color:"white",padding:"4px"}} className="button">Delete</button> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>}
    {activeLink === "papers" && <div className="dashboard">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Paper Heading</TableCell>
            <TableCell align="left">Uploaded By</TableCell>
            <TableCell align="left">Upload Date</TableCell>
            <TableCell align="left">Paper Category Type</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Manage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {papers.map((row) => (
            <TableRow 
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell onClick={()=> handleViewPaper(row.file)} style={{cursor:"pointer"}} align="left">{row.heading}</TableCell>
              <TableCell align="left">{row.user}</TableCell>
              <TableCell align="left">{row.date.toString().substr(0,10)}</TableCell>
              <TableCell align="left">{row.type}</TableCell>
              <TableCell align="left">{row.isApproved? "Approved" : "Unapproved"}</TableCell>
              <TableCell align="left"><button onClick={()=>handleDeletePaper(row._id)} style={{background:"red",width:"100px",color:"white",padding:"4px", fontSize:"15px"}} className="button">Delete</button> </TableCell>
              <TableCell align="left"><button onClick={() => handleTogglePaperStatus(row._id)}   style={{background:"grey",width:"100px",color:"white",padding:"4px",fontSize:"15px"}} className="button">{row.isApproved ? "Unapprove" : "Approve"}</button> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>}
   { activeLink === "projects" &&
   <div className="dashboard">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Project Title</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Manage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="left"><button onClick={()=>handleDeleteProject(row._id)} style={{background:"red",width:"100px",color:"white",padding:"4px"}} className="button">Delete</button> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    }
    {
      activeLink === "zip" &&
      <div className="dashboard">
        <div style={{width: "35%", marginBottom: "40px"}}>
        <input onChange={({target:{value}}) => setSearchDataSet(value)} placeholder='Search through datasets' type="text" className="login-field" />
        </div>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>File Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="left">Upload Date</TableCell>
            <TableCell align="left">Download</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredZips.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="left">{row.day_posted.toString().substr(0,10)}</TableCell>
              <TableCell align="left"><a href={`${row.file}`}  style={{background:"green",width:"100px",color:"white",padding:"4px",display:"inline-block"}} className="button">Download</a> </TableCell>
              <TableCell align="left"><button onClick={() => handleToggleDataStatus (row._id)}  style={{background:"gray",width:"100px",color:"white",padding:"4px",display:"inline-block"}} className="button">{row.isApproved ? "Unapprove" : "Approve"}</button> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    }
    {
      activeLink === "q2" &&
      <div className="dashboard">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow   >
          {/* <TableCell>Collected On</TableCell> */}
            <TableCell style={{fontSize:"12px"}}>Name of Researcher</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">District</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">Sub-District</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">Town</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">Description</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">Institution</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">Institution Type</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">Institution Level</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">Latitude</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">Longitude</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {secondQuestionnaire.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell align="left">{row.collected_on?.toString().substr(0,10)}</TableCell> */}
              {row.data?.map(d=>(
                <TableCell align="left">{ d.answer}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    }
</div>

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
        <GridColumn field="waist" title="Woman's Waist" />
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


                { showDatasetForm &&  <div className="login-container register-container">
                 <div className="cancel-container">
                    <MdCancel onClick={()=>setShowDatasetForm(false)} style={{cursor:"pointer"}} size={25} color='white'/>
                 </div>
                     <Formik 
                     initialValues={{title:"",description:"" }} 
                     validationSchema={validateDataset}
                     onSubmit={(values)=>postDataSet(values,setIsLoading)}
                     >
                         {({handleChange,handleSubmit,errors,touched})=>(
                            <>
                              <input onChange={handleChange} name="title" type="text" placeholder="Title of dataset" className="login-field" />
                              {errors.title && touched.title && <p className="error">{errors.title}</p>}
                              <textarea onChange={handleChange} name="description" t  placeholder="Description of dataset" className="login-field"></textarea>
                              {errors.description && touched.description && <p className="error">{errors.description}</p>}
                              
                          { !isLoading &&  <button onClick={handleSubmit} className="button button__primary button__full">Add</button>}
                          { isLoading &&  <Loader/>}
                            </>
                            
                         )}
                     </Formik>
                </div>}


                { showProjectForm &&  <div className="login-container register-container">
                 <div className="cancel-container">
                    <MdCancel onClick={()=>setShowProjectForm(false)} style={{cursor:"pointer"}} size={25} color='white'/>
                 </div>
                     <Formik 
                     initialValues={{title:"",description:"" }} 
                     validationSchema={validateDataset}
                     onSubmit={(values)=>postProject(values,setIsLoading)}
                     >
                         {({handleChange,handleSubmit,errors,touched})=>(
                            <>
                              <input onChange={handleChange} name="title" type="text" placeholder="Title of project" className="login-field" />
                              {errors.title && touched.title && <p className="error">{errors.title}</p>}
                              <textarea onChange={handleChange} name="description" t  placeholder="Description of project" className="login-field"></textarea>
                              {errors.description && touched.description && <p className="error">{errors.description}</p>}
                              
                          { !isLoading &&  <button onClick={handleSubmit} className="button button__primary button__full">Add</button>}
                          { isLoading &&  <Loader/>}
                            </>
                            
                         )}
                     </Formik>
                </div>}

                { showPaperForm &&  <div className="login-container register-container">
                 <div className="cancel-container">
                    <MdCancel onClick={()=>setShowPaperForm(false)} style={{cursor:"pointer"}} size={25} color='white'/>
                 </div>
                     <Formik 
                     initialValues={{heading:"",file:"",type:"", author:"" }} 
                     validationSchema={validatePaper}
                     onSubmit={(values)=>uploadPaper(values,setIsLoading)}
                     >
                         {({handleChange,handleSubmit,errors,touched,setFieldValue})=>(
                            <>
                              <input onChange={handleChange} name="heading" type="text" placeholder="Heading of paper work" className="login-field" />
                              {errors.heading && touched.heading && <p className="error">{errors.heading}</p>}
                              <input accept='.pdf' onChange={({target})=>setFieldValue("file",target.files[0])}  name="file" type="file" placeholder=" " className="login-field" />
                              {errors.file && touched.file && <p className="error">{errors.file}</p>}
                              <select className="login-field" onChange={handleChange} name="type" id="">
                                  <option value="">Choose paper type</option>
                                  <option value="student">Student</option>
                                  <option value="faculty">Faculty</option>
                              </select>
                              {errors.type && touched.type && <p className="error">{errors.type}</p>}
                              <input onChange={handleChange} name="author" type="text" placeholder="Author of Paper" className="login-field" />
                              {errors.author && touched.author && <p className="error">{errors.author}</p>}
                          { !isLoading &&  <button onClick={handleSubmit} className="button button__primary button__full">Post</button>}
                          { isLoading &&  <Loader/>}
                            </>
                            
                         )}
                     </Formik>
                </div>}


                { showZipForm &&  <div className="login-container register-container">
                 <div className="cancel-container">
                    <MdCancel onClick={()=>setShowZipForm(false)} style={{cursor:"pointer"}} size={25} color='white'/>
                 </div>
                     <Formik 
                     initialValues={{file:"", name:"", description:"" }} 
                     validationSchema={validateZip}
                     onSubmit={(values)=>uploadZip(values,setIsLoading)}
                     >
                         {({handleSubmit,errors,touched,setFieldValue, handleChange})=>(
                            <>
                             <input onChange={handleChange} name="name" type="text" placeholder="Name of dataset" className="login-field" />
                              {errors.name && touched.name && <p className="error">{errors.name}</p>}
                              <textarea onChange={handleChange} name="description"   placeholder="Description of dataset" className="login-field"></textarea>
                              {errors.description && touched.description && <p className="error">{errors.description}</p>}
                              <input accept='.zip' onChange={({target})=>setFieldValue("file",target.files[0])}  name="file" type="file" placeholder=" " className="login-field" />
                              {errors.file && touched.file && <p className="error">{errors.file}</p>}
                          { !isLoading &&  <button onClick={handleSubmit} className="button button__primary button__full">Upload</button>}
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
     
    <Footer/>
    </>);
}
 
export default Dashboard;