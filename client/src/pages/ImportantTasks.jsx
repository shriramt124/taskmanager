import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards'
import axios from 'axios';
 
const ImportantTasks = () => {
  const [Data,setData] = useState();
  const [isChanged,setIsChanged] = useState(false)
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
  },[isChanged]);
 Data && console.log(Data);

  return (
    <div>
        <Cards isHome={false} data={Data} isChanged={isChanged} setIsChanged={setIsChanged} />
    </div>
  )
}

export default ImportantTasks