import React from 'react';
import styled from 'styled-components';
import Slider from '../components/Slider';
// import Filter from './components/Filter';
export default function Rover(props){
    const {page} = props;
    if(!page){
        return <div></div>;
    }
    const {photos} = page.data;
    return(
        <RoverContainer className='rover'>
                <Slider maxSol={page.maxSol} setSol={page.setSol} />
                <PhotosContainer>
                {
                    photos.map((photo,i)=>{
                        return (
                            <ImgStyle src={photo.img_src} alt={`rover photo: ${photo.id}`}></ImgStyle>
                        );
                    })
                }
                </PhotosContainer>
        </RoverContainer>
    );
}
const RoverContainer = styled.div`
    display:flex;
    flex-direction:column;
`;
const PhotosContainer = styled.div`
    display:flex;
    flex-wrap:wrap;
`;
const ImgStyle = styled.img`
    width:25%;
`;