import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {getPapers, deletePaper, togglePaperStatus} from "../utils/questionaire"

function Datasets() {
    const MySwal = withReactContent(Swal)
    const [papers,setPapers] = useState([])

    useEffect(() => {
        getPapers(setPapers)
    }, [])


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

       const handleViewPaper = url =>{
        window.open(url, "_blank")
      }
   

   const handleTogglePaperStatus = async id => {
    await togglePaperStatus(id)
    getPapers(setPapers)
  }

    return (
        <div className="dashboard">
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
        </div>
    );
}

export default Datasets;