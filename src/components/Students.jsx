import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useNavigate} from "react-router-dom"
import {Formik} from "formik"
import * as Yup from "yup"
import {MdCancel} from "react-icons/md"
import {getAllStudents, deleteStudent, getSchools, assignStudent} from "../utils/questionaire"
import Loader from './Loader';

const validateSchool = Yup.object().shape({
  id:Yup.string().required("Name of school is required").label("School")
})


function Students({setSelectedStudent, setCurrentQuestion, setShowQuesForm, survey, index}) {
    const navigate = useNavigate()
    const [students, setStudents] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [schools , setSchools] = useState([])
    const [student, setStudent] = useState("")

    useEffect(() => {
        getAllStudents(setStudents)
        loadSchools()
    }, [])

    const handleStartSurvey = (id) => {
        setSelectedStudent(id)
        setCurrentQuestion(survey[index])
        setShowQuesForm(true)
      }

     const loadSchools = async () => {
      const data = await  getSchools()
      setSchools(data)
     }

     const handleShowForm = id => {
      setStudent(id)
      setShowForm(true)
     }


     const handleAssignment = async(body) => {
      setIsLoading(true)
     await assignStudent(body)
    window.location ="dashboard"
  }

    return (
        <div className="dashboard">
          {
            showForm &&
            <div className="modal">
            <div className="login-container register-container">
                     <div className="cancel-container">
                        <MdCancel onClick={()=>setShowForm(false)} style={{cursor:"pointer"}} size={25} color='black'/>
                     </div>
                         <Formik 
                         initialValues={{id: "" }} 
                         validationSchema={validateSchool}
                         onSubmit={(values)=>handleAssignment({student, schoolId: values.id})}
                         >
                             {({handleChange,handleSubmit,errors,touched})=>(
                                <>
                                 <select  onChange={handleChange} className="login-field"  name="id" id="">
                                  <option value="">Select school</option>
                                  {
                                    schools.map(sch => (
                                      <option value={sch._id}>{sch.name}</option>
                                    ))
                                  }
                                 </select>
                                  {errors.name && touched.name && <p className="error">{errors.name}</p>}
                              { !isLoading &&  <button onClick={handleSubmit} className="button button__primary button__full">Submit</button>}
                              { isLoading &&  <Loader/>}
                                </>
                                
                             )}
                         </Formik>
                    </div>
            </div>
          }

          <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow   >
            <TableCell style={{fontSize:"12px"}}>Name of Student</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">Status</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">Name of School</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">Action</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        {
          students.map(stu => (
            <TableRow
              key={stu._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="left">{ stu.name}</TableCell>
                <TableCell align="left">{stu.hasTakenSurvey? "Taken" : "Not Taken"}</TableCell>
                <TableCell align="left">{stu.school? stu.school?.name : "Not Assigned"}</TableCell>
                <TableCell align="left">
                 { stu.hasTakenSurvey && <button onClick={() => navigate(`/survey/${stu._id}`)}   style={{background:"green",width:"140px",color:"white",padding:"4px",marginBlock:"10px", fontSize:"15px"}} className="button">View</button>}
                 {!stu.hasTakenSurvey && <button onClick={() =>handleStartSurvey(stu._id)}   style={{background:"green",width:"140px",color:"white",padding:"4px",marginBlock:"10px", fontSize:"15px"}} className="button">Take questionnaire</button>}
                 <button onClick={() => deleteStudent(stu._id)} style={{background:"red",width:"140px",color:"white",padding:"4px",marginBlock:"10px", marginInline:"15px",fontSize:"15px"}} className="button">Delete</button>
                 <button onClick={() => handleShowForm(stu._id)}  style={{background:"grey",width:"140px",color:"white",padding:"4px",marginBlock:"10px", marginInline:"15px",fontSize:"15px"}} className="button">Assign school</button>
                </TableCell>
            </TableRow>
          ))
        }
        </TableBody>
      </Table>
      </div>
    );
}

export default Students;