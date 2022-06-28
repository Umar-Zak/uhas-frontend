import http from "./http"
import {toast} from "react-toastify"
 


export const postQuestionnaire = async( values,setIsLoading)=>{
    setIsLoading(true)
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
        const {data} = await http.post("/questions",values)
        toast.info("Data Submitted successfully")
        window.location= "/questionaire"
    } catch ({response}) {
        setIsLoading(false)
        if(response.status < 500)return toast.error(response.data)

        toast.error("Unexpected error! Try again")
    }

}

export const postSecondQuestionnaire = async( values,setIsLoading)=>{
    setIsLoading(true)
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
        const {data} = await http.post("/second-questions",{data:values})
        toast.info("Data Submitted successfully")
        window.location= "/second-questionaire"
    } catch ({response}) {
        setIsLoading(false)
        if(response.status < 500)return toast.error(response.data)

        toast.error("Unexpected error! Try again")
    }

}

export const getQuestionnaire = async (setQuestionnaire)=>{
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
        const {data} = await http.get("/questions")
        setQuestionnaire(data)
    } catch ({response}) {
        if(response.status < 500) return toast.error(response.data)

        toast.error("Unexpected error! Try again")
    }
}

export const getSecondQuestionnaire = async (setQuestionnaire)=>{
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
        const {data} = await http.get("/second-questions")
        setQuestionnaire(data)
    } catch ({response}) {
        if(response.status < 500) return toast.error(response.data)

        toast.error("Unexpected error! Try again")
    }
}

export const getQuestionById = async (id,setData) =>{
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
        const {data} = await http.get(`/questions/${id}`)
        setData(data)
    }
     catch ({response}) {
        if(response.status < 500) return toast.error(response.data)

        toast.error("Unexpected error! Try again")
    }
}

export const transformQuestionnaire = data => {
  const transformed = data.map(d=> {
  const rawData =  {womanId:d.womanId,localityId:d.localityId,triceps:d.triceps,biceps:d.biceps,weight:d.weight,height:d.height,pressure:d.pressure,officer:d.officer.name,collect_on:d.collected_on.toString().substr(0,10),hip:d.hip,fat:d.fat,age:d.age,waist:d.waist}
      const dat = data[0].data 
      for (let i = 0; i <  dat.length; i++){
          const question = dat[i]
          rawData[question.number] =  question.answer
      }
   
   return rawData
  })
return transformed
}


export const uploadFile = async (file,setLoading,setShowFileForm) => {
    setLoading(true)
    setTimeout(async()=>{
        const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
        const formData = new FormData()
        formData.append("excel",file)
        await http.post("/uploads",formData)
        setLoading(false)
        setShowFileForm(false)
    } catch ({response}) {
        setLoading(false)
        if(response.status < 500) return toast.error(response.data)

        toast.error("Unexpected error! Try again")
    }
    },4000)
    
}


export const requestData = async(body,setLoading)=>{
    setLoading(true)
    try {
        await http.post("/requests",body)
        setLoading(false)
        window.location = "/"
    } catch ({response}) {
        setLoading(false)

        if(response.status < 500) return toast.error(response.data)

        toast.error("Unexpected error! Try again")
    }
}

export const getRequests = async(setRequests)=> {
  const jwt = localStorage.getItem("token")
  http.setJwt(jwt)
  const {data} = await http.get("/requests")
  setRequests(data)
}


export const postDataSet = async (body,setLoading)=>{
 setLoading(true)
 const jwt = localStorage.getItem("token")
 try {
     http.setJwt(jwt)
     await http.post("/dataset",body)
     window.location = "/dashboard"
 } catch ({response}) {
    setLoading(false)

    if(response.status < 500) return toast.error(response.data)

    toast.error("Unexpected error! Try again")
 }
}

export const postProject = async (body,setLoading)=>{
    setLoading(true)
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
        await http.post("/project",body)
        window.location = "/dashboard"
    } catch ({response}) {
       setLoading(false)
   
       if(response.status < 500) return toast.error(response.data)
   
       toast.error("Unexpected error! Try again")
    }
   }

   export const getDataSets = async (setDataSet)=>{
    const {data} = await http.get("/zips")
    setDataSet(data)
   }

   export const getPapers = async (setPapers)=>{
    const {data} = await http.get("/papers")
    setPapers(data)
   }

   export const getProject = async (setProjects)=>{
    const {data} = await http.get("/projects")
    setProjects(data)
   }

   export const getZips = async (setZips)=>{
    const {data} = await http.get("/zips")
    setZips(data)
   }

   export const deleteDataSet = async id =>{
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
        await http.delete(`/datasets/${id}`)
    } catch ({response}) {
       if(response.status < 500) return toast.error(response.data)
   
       toast.error("Unexpected error! Try again")
    }
   }

   export const deleteQuestionnaire = async id =>{
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
        await http.delete(`/questionnaire/${id}`)
    } catch ({response}) {
       if(response.status < 500) return toast.error(response.data)
   
       toast.error("Unexpected error! Try again")
    }
   }


   export const deletePaper = async id =>{
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
        await http.delete(`/papers/${id}`)
    } catch ({response}) {
       if(response.status < 500) return toast.error(response.data)
   
       toast.error("Unexpected error! Try again")
    }
   }

   export const togglePaperStatus = async id =>{
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
        await http.put(`/approve-paper/${id}`)
    } catch ({response}) {
       if(response.status < 500) return toast.error(response.data)
   
       toast.error("Unexpected error! Try again")
    }
   }

   export const deleteProject = async id =>{
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
        await http.delete(`/projects/${id}`)
    } catch ({response}) {
       if(response.status < 500) return toast.error(response.data)
   
       toast.error("Unexpected error! Try again")
    }
   }

   export const toggleDataStatus = async id =>{
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
        await http.put(`/approve-dataset/${id}`)
    } catch ({response}) {
       if(response.status < 500) return toast.error(response.data)
   
       toast.error("Unexpected error! Try again")
    }
   }

   export const addStudent = async (setIsLoading,body) =>{
    const jwt = localStorage.getItem("token")
    setIsLoading(true)
    try {
        http.setJwt(jwt)
        await http.post(`/second/profile`, body)
        toast.info("Student added successfully")
       setTimeout(() => {
        window.location = "/dashboard"
       },2000)
    } catch ({response}) {
        setIsLoading(false)
       if(response.status < 500) return toast.error(response.data)
   
       toast.error("Unexpected error! Try again")
    }
   }

   export const addSchool = async (body) => {
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
        await http.post(`/second/school-profile`, body)
        toast.info("School added successfully")
    } catch ({response}) {
       if(response.status < 500) return toast.error(response.data)
   
       toast.error("Unexpected error! Try again")
    }
   }

   export const getAllStudents = async (setStudents)=>{
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
        const {data} = await http.get("/second/get/profiles")
        setStudents(data)
    } catch ({response}) {
        if(response.status < 500) return toast.error(response.data)

        toast.error("Unexpected error! Try again")
    }
}


export const getSchools = async ()=>{
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
        const {data} = await http.get("/second/get/schools")
      return data
    } catch ({response}) {
        if(response.status < 500) return toast.error(response.data)

        toast.error("Unexpected error! Try again")
    }
}

export const getSurveyQuestions = async (section, setSurvey)=>{
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
        const {data} = await http.get(`/second/${section}`)
        setSurvey(data)
    } catch ({response}) {
        if(response.status < 500) return toast.error(response.data)

        toast.error("Unexpected error! Try again")
    }
}

export const getSurveys = async (section)=>{
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
        const {data} = await http.get(`/second/${section}`)
       return data
    } catch ({response}) {
        if(response.status < 500) return toast.error(response.data)

        toast.error("Unexpected error! Try again")
    }
}

export const postSurvey = async (body, setIsLoading)=>{
    const jwt = localStorage.getItem("token")
    setIsLoading(true)
    try {
        http.setJwt(jwt)
         await http.post(`/second/answer`, body)
        toast.info("Submitted successfully")
        setTimeout(() => {
            window.location = "/dashboard"
        }, 2000)
    } catch ({response}) {
        setIsLoading(false)
        if(response.status < 500) return toast.error(response.data)

        toast.error("Unexpected error! Try again")
    }
}

export const postSchoolSurvey = async (body, setIsLoading)=>{
    const jwt = localStorage.getItem("token")
    setIsLoading(true)
    try {
        http.setJwt(jwt)
         await http.post(`/second/school-answered`, body)
        toast.info("Submitted successfully")
        setTimeout(() => {
            window.location = "/dashboard"
        }, 2000)
    } catch ({response}) {
        setIsLoading(false)
        if(response.status < 500) return toast.error(response.data)

        toast.error("Unexpected error! Try again")
    }
}


export const getStudentAnswers = async(id) => {
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
        const {data} = await http.get(`/second/get/answered/${id}`)
        return data
    } catch ({response}) {
        if(response.status < 500) return toast.error(response.data)

        toast.error("Unexpected error! Try again")
    }
}

export const getSchoolAnswered = async(id) => {
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
        const {data} = await http.get(`/second/school/answered/${id}`)
        return data
    } catch ({response}) {
        if(response.status < 500) return toast.error(response.data)

        toast.error("Unexpected error! Try again")
    }
}

export const deleteStudent = async(id) => {
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
        await http.delete(`/second/profile/${id}`)
        toast.info("Deleted successfully")
        setTimeout(() => {
            window.location = "/dashboard"
        }, 1000)
    } catch ({response}) {
        if(response.status < 500) return toast.error(response.data)

        toast.error("Unexpected error! Try again")
    }
}

export const editSurvey = async (body, id, setShowForm)=>{
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
         await http.put(`/second/answer/${id}`, body)
        toast.info("Edited successfully")
    } catch ({response}) {
        if(response.status < 500) return toast.error(response.data)

        toast.error("Unexpected error! Try again")
    }
}


export const editSchoolSurvey = async (body, id, setShowForm)=>{
   
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
         await http.put(`/second/school-answer/${id}`, body)
        toast.info("Edited successfully")
    } catch ({response}) {
        if(response.status < 500) return toast.error(response.data)

        toast.error("Unexpected error! Try again")
    }
}

export const deleteSchool = async id =>{
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
        await http.delete(`/second/school/${id}`)
    } catch ({response}) {
       if(response.status < 500) return toast.error(response.data)
   
       toast.error("Unexpected error! Try again")
    }
   }

   export const assignStudent = async (body)=>{
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
         await http.put(`/second/assign/school`, body)
        toast.info("Assigned successfully")
    } catch ({response}) {
        if(response.status < 500) return toast.error(response.data)

        toast.error("Unexpected error! Try again")
    }
}