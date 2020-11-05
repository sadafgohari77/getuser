import React, { useState, useEffect} from 'react'
import Axios from "axios";
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import "../src/css/bulma.css"
import "./App.css"
import Navbar from "./component/navbar/navbar";
import Item from "../src/component/item/item"

const App = () => {

    const [pageNumber,setPageNumber] = useState(1);
    const [loading , setLoading] =useState(true);
    const [users,setUsers] = useState([]);
    const [totalPage,setTotalPage]=useState();

    useEffect(()=>{
        setLoading(true);
        Axios({
            Method: 'Get',
            url: `https://reqres.in/api/users?page=${pageNumber}`,
        }).then(res =>{
            const users = JSON.parse(JSON.stringify(res.data))
            setTotalPage(users.total_pages)
            console.log(totalPage)
            console.log(users)
            setUsers(prevUsers =>{
                return [...new Set([...prevUsers,...users.data.map(item => item
                )
                ])]
            })
            setLoading(false)
        })

    },[pageNumber])

        useBottomScrollListener(callback=>{
        if(pageNumber <= totalPage){
            setPageNumber(pageNumber+1)
        }
    })

    return (
      <div>
         <Navbar/>
         <div  className="flex-card m-4" >
               {users.map((item) =>{
                   return  <Item  key={item.id}  {...item}/>
                   }
               )}
         </div>
         <br/>
         <div>{loading && 'loading...'}</div>
      </div>
  );
}

export default App;
