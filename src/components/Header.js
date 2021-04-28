import React from 'react';
export default function Header(props){
    const {pages,currentPage} = props;
    if(!pages[currentPage]){
        return <div>empty header</div>;
    }
    return(
        <header className="App-header">
            <h1>{pages[currentPage].longName}</h1>
            <nav>
                {                
                pages.map((page,i)=>{
                    return(
                        <button key={i} className="App-link">{page.shortName}</button>
                    );
                })
                }
            </nav>
        </header>
    );
}