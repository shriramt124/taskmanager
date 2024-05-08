import React, { useState } from 'react'
import Cards from '../components/Cards'
import InputData from '../components/InputData'

const Alltasks = () => {
    const [inputdiv,setInputdiv] = useState("hidden");
  return (
    < div>
        <Cards isHome={true} inputdiv={inputdiv} setInputdiv={setInputdiv}/>
        <InputData  inputdiv={inputdiv} setInputdiv={setInputdiv}/>
    </div>
  )
}

export default Alltasks