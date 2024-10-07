import React, {useState,useEffect} from 'react'
import { Link} from 'react-router-dom';
import DevAnimation from './DevAnimation';
import imgsvg from './smilesvg.svg'

function Home() {
  let nstr="HERO"
  const [dname, setdname]=useState('');
  function namervl(){
    let name="";
    let namelen=nstr.length
    let str="!@#$%^&*()_+{}><?/.,:`~|][=-"
    let hero="";
    let intid;
    let intid2;

    function random(n){
        clearInterval(intid);
        intid= setInterval(() => {
            let dstr="";
            for(let i=0; i<n; i++){
            let r=Math.floor(Math.random() * 28);
            dstr=str[r];
            }
            name=hero+dstr;
            setdname(name)
            
            // document.querySelector('.loading').innerHTML=name;
        }, 80);

    }
    let q=0;
    intid2=setInterval(() => {

        if(q<namelen){
            hero+=nstr[q];
            q++;
            name=hero;
            random(namelen-q-1);
        }
        else{
            clearInterval(intid);
            clearInterval(intid2);
        }
    }, 250);
  }
  useEffect(() => {
    namervl();
  }, []);


  const [colr, setcolr]=useState('rgb(250, 106, 10)');
  useEffect(()=>{
    if(dname!==nstr){
      let x=Math.floor(Math.random() * 255);
      let y=Math.floor(Math.random() * 255);
      // let z=Math.floor(Math.random() * 255);
      let z=0;
      // let cx=`#${x+1}A6${x}A0`;
      let cx=`rgb(${x},${y},${z})`
      setcolr(cx);
      // console.log(cx)
    }
    else{
      setcolr('#2399C4')
    }
  },[dname]);

  const handlecol=(i)=>{
    const clr=['rgb(255,0,0)','rgb(0,255,0)','rgb(0,0,255)'];
    if(i===0 || i===12 ||i===6){
      return 'white';
    }
    else{
      return clr[(i-1)%3];
    } 
  }

  let strhw="<hello world, ";
  return (
    <div className='homecontainer'>
        <div className='hidden md:block' style={{marginLeft: '5%'}}>
          <img className='' src={imgsvg}></img>
        </div>
        <div className='introcontainer p-5'>
          <div className='helloworld text-3xl sm:text-5xl md:text-6xl'>
            {Array.from(strhw).map((w,ind)=>{
              return <span key={ind} style={{color: `${handlecol(ind)}`}}>{w}</span>
            })}
          </div>
          <div className='impj'><span className='im text-xl sm:text-3xl md:text-3xl'>i'm</span><span className='pj text-3xl sm:text-5xl md:text-6xl' style={{color: colr}}>{dname}/&gt;</span></div>
          <div className='fdev'><DevAnimation/></div>
          
        </div>
      <Link to='/portfolio' >
        <div className='arrdwn'>
          <div className='arrline1'></div>
          <div className='arrline2'></div>
        </div>
      </Link>
    </div>
  )
}

export default Home
