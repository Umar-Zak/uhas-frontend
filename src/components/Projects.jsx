import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {getProject, deleteProject} from "../utils/questionaire"





function Projects() {
    const MySwal = withReactContent(Swal)
    const [projects,setProjects] = useState([])
    
    useEffect(() => {
        getProject(setProjects)
    }, [])

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

    return (
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
    );
}

export default Projects;