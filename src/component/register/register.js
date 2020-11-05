import React,{useState,useRef} from 'react'
import "../../css/bulma.css"
import Navbar from "../navbar/navbar";

import Form from "react-validation/build/form"
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button"
import * as EmailValidator from 'email-validator';
import { useHistory } from "react-router";
import {AuthService} from '../../services/auth.service'


const required = (value) => {
    if (!value){
        return (
            <div className="alert has-background-danger" role="alert">
                this field is required!
            </div>
        );
    }
};

const validEmail = ( value ) => {
    if(!EmailValidator.validate(value)){
        return (
            <div className="alert has-background-danger" role="alert">
                this is not valid email!
            </div>
        )
    }
}

const validPassword = (value) => {
   if (value != undefined){
    if(value.length < 6 || value.length > 40){
        return (
            <div className="alert has-background-danger" role="alert">
                the password must be between 6 and 40 characters.
            </div>
        )
    }
   }
};

function Register  () {
    const form = useRef();
    const checkBtn = useRef();

    const history = useHistory();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [successful, setSuccessful] = useState(false)
    const [message, setMessage] = useState("")

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email)
    }

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password)
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);

        AuthService.register(email, password).then(
            (response) => {
                setMessage(response.id);
                setSuccessful(true);
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
                    setSuccessful(false);
            }
        );
    }
    return (
        <div>
        <Navbar/>
           <div className="columns is-centered">
            <div className="column is-3 mt-4 ">
                <Form  ref={ form }>
                    {!successful &&(
                        <div>
                            <div className="field">
                                <p className="control has-icons-left has-icons-right">
                                    <Input
                                        name="email"
                                        value={email}
                                        onChange={onChangeEmail}
                                        validations={[required,validEmail]}
                                        className="input"
                                        type="email"
                                        placeholder="Email"
                                    />
                                </p>
                            </div>
                            <div className="field">
                                <p className="control has-icons-left">
                                    <Input
                                        name="password"
                                        value={password}
                                        onChange={onChangePassword}
                                        validations={[required,validPassword]}
                                        className="input"
                                        type="password"
                                        placeholder="Password"
                                    />
                                </p>
                            </div>
                            <div className="field">
                                <p className="control">
                                    <button className="button has-background-primary-light" onClick={handleRegister} >
                                        Register
                                    </button>
                                </p>
                            </div>
                        </div>
                    )}
                    {message && (
                        <div className="field">
                            <div className={successful? " alert has-background-success": " alert has-background-danger"} role={alert}>
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{display:"none"}} ref={{checkBtn}}/>
                </Form>
            </div>
        </div>
        </div>
    )
}

export default Register;

