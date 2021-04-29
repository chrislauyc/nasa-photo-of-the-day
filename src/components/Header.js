import React from 'react';
import {
    Button,Jumbotron,Navbar,Nav,NavItem
  } from 'reactstrap';
export default function Header(props){
    const {pages,currentPage,navClick, getPage} = props;
    if(pages.length===0){
        return <div>empty header</div>;
    }
    return(
        <header>
            <Jumbotron>
                <h1>{getPage(currentPage).longName}</h1>
                <Navbar>
                    <Nav>
                    {                
                    pages.map((page,i)=>{
                        return(
                            <NavItem key={i}>
                                <Button onClick={()=>{navClick(page.shortName)}}>{page.shortName}</Button>
                            </NavItem>
                        );
                    })
                    }
                    </Nav>
                </Navbar>
            </Jumbotron>
        </header>
    );
}