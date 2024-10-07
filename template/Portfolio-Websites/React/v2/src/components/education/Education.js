import React from 'react'
import edulist from './educationlist'
import Educard from './Educard'
import './edu.css'

function Education() {
  return (
    <div className='educontainer overflow-x-scroll flex flex-col sm:flex-row'>
      {
        edulist.map((i,key)=>{
          return <Educard key={key} 
          nameofcourse={edulist[key].nameofcourse} 
          nameofinstitute={edulist[key].nameofinstitute}
          fromto={edulist[key].fromto}
          />
        })
      }
    </div>
  )
}

export default Education
