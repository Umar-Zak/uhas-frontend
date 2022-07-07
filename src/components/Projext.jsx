import React, {useState, useEffect} from 'react';
import {MdCancel} from "react-icons/md"
import {useNavigate} from "react-router-dom"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Formik} from "formik"
import * as Yup from "yup"
import {getAllProjects, addProject, deleteProjext} from "../utils/questionaire"
import Loader from './Loader';


const validateProject = Yup.object().shape({
    name: Yup.string().required("Project name is required").label("Project name")
})

function Projext() {
    const MySwal = withReactContent(Swal)
   const [ isLoading, setIsLoading] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [projects, setProjects] = useState([])
    const navigate = useNavigate()
    console.log("Project", projects)
    
    const loadProject = async () => {
        const data = await getAllProjects()
        setProjects(data)
    }

    const postProject = async body => {
        setIsLoading(true)
        await addProject(body)
        setShowForm(false)
        setIsLoading(false)
        loadProject()
    }


    const handleDeleteProject = async id => {
     await deleteProjext(id)
     loadProject()
    }

    useEffect(() => {
        loadProject()
    }, [])
    return (
        <div className="dashboard">
       {      showForm &&
        <div className="modal">
        <div className="login-container register-container">
                 <div className="cancel-container">
                    <MdCancel onClick={()=>setShowForm(false)} style={{cursor:"pointer"}} size={25} color='black'/>
                 </div>
                     <Formik 
                     initialValues={{name: "" }} 
                     validationSchema={validateProject}
                     onSubmit={(values)=> postProject(values)}
                     >
                         {({handleChange,handleSubmit,errors,touched})=>(
                            <>
                              <input onChange={handleChange} name="name" type="text" placeholder="Name of project" className="login-field" />
                              {errors.name && touched.name && <p className="error">{errors.name}</p>}
                          { !isLoading &&  <button onClick={handleSubmit} className="button button__primary button__full">Submit</button>}
                          { isLoading &&  <Loader/>}
                            </>
                            
                         )}
                     </Formik>
                </div>
        </div>
        }
            <button onClick={() => setShowForm(true)} className="button button__primary">Add Project</button>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Project Name</TableCell>
            <TableCell align="left">Date Posted</TableCell>
            <TableCell align="left">View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.date_posted?.toString().substr(0, 10)}</TableCell>
               
                <TableCell align="left">
                <button onClick={() => navigate(`/projects/${row._id}`)} style={{background:"gray",width:"100px",color:"white",padding:"4px", marginInline: "10px"}} className="button">View</button> 
                <button onClick={()=>handleDeleteProject(row._id)} style={{background:"red",width:"100px",color:"white",padding:"4px"}} className="button">Delete</button>
                  
                </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    );
}

export default Projext;