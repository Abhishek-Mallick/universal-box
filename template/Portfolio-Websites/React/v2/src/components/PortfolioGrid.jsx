import { Github, Linkedin, Mail, GraduationCap, Code,Server,Link, MapPin, MessageSquare } from "lucide-react"
import './tailw.css'
import './portfoliogrid.css'
import Education from "./education/Education"
import { useState } from "react"
import ContactForm from "./contactme/Contact"

export default function PortfolioGrid() {
    // array of objects
    let skillarr=[
      {'Frontend': ['HTML&CSS', 'JavaScript', 'ReactJS', 'Tailwind']},
      {'Backend' : ['NodeJS', "expressJS", 'MongoDB']},
      {'Blockchain': ['Solidity', 'Web3.js']}
    ]
    console.log(skillarr[0].key)
    const [activeSkill, setActiveSkill]=useState('Frontend')
  return (
    <div className="min-h-screen py-4 px-4 w-[90%] h-[100vh] mx-auto" style={{ backgroundColor: '#1C1C22'}}>
      <div className="grid grid-cols-1 md:grid-cols-10 lg:grid-cols-10 lg:grid-rows-10 gap-3 max-w-6xl w-[100%] h-[100%] mx-auto">

        {/* Intro - Large box spanning 2 rows and 2 columns */}
        <div className="md:col-span-4 md:row-span-7 hover:rounded-3xl p-8 text-gray-100 shadow-lg transition-all duration-100 hover:shadow-xl hover:scale-[1.01] shdwbyhero" style={{ backgroundColor: '#27272c' }}>
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center mb-6">
                <img
                  src="https://picsum.photos/200"
                  alt="John Doe"
                  style={{width: '70px', height: '70px', display: 'block'}}
                  className="rounded-full border-4 border-[#2399C4] mr-4"
                />
                <div>
                  <h2 className="text-3xl font-bold">John Doe</h2>
                  <p className="text-xl text-gray-400 text-customTeal">I write code<span className="text-customTeal">.</span></p>
                </div>
              </div>
              <p className="text-lg mb-4 text-gray-300">
                Lorem ipsum dolor raesentium nesciunt nobis vitae,orem quaerat sequi laboriosam nesciunt quam distinctio incidunt eveniet laborum, magnam sint tenetur.
              </p>
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <MapPin size={18} fill="#2399C4" className="mr-2" />
              <span>Location</span>
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="md:col-span-1 md:row-span-5 hover:rounded-3xl p-6 shadow-lg transition-all duration-100 hover:shadow-xl hover:scale-[1.01] shdwbyhero" style={{ backgroundColor: '#27272c' , display: 'flex', flexDirection: 'column'}}>
          <div className="flex flex-col grow  justify-between"> {/*hover:grow-0 */}
            <a href="#" target="_blank" className="text-gray-300 hover:text-gray-100 transition-colors flex flex-col items-center group">
              <Github color="#2399C4" size={24} className="group-hover:scale-110 transition-transform duration-100" />
              <span className="mt-1 text-xs">GitHub</span>
            </a>
            <a href="#" target="_blank" className="text-gray-300 hover:text-gray-100 transition-colors flex flex-col items-center group">
              <Linkedin color="#2399C4" size={24} className="group-hover:scale-110 transition-transform duration-100" />
              <span className="mt-1 text-xs">LinkedIn</span>
            </a>
            <a href= "#" target="_blank" className="text-gray-300 hover:text-gray-100 transition-colors flex flex-col items-center group">
              <Mail color="#2399C4" size={24} className="group-hover:scale-110 transition-transform duration-100" />
              <span className="mt-1 text-xs">Email</span>
            </a>
          </div>
        </div>

        {/* Project - Small box */}
        <div className="flex flex-col md:col-span-5 md:row-span-5 hover:rounded-3xl p-6 shadow-lg transition-all duration-100 hover:shadow-xl hover:scale-[1.01] shdwbyhero" style={{ backgroundColor: '#27272c'}}>
          <h2 className="text-xl font-semibold mb-3 text-gray-100 flex items-center">
            <GraduationCap className="mr-2" /> Projects
          </h2>
          <div className="grow projectScroll flex gap-[10px] overflow-x-scroll flex-col sm:flex-row">
            <div className="projContainer bg-gray-700/30 backdrop-blur-lg border border-gray-500/30 shadow-lg p-3 rounded-lg min-w-[300px] overflow-hiddden flex flex-col gap-[10px]">
                <h2 className="text-xl text-[#2399C4]">proj1</h2>
                <div className="grow text-[14px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea delectus laborum magnam, voluptas praesentium assumenda!</div>
                <div>tech stack</div>
            </div> 
            <div className="projContainer bg-gray-700/30 backdrop-blur-lg border border-gray-500/30 shadow-lg p-3 rounded-lg min-w-[300px] overflow-hiddden p-1 flex flex-col gap-[10px]">
                <h2 className="text-xl text-[#2399C4]">project2</h2>
                <div className="grow text-sm">Lorem ipsum dolor sit amet consectetur adipisicing.</div>
                <div>HTML, CSS, JS</div>
            </div>
          </div>
        </div>

        {/* Skills - Medium box spanning 2 columns */}
        <div className=" md:col-span-3 md:row-span-5 hover:rounded-3xl p-3 shadow-lg transition-all duration-100 hover:shadow-xl hover:scale-[1.01] shdwbyhero" style={{ backgroundColor: '#27272c'}}>
            <div className="flex flex-col h-full ">
                <h2 className="text-2xl font-semibold text-gray-100 flex items-center">
                    <Code className="mr-2" /> Skills
                </h2>
                <div className="flex h-full p-3 gap-[5px] overflow-x-scroll flex flex-col sm:flex-row">
                    <div className="h-[80%] grow flex flex-col gap-[5px]">
                        <button
                        key='Frontend Developer'
                          onClick={() => setActiveSkill('Frontend')}
                        className={`p-2 rounded-lg transition-all duration-300 flex flex-col`}
                        >
                        <span className=" text-gray-100 flex items-center p-2 bg-gray-700 hover:bg-gray-600 rounded-xl" ><Code className="mr-2" /> Frontend</span>
                        {/* <span className="mt-2 text-sm font-medium">Front</span> */}
                        </button>
                        <button
                        key='Frontend Developer'
                          onClick={() => setActiveSkill('Backend')}
                        className={`p-2 rounded-lg transition-all duration-300 flex flex-col`}
                        >
                        <span className="text-gray-100 flex items-center p-2 bg-gray-700 hover:bg-gray-600 rounded-xl" ><Server className="mr-2" /> Backend</span>
                        {/* <span className="mt-2 text-sm font-medium">Front</span> */}
                        </button>
                        <button
                        key='Frontend Developer'
                          onClick={() => setActiveSkill('Blockchain')}
                        className={`p-2 rounded-lg transition-all duration-300 flex flex-col`}
                        >
                        <span className="text-gray-100 flex items-center p-2 bg-gray-700 hover:bg-gray-600 rounded-xl" ><Link className="mr-2" /> Blockchain</span>
                        {/* <span className="mt-2 text-sm font-medium">Front</span> */}
                        </button>
                    </div>
                    <div className="skillname flex flex-col p-1">
                        {activeSkill=='Frontend' && <div>
                          {
                            skillarr[0]['Frontend'].map((it,key)=>{
                              return <p key={key}>{it}</p>
                            })
                          }
                          
                        </div>
                        }
                        {activeSkill=='Backend' && <div>
                          {
                            skillarr[1]['Backend'].map((it,key)=>{
                              return <p key={key}>{it}</p>
                            })
                          }
                        </div>      
                        }
                        {activeSkill=='Blockchain' && <div>
                          {
                            skillarr[2]['Blockchain'].map((it,key)=>{
                              return <p key={key}>{it}</p>
                            })
                          }
                        </div>      
                        }
                        
                    </div>
                </div>
            </div>
        </div>

        {/* contact - Medium box spanning 2 columns */}
        <div className="md:col-span-3 md:row-span-5 hover:rounded-3xl p-6 shadow-lg transition-all duration-100 hover:shadow-xl hover:scale-[1.01] shdwbyhero" style={{ backgroundColor: '#27272c'}}>
          <h2 className="text-2xl font-semibold text-gray-100 flex items-center">
            <MessageSquare  className="mr-2" /> Contact
          </h2>
          <div className="space-y-4">
            <ContactForm/>
          </div>
        </div>

        {/* Education - Small box */}
        <div className="md:col-span-4 md:row-span-3 hover:rounded-3xl p-4 shadow-lg transition-all duration-100 hover:shadow-xl hover:scale-[1.01] shdwbyhero" style={{ backgroundColor: '#27272c' }}>
            <div className="flex flex-col gap-[5px] ">    
                <h2 className="text-xl font-semibold text-gray-100 flex items-center">
                    <GraduationCap className="mr-2" /> Education
                </h2>
                <div className="flex justify-center align-center">
                    <Education/>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}