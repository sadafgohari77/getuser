import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CREAT_SUCCESS,
    CREAT_FAIL,
    LOGOUT
} from "../actions/type";
const user=JSON.parse(localStorage.getItem("user"))

const initislState =user
     ? {isLoggedIn:true, user}
     : {isLoggedIn:false, user:null};

export default function (state=initislState,action){
    const {type ,payload}=action;

    switch(type){
        case REGISTER_SUCCESS:
            return{
                ...state,
                isLoggedIn:false,
            };

        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user:payload
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        case CREAT_SUCCESS:
            return {
                ...state,
                isLoggedIn: false
            };

        case CREAT_FAIL:
            return {
                ...state,
                isLoggedIn: false
            };

        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        default:
            return state;
    }
}