 {/* {activeLink === "datasets" && 
   <div className="dashboard">

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
    </div>
    } */}

     {/* { showDatasetForm &&  <div className="login-container register-container">
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
                </div>} */}

                //     const filteredZips = zips.filter(zip => zip.name.toLowerCase().startsWith(searchDataSet.toLowerCase()))

                // const handleDeleteDataSet = id =>{
                //   MySwal.fire({
                //       title: 'Do you want to delete this dataset?',
                //       showDenyButton: true,
                //       showCancelButton: true,
                //       confirmButtonText: 'Delete',
                //       denyButtonText: `Quit`,
                //     }).then(async (result) => {
                //       if (result.isConfirmed) {
                //           await deleteDataSet(id)
                //           getDataSets(setDataSets)
                //       } else if (result.isDenied) {
                //         Swal.fire('Alright got it', '', 'info')
                //       }
                //     })
                //  }