import React from 'react';
import APOD from './APOD';
import Rover from './Rover';
export default function Page(props){
    const {page} = props;
    if(!page){
        return <div>loading...</div>;
    }
    if(page.shortName ==='APOD'){
        return <APOD page={page}/>;
    }
    else{
        return <Rover page={page}/>;
    }
}