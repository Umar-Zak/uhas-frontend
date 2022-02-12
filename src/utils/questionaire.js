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
   return data.map(d=> ({womanId:d.womanId,localityId:d.localityId,triceps:d.triceps,biceps:d.biceps,weight:d.weight,height:d.height,pressure:d.pressure,officer:d.officer.name,collect_on:d.collected_on.toString().substr(0,10),hip:d.hip,fat:d.fat,age:d.age}))
}