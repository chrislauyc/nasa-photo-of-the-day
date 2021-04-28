import React, {useState,useEffect} from "react";
import axios from "axios";
import "./App.css";
import {BASE_URL,API_KEY} from "./constants";
import Header from './components/Header';
import APOD from './pages/APOD';
// import Footer from './components/Footer';
const makePage = (longName,shortName,data)=>{
  return{
    longName,
    shortName,
    data
  };
};
// const pages = [
//   makePage('Astronomy Picture of the Day','APOD'),
//   makePage('Curiosity Rover','Curiosity'),
//   makePage('Opportunity Rover','Opportunity'),
//   makePage('Spirit Rover','Spirit')
// ]
const roverNames = ['curiosity','opportunity','spirit'];
const roverArgs = {
  sol:1000
};
function App() {
  const [pages, setPages] = useState([]);
  // const [currentPage, setCurrentPage] = useState(0);
  useEffect(()=>{
    
    const fetchdata = (setFunction,baseUrl,args) =>{
        args['api_key'] = API_KEY;
        let query = Object.keys(args).map((k)=>`${k}=${args[k]}`).join('&');
        axios.get(`${baseUrl}?${query}`)
        .then(({data})=>{
          setFunction(data);
        })
        .catch((err)=>console.log(err));
    };
    let tempPages = [];

    roverNames.forEach((roverName)=>{
      fetchdata((data)=>tempPages.push(makePage(`${roverName} rover`,`${roverName}`,data)),`${BASE_URL}/mars-photos/api/v1/rovers/${roverName}/photos`,roverArgs);
    });

    fetchdata((data)=>{
      tempPages.push(makePage('Astronomy Picture of the Day','APOD',data));
      //call setPages at the end
      setPages([...pages,...tempPages]);
    },`${BASE_URL}/planetary/apod`,{});
  },[]);
  console.log('render pages',pages);
  return (
    <div className="App">
      <Header pages={pages} currentPage={pages.findIndex((page)=>page.shortName==='APOD')} />
      <main>
        <APOD page={pages.find((page)=>page.shortName==='APOD')}/>
      </main>
    </div>
  );
}

export default App;
