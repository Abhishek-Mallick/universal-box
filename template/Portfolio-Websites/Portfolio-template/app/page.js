"use client";
import { useState, useEffect } from "react";
// import ScrollOut from "scroll-out";
import Image from "next/image";
import dotlasher from "public/dotlasher3.jpg";
import edu from "public/edu.png";
import code from "public/code2.png";
import consult from "public/consulting.png";
import web1 from "public/ph1.png";
import web2 from "public/ph2.png";
import web3 from "public/ph3.png";
import web4 from "public/ph5.png";
import web5 from "public/ph6.png";
import web6 from "public/ph7.png";
import web7 from "public/ph8.png";
import web8 from "public/ph9.png";
import web9 from "public/physioplus.png";
import web10 from "public/dms.png";
import web11 from "public/vp.png";
import web12 from "public/reactchart.png";
import dimple from "public/dimple.png";
import gallery from "public/imggallery.png";
import logo from "public/logo.jpg";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillGithub,
} from "react-icons/ai";
import Form from "./Form";
import Cursor from "./Cursor";

export default function Home() {
  const [darkMode, setdarkMode] = useState(false);
  const [myicon, seticon] = useState(false);

  const modehandler = () => {
    setdarkMode(!darkMode);
    seticon(!myicon);
  };

  const icon = myicon ? (
    <BsFillMoonStarsFill className="text-2xl transition-transform duration-500 cursor-none moon-icon" />
  ) : (
    <BsFillSunFill className="text-2xl transition-transform duration-500 cursor-none animate-spin sun-icon" />
  );

  return (
    <div className={darkMode ? "" : "dark"}>
      {/* <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Amatic+SC:wght@700&family=Anton&family=Bangers&family=Barlow+Condensed:wght@100&family=Bebas+Neue&family=Bungee+Spice&family=Climate+Crisis&family=Inspiration&family=Modak&family=Nabla&family=Press+Start+2P&family=Shadows+Into+Light&family=Silkscreen&family=Smokum&family=Special+Elite&family=VT323&family=Vina+Sans&display=swap" rel="stylesheet"></link> */}
      <main className="w-full px-5 transition-colors duration-500 ease-in-out bg-gray-50 dark:bg-gray-900 dark:transition-colors dark:duration-500 dark:ease-in-out cursor-none">
        <nav className="sticky top-0 z-10 flex justify-between w-full py-5 mb-5 backdrop-blur-md md:px-2">
          <div className="flex items-center w-full">
            {/* Show logo and text on larger screens */}
            <h1 className="hidden text-xl md:block cursor-none font-burtons dark:text-white">
              DotLasher
            </h1>
            <a
              href="https://drive.google.com/file/d/1SjyqcO4bnzpMphz-u64hopJML07eLY4i/view?usp=sharing"
              target="_blank"
              className="keyb"
            >
              <Image
                src={logo}
                alt="logo"
                className="object-cover w-6 h-6 rounded-full shadow-lg cursor-pointer dark:transition-transform dark:duration-100 dark:animate-pulse md:ml-5 md:w-8 md:h-8 dark:shadow-lg "
              />
            </a>
          </div>

          <ul className="flex items-center dark:text-white">
            <li className="mr-12 rounded-sm new " onClick={modehandler}>
              {/* <BsFillMoonStarsFill
                  onClick={() => {
                    setdarkMode(!darkMode);
                  }}
                  className="text-2xl cursor-pointer"
                /> */}
              {icon}
            </li>

            <li>
              <a
                href="https://drive.google.com/file/d/1tmmSdLLdgWU5rYipZmQwtcRqsPJ96DoP/view?usp=sharing"
                target="_blank"
                className="px-4 py-2 text-white duration-300 ease-in-out rounded-md cursor-pointer font-burtons bg-gradient-to-r from-cyan-500 to-teal-500 ml-7"
                id="new2"
              >
                RESUME
              </a>
            </li>
          </ul>
        </nav>

        <section className="max-w-full min-h-screen">
          <div className="p-5 text-center">
            <div className="py-1">
              <Image
                src={dotlasher}
                alt="dotlasher"
                className="object-cover m-5 mx-auto overflow-hidden rounded-full shadow-lg w-60 h-60 md:w-80 md:h-80 dark:shadow-lg"
              />
            </div>
            <h2 className="py-2 text-4xl font-medium leading-tight text-teal-700 md:text-7xl font-burtons">
              Vidhan Solanki🖖
            </h2>
            {/* <h1 className="text-5xl text-gray-300 ">Vidhan Solanki</h1>
            <h1 className=" text-gray-500 text-5xl before:content-attr(data-text) absolute overflow-hidden max-w-7em whitespace-nowrap text-white animate-loading">
              Vidhan Solanki
            </h1> */}

            <h3 className="py-5 text-xl font-burtons md:text-3xl dark: text-cyan-800">
              Programmer & Developer
            </h3>
            {/* 🗒️📂 ⚙️🔗*/}
            <div className="scroll-out">
              <p className="max-w-lg py-3 mx-auto leading-7 text-gray-700 text-md md:text-xl dark:text-white md:max-w-4xl">
                👋 Bonjour! I am a passionate Computer Science Student immersed
                in the captivating realm of Web Development 🌐. With boundless
                enthusiasm, I create mesmerizing 📱applications, elegant
                ⚜️sites, and captivating 📝designs.
                <br></br>
                <br></br>
                As a lifelong 🙇‍♂️learner, I wholeheartedly embrace continuous
                growth and improvement, honing my Frontend skills. However, I a
                m eager to broaden my horizons and gain more exposure 🚀 As my
                goal extends in making myself a quality Full Stack developer😉
              </p>
            </div>
            <div className="flex justify-center gap-16 py-10 text-4xl text-gray-600 md:gap-40 dark:text-gray-400">
              <a
                href="https://twitter.com/DotLasher"
                target="_blank"
                className="new"
              >
                <AiFillTwitterCircle className="hover:text-black dark:hover:text-white cursor-none" />
              </a>
              <a
                href="https://www.linkedin.com/in/vidhan-solanki-184695226/"
                target="_blank"
                className="new"
              >
                <AiFillLinkedin className="hover:text-black dark:hover:text-white cursor-none" />
              </a>
              <a
                href="https://github.com/Vidhanvyrs"
                target="_blank"
                className="new"
              >
                <AiFillGithub className="hover:text-black dark:hover:text-white cursor-none" />
              </a>
            </div>
          </div>
        </section>
        <Cursor />
        <section className="py-10 text-center">
          <div>
            <h3 className="text-3xl dark:text-cyan-800 font-burtons">
              Skills & Services
            </h3>
            <p className="py-2 text-lg leading-7 text-gray-700 dark:text-white">
              📄 Technical skills are the specialized knowledge and expertise
              required to perform specific tasks and use specific tools and
              programs in real-world situations. Thats the definition, which is
              💯 correct. However, skills are not limited to professional
              settings alone; they are a vital part of our daily lives. And when
              it comes to technical skills, they are often acquired through
              unwavering consistency 💪 and sheer hard work! 🗿
            </p>
            <p className="py-2 text-lg leading-7 text-gray-700 dark:text-white ">
              As a 🧑Fresher I do not possess a lot of skills but the ones i
              possess are what shows my dignity,hardwork as well as discipline
              towards my goal🎯 <br></br>Below are my Skills ⬇️
            </p>
          </div>
          <div className="gap-10 lg:flex ">
            <div className="flex-1 p-10 my-10 text-center shadow-lg rounded-xl dark:bg-white">
              <Image
                src={code}
                alt="code"
                className="mx-auto"
                width={100}
                height={100}
              />
              <h3 className="pt-8 pb-2 text-lg font-medium font-burtons">
                Developer & Designer
              </h3>
              <p className="py-3">
                I combine my technical expertise with a keen eye for aesthetics
                to create visually stunning and highly functional web
                experiences. I believe in the seamless integration of design and
                development to deliver exceptional
              </p>
              <h4 className="py-4 text-teal-600">
                Frameworks/Technologies I enjoy💖.
              </h4>
              <ul className="text-gray-700 ">
                <li className="py-1">- ReactJs</li>
                <li className="py-1">- NextJs</li>
                <li className="py-1">- NodeJs</li>
                <li className="py-1">- ExpressJs</li>
                <li className="py-1">- Tailwind</li>
                <li className="py-1">- ShadCn</li>
              </ul>
            </div>
            <div className="flex-1 p-10 my-10 text-center shadow-lg rounded-xl dark:bg-white">
              <Image
                src={edu}
                alt="edu"
                className="mx-auto"
                width={100}
                height={100}
              />
              <h3 className="pt-8 pb-2 text-lg font-medium font-burtons">
                Technical Skills
              </h3>
              <p className="py-3">
                I possess a diverse set of technical skills that empower me to
                tackle complex challenges and deliver high-quality solutions.
                With a solid foundation in web development, I am well-versed in
                the latest technologies and frameworks.
              </p>
              <h4 className="py-4 text-teal-600">Skills I possess😎.</h4>
              <ul className="text-gray-700 ">
                <li className="py-1">- Javascript</li>
                <li className="py-1">- Java</li>
                <li className="py-1">- HTML5/CSS3</li>
                <li className="py-1">- Git/vercel</li>
                <li className="py-1">- MongoDB/Sql</li>
                <li className="py-1">- Firebase/Appwrite</li>
              </ul>
            </div>
            <div className="flex-1 p-10 my-10 text-center shadow-lg rounded-xl dark:bg-white ">
              <Image
                src={consult}
                alt="code"
                width={100}
                height={100}
                className="mx-auto"
              />
              <h3 className="pt-8 pb-2 text-lg font-medium font-burtons">
                Passion
              </h3>
              <p className="py-3">
                Passion fuels my drive and motivates me to excel in my work. It
                is the burning desire that propels me to explore new
                technologies, push boundaries.This passion drives me to create
                innovative and impactful solutions
              </p>
              <h4 className="py-4 text-teal-600">Qualities I display🥂.</h4>
              <ul className="text-gray-700 ">
                <li className="py-1">- Quick learner</li>
                <li className="py-1">- Team collaboration</li>
                <li className="py-1">- Strong problem-solving Skills</li>
                <li className="py-1">- Proactive approach</li>
                <li className="py-1">- 'Never say Die' Attitude</li>
                <li className="py-1">- Strong Communication Skills</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="py-8 text-center">
          <div>
            <h3 className="py-1 text-3xl dark:text-cyan-800 font-burtons">
              Portfolio
            </h3>
            <p className="py-2 leading-7 text-gray-700 text-md dark:text-white">
              Since the beginning of my 🗺️journey as a 🔰frontend developer I
              have done a lot of work on my projects & my skills I have gone
              through some Udemy courses, some youtube courses, Made some
              💻projects for my portfolio✅ that have made me proficient in my
              skills and made me excel in my journey Thats how it went till now.
              I am for sure Not rich in experience but i am a quick learner and
              thats what matters❗
            </p>
            <p className="py-2 leading-7 text-gray-700 text-md dark:text-white">
              Here are some of the projects that signifies my React and Web D
              skills⬇️
            </p>
          </div>
          <div className="flex flex-col gap-10 py-10 lg:flex-row lg:flex-wrap">
            <div className="relative flex-1 basis-1/3 group">
              <a href="https://dimplegram.vercel.app/">
                <div className="transition-transform duration-300 transform rounded-lg shadow-xl hover:scale-105 keyb">
                  <Image
                    src={dimple}
                    alt="dimple"
                    className="object-cover w-full h-full overflow-hidden rounded-lg"
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
                <button className="inline-block p-2 mt-4 text-lg bg-orange-100 border shadow-lg rounded-xl border-cyan-800 font-burtons text-cyan-800">
                  Dimple.
                </button>
              </a>
            </div>
            <div className="relative flex-1 basis-1/3 group">
              <a href="https://t3gallery-rho-sepia.vercel.app/">
                <div className="transition-transform duration-300 transform rounded-lg shadow-xl hover:scale-105 keyb">
                  <Image
                    src={gallery}
                    alt="gallery"
                    className="object-cover w-full h-full overflow-hidden rounded-lg"
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
                <button className="inline-block p-2 mt-4 text-lg bg-orange-100 border shadow-lg rounded-xl border-cyan-800 font-burtons text-cyan-800">
                  ImgGallery.
                </button>
              </a>
            </div>
            <div className="relative flex-1 basis-1/3 group">
              <a href="https://mealxotic-me8k.vercel.app/">
                <div className="transition-transform duration-300 transform rounded-lg shadow-xl hover:scale-105 keyb">
                  <Image
                    src={web1}
                    alt="web1"
                    className="object-cover w-full h-full overflow-hidden rounded-lg"
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
                <button className="inline-block p-2 mt-4 text-lg bg-orange-100 border shadow-lg rounded-xl border-cyan-800 font-burtons text-cyan-800">
                  FoodApp
                </button>
              </a>
            </div>

            <div className="flex-1 basis-1/3 ">
              <a href="https://weather-app-4pz2.vercel.app/">
                {/* <div className="absolute inset-0 flex items-center justify-center text-transparent transition-opacity duration-300 bg-black bg-opacity-0 group-hover:bg-opacity-75 hover:text-white">
                  WEATHER UPDATE
                </div> */}
                <div className="transition-transform duration-300 transform rounded-lg shadow-xl hover:scale-105 keyb">
                  <Image
                    src={web2}
                    alt="web2"
                    className="object-cover w-full h-full overflow-hidden rounded-lg"
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
                <button className="inline-block p-2 mt-4 text-lg bg-orange-100 border shadow-lg rounded-xl border-cyan-800 font-burtons text-cyan-800">
                  WeatherApp
                </button>
              </a>
            </div>
            <div className="flex-1 basis-1/3">
              <a href="https://expense-tracker-pi-gray.vercel.app/">
                <div className="transition-transform duration-300 transform rounded-lg shadow-xl hover:scale-105 keyb">
                  <Image
                    src={web3}
                    alt="web3"
                    className="object-cover w-full h-full overflow-hidden rounded-lg"
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
                <button className="inline-block p-2 mt-4 text-lg bg-orange-100 border shadow-lg rounded-xl border-cyan-800 font-burtons text-cyan-800">
                  ExpenseTracker
                </button>
              </a>
            </div>
            <div className="flex-1 basis-1/3">
              <a href="https://physioplushealthcare.com/">
                <div className="transition-transform duration-300 transform rounded-lg shadow-xl hover:scale-105 keyb">
                  <Image
                    src={web9}
                    alt="web9"
                    className="object-cover w-full h-full overflow-hidden rounded-lg"
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
                <button className="inline-block p-2 mt-4 text-lg bg-orange-100 border shadow-lg rounded-xl border-cyan-800 font-burtons text-cyan-800">
                  PhysioPlus.
                </button>
              </a>
            </div>
            <div className="flex-1 basis-1/3">
              <a href="https://www.dmssecurity.in/">
                <div className="transition-transform duration-300 transform rounded-lg shadow-xl hover:scale-105 keyb">
                  <Image
                    src={web10}
                    alt="web10"
                    className="object-cover w-full h-full overflow-hidden rounded-lg"
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
                <button className="inline-block p-2 mt-4 text-lg bg-orange-100 border shadow-lg rounded-xl border-cyan-800 font-burtons text-cyan-800">
                  DMS.
                </button>
              </a>
            </div>
            <div className="flex-1 basis-1/3">
              <a href="https://vp-zeta.vercel.app/">
                <div className="transition-transform duration-300 transform rounded-lg shadow-xl hover:scale-105 keyb">
                  <Image
                    src={web11}
                    alt="web11"
                    className="object-cover w-full h-full overflow-hidden rounded-lg"
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
                <button className="inline-block p-2 mt-4 text-lg bg-orange-100 border shadow-lg rounded-xl border-cyan-800 font-burtons text-cyan-800">
                  VP.
                </button>
              </a>
            </div>
            <div className="flex-1 basis-1/3">
              <a href="chart-basic-app.vercel.app/">
                <div className="transition-transform duration-300 transform rounded-lg shadow-xl hover:scale-105 keyb">
                  <Image
                    src={web12}
                    alt="web12"
                    className="object-cover w-full h-full overflow-hidden rounded-lg"
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
                <button className="inline-block p-2 mt-4 text-lg bg-orange-100 border shadow-lg rounded-xl border-cyan-800 font-burtons text-cyan-800">
                  ChartApp
                </button>
              </a>
            </div>

            <div className="flex-1 basis-1/3">
              <a href="https://tic-tac-toe-flux.vercel.app/">
                <div className="transition-transform duration-300 transform rounded-lg shadow-xl hover:scale-105 keyb">
                  <Image
                    src={web4}
                    alt="web4"
                    className="object-cover w-full h-full overflow-hidden rounded-lg"
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
                <button className="inline-block p-2 mt-4 text-lg bg-orange-100 border shadow-lg rounded-xl border-cyan-800 font-burtons text-cyan-800">
                  TicTacToe.
                </button>
              </a>
            </div>
            <div className="flex-1 basis-1/3">
              <a href="https://vidhanvyrs.github.io/PackageMan/">
                <div className="transition-transform duration-300 transform rounded-lg shadow-xl hover:scale-105 keyb">
                  <Image
                    src={web5}
                    alt="web5"
                    className="object-cover w-full h-full overflow-hidden rounded-lg"
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
                <button className="inline-block p-2 mt-4 text-lg bg-orange-100 border shadow-lg rounded-xl border-cyan-800 font-burtons text-cyan-800">
                  Package/DeliveryApp.
                </button>
              </a>
            </div>
            <div className="flex-1 basis-1/3">
              <a href="https://vidhanvyrs.github.io/MonsterMarket/">
                <div className="transition-transform duration-300 transform rounded-lg shadow-xl hover:scale-105 keyb">
                  <Image
                    src={web6}
                    alt="web6"
                    className="object-cover w-full h-full overflow-hidden rounded-lg"
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
                <button className="inline-block p-2 mt-4 text-lg bg-orange-100 border shadow-lg rounded-xl border-cyan-800 font-burtons text-cyan-800">
                  ShoppingApp.
                </button>
              </a>
            </div>
            <div className="flex-1 basis-1/3">
              <a href="https://vidhanvyrs.github.io/OldNetflix/">
                <div className="transition-transform duration-300 transform rounded-lg shadow-xl hover:scale-105 keyb">
                  <Image
                    src={web7}
                    alt="web7"
                    className="object-cover w-full h-full overflow-hidden rounded-lg"
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
                <button className="inline-block p-2 mt-4 text-lg bg-orange-100 border shadow-lg rounded-xl border-cyan-800 font-burtons text-cyan-800">
                  OldNetflix.
                </button>
              </a>
            </div>
            <div className="flex-1 basis-1/3">
              <a href="https://vidhanvyrs.github.io/GymLandingPage/">
                <div className="transition-transform duration-300 transform rounded-lg shadow-xl hover:scale-105 keyb">
                  <Image
                    src={web8}
                    alt="web8"
                    className="object-cover w-full h-full overflow-hidden rounded-lg"
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
                <button className="inline-block p-2 mt-4 text-lg bg-orange-100 border shadow-lg rounded-xl border-cyan-800 font-burtons text-cyan-800">
                  GymLandingPage.
                </button>
              </a>
            </div>
          </div>
        </section>
        <Form />
      </main>
    </div>
  );
}
