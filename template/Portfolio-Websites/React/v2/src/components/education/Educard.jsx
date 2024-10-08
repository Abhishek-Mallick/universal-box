import React from 'react'

function Educard({nameofinstitute,nameofcourse,fromto}) {
  return (
    <div className='educard'>
      <div className='eduinst'>{nameofinstitute}</div>
      <div  className='educourse'>{nameofcourse}</div>
      <div className='eduyear'>{fromto}</div>
    </div>
  )
}

export default Educard