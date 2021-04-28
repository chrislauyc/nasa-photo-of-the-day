import React from 'react';

export default function APOD(props){
    const {page} = props;
    if(!page){
        return <div></div>;
    }
    const {media_type,title,url} = page.data;
    function displayMedia(type,url,alt){
        if(type==='video'){
            return(
                <iframe src={url}></iframe>
            );
        }
        else if(type==='image'){
            return(
                <img src={url} alt={alt}></img>
            );
        }
        else{
            console.log('unknown media type',type);
        }
    }
    return(
        <div className='container'>
            <div className='explanation'>{page.data.explanation}</div>
            {displayMedia(media_type,url,title)}
        </div>
    );
}