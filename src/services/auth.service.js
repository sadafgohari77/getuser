import Axios from "axios";
export const AuthService =  {
    login,
    logout,
    getCurrentUser,
    register,
    createAccount
};
const API_URL= `https://reqres.in/api/`;

function register (email,password)  {
    email="eve.holt@reqres.in"
    return Axios.post(API_URL+`register`,{
        email,
        password
    })
        .then((response =>{
            if(response.data.token){
                localStorage.setItem("user",JSON.stringify(response.data));
            }
            console.log(response.data)
            return response.data;
        }));
};

function login (email,password)  {
    return Axios
        .post(API_URL+'login',{
          email,
          password
         })
        .then( ( response => {
            if ( response.data.token ) {
                localStorage.setItem( "user" , JSON.stringify( response.data ) );
            }
            console.log((response.data,"login"))
            return response.data ;
        }));
};

function createAccount ( name , job ) {
    return Axios.post(API_URL+'users',{
        name,
        job
    })
        .then((response =>{
            if(response.data){
                console.log(response.data,"create")
            }
            console.log(response.data)
            return response.data;
        }));
};

function logout  ()  {
    localStorage.removeItem("user");
}

function getCurrentUser  ()  {
    return JSON.parse(localStorage.getItem("user"));
}

