import React from 'react'
import './devanimation.css'

function DevAnimation() {

  const skillDomain=['frontend', 'backend', 'blockchain']
  return (

    <div className='skcont'>
        <div className='skname'>
          {
            skillDomain.map((it,key)=>{
              return <span key={key}>{it}</span>
            })
          }
        </div>
        <p className='dvlpr'>DEVELOPER</p>
    </div>

  )
}

export default DevAnimation
