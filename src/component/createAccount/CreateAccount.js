import React,{useState,useRef} from 'react'
import "../../css/bulma.css"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button"
import Navbar from "../navbar/navbar";


import { useHistory } from "react-router";
import { AuthService } from '../../services/auth.service'

const required = (value) => {
    if (!value){
        return (
            <div className="alert has-background-danger" role="alert">
                this field is required!
            </div>
        );
    }
};

const validName = (value) => {
    if (value != undefined) {
        if (value.length < 3 ) {
            return (
                <div className="alert has-background-danger" role="alert">
                    please entar your full name
                </div>
            )
        }
    }
}

const Register = () =>{
    const  form = useRef();
    const checkBtn = useRef();

    const history = useHistory();

    const [ name , setName ] = useState("")
    const [ job , setJob ] = useState("")
    const [ successful , setSuccessful ] = useState(false)
    const [ message , setMessage ] = useState("")

    const onChangeName = ( e ) => {
        const name = e.target.value;
        setName(name)
    }

    const onChangeJOb = ( e ) => {
        const job = e.target.value;
        setJob(job)
    }

    const handleCreateAccount = ( e ) => {
        e.preventDefault();
        setMessage("")
        setSuccessful(false);

        AuthService.createAccount( name , job ).then(
            () => {
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


    };

    return (
        <div>
            <Navbar/>
        <div className="columns is-centered">
            <div className="column is-3 mt-4 ">
                <Form onSubmit={handleCreateAccount} ref={form}>
                    {!successful &&(
                        <div>
                            <div className="field">
                                <p className="control has-icons-left has-icons-right">
                                    <Input
                                        name="name"
                                        value={name}
                                        onChange={onChangeName}
                                        validations={[required,validName]}
                                        className="input"
                                        type="text"
                                        placeholder="name"
                                    />
                                </p>
                            </div>
                            <div className="field">
                                <p className="control has-icons-left">
                                    <Input
                                        name="job"
                                        value={job}
                                        onChange={onChangeJOb}
                                        validations={[required]}
                                        className="input"
                                        type="text"
                                        placeholder="job"
                                    />
                                </p>
                            </div>
                            <div className="field">
                                <p className="control">
                                    <button className="button has-background-black-ter" >
                                        Create
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

