import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CREAT_SUCCESS,
    CREAT_FAIL,
    SET_MESSAGE

} from "./type";
import { AuthService } from '../services/auth.service';

export const register=(email,password)=>(dispatch)=>{
    return AuthService.register(email,password).then(
        (response)=>{
            dispatch({
                type:REGISTER_SUCCESS
            });

            dispatch({
                type:SET_MESSAGE,
                payload:response.data.message
            });

            return Promise.resolve();
        },
        (error)=> {
            const message=
                (error.message &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
            dispatch({
                type:REGISTER_FAIL
            });

            dispatch({
                type:SET_MESSAGE,
                payload:message
            });
            return Promise.reject();
        }
    )
}

export const createAccount=(name,job)=>(dispatch)=>{
    return AuthService.createAccount(name,job).then(
        (response)=>{
            dispatch({
                type:CREAT_SUCCESS
            });

            dispatch({
                type:SET_MESSAGE,
                payload:response.data.message
            });

            return Promise.resolve();
        },
        (error)=> {
            const message=
                (error.message &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type:CREAT_FAIL
            });

            dispatch({
                type:SET_MESSAGE,
                payload:message
            });
            return Promise.reject();
        }
    )
}


export const login=(email,password)=>(dispatch)=>{
    return AuthService.login(email,password).then(
        (data)=>{
            dispatch({
                type:LOGIN_SUCCESS,
                payload:{user:data}
            });

            return Promise.resolve();
        },
        (error)=> {
            const message=
                (error.message &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type:LOGIN_FAIL
            });

            dispatch({
                type:SET_MESSAGE,
                payload:message
            });
            return Promise.reject();
        }
    )
}


export const logout = () => (dispatch) => {
     AuthService.logout();
           dispatch({
               type:LOGOUT
           });
};