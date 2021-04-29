import React, {useState} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Row,Col, Container
  } from 'reactstrap';
// import Filter from './components/Filter';
export default function Rover(props){
    const {page} = props;
    const [slider, setSlider] =useState(0);
    if(!page){
        return <div></div>;
    }
    const {photos} = page.data;
    return(
        <Container className='rover'>
            <input type='range' min='0' max={page.maxSol} value={slider} onChange={(e)=>setSlider(e.target.value)}></input>
            <Button onClick={()=>{page.setSol(slider)}}>
                Sol: {slider}
            </Button>
            <Row>
                {
                    photos.map((photo,i)=>{
                        return (
                            <Col key={i}>
                                <Card>
                                    <CardImg src={photo.img_src} alt={`rover photo: ${photo.id}`}></CardImg>
                                </Card>
                            </Col>
                        );
                    })
                }
            </Row>
        </Container>
    );
}