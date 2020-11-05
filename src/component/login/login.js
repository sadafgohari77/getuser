import React,{useState,useRef} from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Navbar from "../navbar/navbar";

import { useHistory } from "react-router";

import {AuthService} from '../../services/auth.service';

const required = (value) => {
    if (!value){
        return (
            <div className="alert has-background-danger" role="alert">
                this field is required!
            </div>
        );
    }
}

const Login = () =>{
    const form = useRef();
    const checkBtn = useRef();
    const history = useHistory();

    const [ email , setEmail ]= useState("")
    const [ password , setPassword ] = useState("")
    const [ Loading , setLoading ]=useState(false)
    const [ message, setMessage ] = useState("")

    const onChangeEmail= ( e ) => {
        const email = e.target.value;
        setEmail( email )
    }

    const onChangePassword = ( e ) => {
        const password = e.target.value ;
        setPassword( password )
    }

    const handleLogin = ( e ) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        AuthService.login( email , password ).then(
            () => {

                setLoading(true);
                history.push('/')
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
                setLoading(false);
                console.log(resMessage)
            }
        );
    };

    return (
        <div>
            <Navbar/>
            <div className="columns is-centered">
                <div className="column is-3 mt-4 ">
                    <Form onSubmit={handleLogin} ref={form}>
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                 <Input
                                   name="email"
                                   value = {email}
                                   onChange = {onChangeEmail}
                                   validations = {[required]}
                                   className = "input"
                                   type = "email"
                                   placeholder = "Email" />
                            </p>
                        </div>
                        <div className="field">
                             <p className="control has-icons-left">
                                 <Input
                                     name = "password"
                                    value = {password}
                                    onChange = {onChangePassword}
                                    validations = {[required]}
                                    className = "input"
                                    type = "password"
                                    placeholder = "Password"
                                />
                            </p>
                        </div>
                        <div className="field">
                             <p className="control">
                                 <button className="button is-success" disabled = {Loading}>
                                     Login
                                </button>
                            </p>
                        </div>
                        {message && (
                             <div className="field">
                                 <div className="alert has-background-danger" role={alert}>
                                     {message}
                                </div>
                            </div>
                        )}
                        <CheckButton style={{display:"none"}} ref = {{checkBtn}}/>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login;