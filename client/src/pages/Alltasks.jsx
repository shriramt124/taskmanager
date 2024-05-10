import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import InputData from "../components/InputData";
import axios from "axios";

const Alltasks = () => {
  const [Data, setData] = useState();
  const [updatedData,setUpdatedData] = useState({id:"",title:"",desc:""});

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:2000/api/tasks/all-tasks",
        { headers: headers }
      );
      setData(response.data.data);
    };
    fetch();
  },[]);
 
  const [inputdiv, setInputdiv] = useState("hidden");
  return (
    <div>
      {Data && (
        <Cards
          isHome={true}
          inputdiv={inputdiv}
          setInputdiv={setInputdiv}
          data={Data.tasks}
          setUpdatedData={setUpdatedData}

        />
      )}
      <InputData inputdiv={inputdiv} setInputdiv={setInputdiv} updatedData={updatedData} setUpdatedData={setUpdatedData} />
    </div>
  );
};

export default Alltasks;
