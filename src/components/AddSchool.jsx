import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Formik} from "formik"
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom';
import {MdCancel} from "react-icons/md"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Loader from './Loader';
import {addSchool, deleteSchool, getSchools} from "../utils/questionaire"


const validateSchool = Yup.object().shape({
    name:Yup.string().required("Name of school is required").label("School")
  })


function AddSchool(props) {
    const MySwal = withReactContent(Swal)

    const [showForm, setShowForm] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [schools, setSchools] = useState([])

    const navigate = useNavigate()
    

    useEffect(() => {
        loadSchools()
    }, [])

    const handleDeleteSchool = id =>{
        MySwal.fire({
            title: 'Do you want to delete this paper?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Quit`,
          }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteSchool(id)
                const data = await getSchools()
                setSchools(data)
            } else if (result.isDenied) {
              Swal.fire('Alright got it', '', 'info')
            }
          })
       }

    const loadSchools = async () => {
        const data = await getSchools()
        setSchools(data)
    }

    const handleSubmitForm = async (body) => {
        setIsLoading(true)
        await addSchool(body)

        window.location = "/dashboard"
    }

    

    return (
       <div className="dashboard">
   {    showForm && 
   <div className="modal">
        <div className="login-container register-container">
                 <div className="cancel-container">
                    <MdCancel onClick={()=>setShowForm(false)} style={{cursor:"pointer"}} size={25} color='black'/>
                 </div>
                     <Formik 
                     initialValues={{name: "" }} 
                     validationSchema={validateSchool}
                     onSubmit={(values)=>handleSubmitForm(values)}
                     >
                         {({handleChange,handleSubmit,errors,touched})=>(
                            <>
                              <input onChange={handleChange} name="name" type="text" placeholder="Name of school" className="login-field" />
                              {errors.name && touched.name && <p className="error">{errors.name}</p>}
                          { !isLoading &&  <button onClick={handleSubmit} className="button button__primary button__full">Submit</button>}
                          { isLoading &&  <Loader/>}
                            </>
                            
                         )}
                     </Formik>
                </div>
        </div>
        
        }
        <div>
            <button onClick={() => setShowForm(true)} className="button button__primary">Add School</button>
        </div>
           <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">School Name</TableCell>
                <TableCell align="left">Manage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schools.map((row) => (
                <TableRow 
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">
                    <button onClick={() => handleDeleteSchool(row._id)} style={{background:"red",width:"100px",color:"white",padding:"4px", fontSize:"15px"}} className="button">Delete</button>
                    <button onClick={() => navigate(`/school/${row._id}`)}  style={{background:"green",width:"100px",color:"white",padding:"4px", fontSize:"15px", marginInline:"10px"}} className="button">Manage</button>  
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
       </div>
    );
}

export default AddSchool;