import React , { useState ,useEffect } from 'react'
import Axios from "axios";
import "../../css/bulma.css";

const Card  = (props) =>{
    let idUser = props.match.params.idUser
    const [ user , setuser ] = useState([]);

    useEffect(()=>{
        Axios.get(`https://reqres.in/api/users/${ idUser }`)
            .then(res => {
                console.log(res.data)
                const user = JSON.parse(JSON.stringify(res.data));
                console.log(user.data)
                setuser(user.data)
            })
    },[])

    return(
        <div className="columns is-centered">
        <div className="column is-3 mt-4 ">
             <div className="card">
            <div className="card-image">
                <figure className="image is-5by4">
                    <img src={user.avatar} alt="Placeholder image"/>
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img src={user.avatar} alt="Placeholder image"/>
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">{user.first_name} {user.last_name}</p>
                    </div>
                </div>
                <div className="content">
                   <div> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris. <a>{user.email}</a></div>
                    <a href="#">#css</a> <a href="#">#responsive</a>
                    <br/>
                        <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                </div>
            </div>
        </div>
        </div>
        </div>
    );
}

export default Card;