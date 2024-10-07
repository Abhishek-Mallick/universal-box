import React from 'react';
import projlist from './Projlist';

function Project() {
  console.log("hlo");
  console.log(projlist[0].img);
  return (
    <div>
      {projlist.map((e, ind) => (
        <div className="projcontainer" key={ind}>
          <img src={e.img} alt={e.title} />
          <div className="cvr"></div>
          <div className="projdet">
            <div
              className="projtitle"
              style={{
                fontSize: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '3px 7px'
              }}
            >
              {e.title}
              <span
                className="arrow"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                &gt;
              </span>
            </div>
            <div
              className="projdesc"
              style={{ fontSize: '16px' }}
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Temporibus at dolorum tempore sit labore voluptatibus similique cum
              sapiente, officia accusantium.
            </div>
            <div className='projstackcont' style={{display: 'flex', justifyContent: 'space-between'}}>
              <div
                className="projstack"
                dangerouslySetInnerHTML={{ __html: e.stack }}
                title="h"
              />
              <div
                className='projgh'
                dangerouslySetInnerHTML={{ __html: e.link.ghl }}
              />
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default Project;
