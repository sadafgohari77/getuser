import Axios from "axios";
import authHeader from './authHeader'

const API_URL= "https://reqres.in/api/"

const getPublicContent=()=>{
    return Axios.get(API_URL+"user", {headers:authHeader()})
}

const getRegister=()=>{
    return Axios.get(API_URL+"register", {headers:authHeader()})
}

export default {
    getPublicContent,
    getRegister
}