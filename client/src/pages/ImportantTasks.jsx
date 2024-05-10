import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards'
import axios from 'axios';
 
const ImportantTasks = () => {
  const [Data,setData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:2000/api/tasks/imp-tasks",
        { headers: headers }
      );
      setData(response.data.data);
    };
    fetch();
  },[]);
 Data && console.log(Data);

  return (
    <div>
        <Cards isHome={false} data={Data} />
    </div>
  )
}

export default ImportantTasks