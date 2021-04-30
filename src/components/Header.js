import React from 'react';
import styled from 'styled-components';
export default function Header(props){
    const {pages,currentPage,navClick, getPage} = props;
    if(pages.length===0){
        return <div>empty header</div>;
    }
    return(
        <HeaderStyle>
            <h1>{getPage(currentPage).longName}</h1>
            <NavStyle>
            {                
                pages.map((page,i)=>{
                    return(
                        <ButtonStyle isActive={page.shortName===currentPage} onClick={()=>{navClick(page.shortName)}}>{page.shortName}</ButtonStyle>
                    );
                })
            }
            </NavStyle>
        </HeaderStyle>
    );
}
const HeaderStyle = styled.div`
    display:flex;
    flex-direction:column;
    text-transform:capitalize;
`;
const ButtonStyle = styled.button`
    background:transparent;
    border-style: solid;
    border:none;
    &:hover{
        background:initial;
        background-color:#c3cdde;
        
    }

    ${props=>props.isActive?'background-color:black;color:white':null}
`;
const NavStyle = styled.nav`
    display:flex;
    justify-content:space-evenly;
    background-color:#a9bbcc;
    padding:0.5%;
`;