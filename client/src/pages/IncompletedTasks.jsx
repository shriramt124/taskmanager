import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards';
import { useNavigate } from 'react-router-dom';

const IncompletedTasks = () => {
  const navigate = useNavigate()
  const [Data,setData] = useState();
 const [isChanged,setIsChanged] = useState(false)

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:2000/api/tasks/get-incompleted-tasks",
        { headers: headers }
      );
      if(response.success === false){
      navigate("/login")
      }
      setData(response.data.data);
    };
    fetch();
  },[isChanged]);
 Data && console.log(Data);

  return (
    <div>
      <Cards data={Data} isHome={false} isChanged={isChanged} setIsChanged={setIsChanged} />
    </div>
  )
}

export default IncompletedTasks