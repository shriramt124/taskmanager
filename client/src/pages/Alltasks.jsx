import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import InputData from "../components/InputData";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Alltasks = () => {
  const navigate = useNavigate()
  const [Data, setData] = useState();
  const [isChanged,setIsChanged] = useState();

  const [inputdiv, setInputdiv] = useState("hidden");
  const [updatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    desc: "",
  });
 
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetch = async () => {
    try {
      
     
    const response = await axios.get(
      "http://localhost:2000/api/tasks/all-tasks",
      { headers: headers }
    );
    setData(response.data.data);
  } catch (error) {
      navigate("/login");

  }
  };
    
  useEffect(() => {
    fetch();
  }, [updatedData,isChanged]);

  return ( 
    <div>
      {Data && (
        <Cards
          isHome={true}
          inputdiv={inputdiv}
          setInputdiv={setInputdiv}
          data={Data.tasks}
          setUpdatedData={setUpdatedData}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
        />
      )}
      <InputData
        inputdiv={inputdiv}
        setInputdiv={setInputdiv}
        updatedData={updatedData}
        setUpdatedData={setUpdatedData}
      />
    </div>
  );
};

export default Alltasks;
