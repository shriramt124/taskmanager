import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cards from './../components/Cards';

const CompletedTasks = () => {

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