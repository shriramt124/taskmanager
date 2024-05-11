import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cards from './../components/Cards';
import { Navigate, useNavigate } from 'react-router-dom';

const CompletedTasks = () => {
const nvaigate = useNavigate()
  const [Data,setData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:2000/api/tasks/get-completed-tasks",
        { headers: headers }
      );
      if(response.success === false){
  Navigate("/login")
      }
      setData(response.data.data);
    };
    
    fetch();
  },[]);
 Data && console.log(Data);

  return (
    <div>
      <Cards data={Data} isHome={false}/>
    </div>
  )
}

export default CompletedTasks