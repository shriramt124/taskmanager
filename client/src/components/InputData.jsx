import React from 'react'

function InputData({inputdiv ,setInputdiv}) {
    const handleClick = ()=>{
        setInputdiv("hidden")
    }
  return (
    < >
       <div className={` ${inputdiv} top-0 left-0 bg-gray-600 opacity-50 h-screen w-full`}>
        </div>
       
        <div className={`${inputdiv} top-0 left-0 w-full h-screen flex justify-center items-center`}>
             
            <div className='w-2/6 bg-gray-800 p-4 rounded-md'>
            <button className='flex justify-end text-xl font-bold' onClick={handleClick}>close</button>
              <input type="text" placeholder='title' name='title' className='w-full bg-gray-700 p-2 rounded-md outline-none my-3'/> 
              <textarea name='desc' id='desc' placeholder='description..' cols="30" rows="10" className='px-3 py-2 rounded w-full bg-gray-700 my-3'>

                </textarea> 
                <button className='px-3 py-2 bg-blue-400 text-xl font-semibold rounded-md'>Submit</button>
            </div>
             
        </div>
    </ >
  )
}

export default InputData