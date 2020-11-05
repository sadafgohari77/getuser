import React from "react";
import "../../css/bulma.css";
import "../../css/montav2.css";
import "../item/item.css";
import viewProfile from "../../assent/image/icon.png"
import {  Link } from "react-router-dom";

const Item =(props) =>{
    return(

        <div  className="flex-card-item box has-background-warning space-4-mobile-n">
              <article className="media ">
                 <figure className="media-left">
                     <p className="image is-128x128">
                          <img src={props.avatar}/>
                     </p>
                 </figure>
                 <div className="media-content">
                     <div className="content">
                        <div className="is-flex">
                             <strong>{props.first_name} {props.last_name}</strong>
                        </div>
                         <small>{props.email}</small>
                     </div>
                     <nav className="level is-mobile">
                         <div className="level-left">
                              <Link to={`/card/${props.id}`} >
                                 <a className="level-item">
                                      <img className="view-profile" src={viewProfile}/>
                                 </a>
                             </Link>
                         </div>
                    </nav>
                </div>
             </article>
        </div>

    );
}

export default Item;
