import React from "react";
import { Route } from "react-router-dom";
import App from "./App";
import Card from "./component/card/card";
import Register from "./component/register/register";
import CreateAccount from "./component/createAccount/CreateAccount";
import Login from "./component/login/login";
const Routes = () => {
    return (
        <div>
            <Route exact  path='/' component={App} />
            <Route  path='/card/:idUser' component={Card} />
            <Route  path='/register' component={Register} />
            <Route  path='/createAccount' component={CreateAccount} />
            <Route  path='/login' component={Login}/>
        </div>
    )
}

export default Routes