import React, {useState,useEffect} from "react";
import axios from "axios";
import "./App.css";

import {BASE_URL,API_KEY} from "./constants";
import Header from './components/Header';
import Page from './pages/Page';
const makePage = (longName,shortName,data)=>{
  return{
    longName,
    shortName,
    data
  };
};
const roverNames = ['curiosity','opportunity','spirit'];
function App() {
  const [pages, setPages] = useState([]);  
  const [currentPage, setCurrentPage] = useState(null);
  const [sol,setSol] = useState(0);
  let tempPages = pages;
  useEffect(()=>{
    // fetching data for pages***
    // APOD data
    fetchdata((data)=>{
      tempPages = updatePages(tempPages,makePage('Astronomy Picture of the Day','APOD',data));
      setCurrentPage('APOD');
      setPages(tempPages);
    },`${BASE_URL}/planetary/apod`,{});

    // *** 
  },[]);
  useEffect(()=>{
    // rover data
    roverNames.forEach((roverName)=>{
      fetchdata((picsData)=>{
        fetchdata((manifestData)=>{
          let tempPage = makePage(`${roverName} rover`,`${roverName}`,picsData);
          tempPage.maxSol = manifestData.photo_manifest.max_sol;
          tempPage.sol = sol;
          tempPage.setSol = setSol;
          tempPages = updatePages(tempPages,tempPage);
          setPages(tempPages);
        },`${BASE_URL}/mars-photos/api/v1/manifests/${roverName}`,{});
      },`${BASE_URL}/mars-photos/api/v1/rovers/${roverName}/photos`,{sol:sol});
    });
  },[sol]);
  const fetchdata = (setFunction,baseUrl,args) =>{
    args['api_key'] = API_KEY;
    let query = Object.keys(args).map((k)=>`${k}=${args[k]}`).join('&');
    axios.get(`${baseUrl}?${query}`)
    .then(({data})=>{
      setFunction(data);
    })
    .catch((err)=>console.log(err));
  };
  function updatePages(pages,newPage){
    const oldPage = pages.find((page)=>newPage.shortName===page.shortName);
    if(!oldPage){
      return[...pages,newPage];
    }
    else{
      return pages.map((page)=>{
        if(page.shortName === newPage.shortName){
          return newPage;
        }
        else{
          return page;
        }
      });
    }
  }
  function navClick(shortName){
    setCurrentPage(shortName);
  }
  function getPage(shortName){
    return pages.find((page)=>page.shortName===shortName);
  }
  return (
    <div className="App">
      <Header pages={pages} currentPage={currentPage} getPage={getPage} navClick={navClick} />
      <main>
        <Page page={getPage(currentPage)}/>
      </main>
    </div>
  );
}

export default App;
