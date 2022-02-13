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
  const rawData =  {womanId:d.womanId,localityId:d.localityId,triceps:d.triceps,biceps:d.biceps,weight:d.weight,height:d.height,pressure:d.pressure,officer:d.officer.name,collect_on:d.collected_on.toString().substr(0,10),hip:d.hip,fat:d.fat,age:d.age}
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
    
}