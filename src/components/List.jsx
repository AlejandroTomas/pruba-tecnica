import React, { useEffect, useRef, useState } from 'react'
import { useIssuesStorage } from '../App';
import { SlCalender } from "react-icons/sl"
import { BiUserCircle } from "react-icons/bi"

const ListItem = ({title, description, date, owener})=>{
    
    const inputEl = useRef(null);
    useEffect(() => {
        inputEl.current.innerHTML=`${description}`;
    }, []);
    return(
        <li >
            <details className="item--list">
            <summary>
                <h4 id='title'>{title}</h4>
                <span className='min' id='date'>
                    <SlCalender/>
                    {date}
                </span>
                <p className='min' id='owener'>
                    <BiUserCircle/>
                    {owener}
                </p>
            </summary>
                <p id='description' ref={inputEl} ></p>

            </details>
        </li>
    );
}



const List = () => {
    const [found, setFound] = useState([]);
  const [search, data] = useIssuesStorage((state) => [state.search, state.data]);

  

    useEffect(() => {
        let filters;
        if(search!=""){
           filters = data.filter(x=>x.title.includes(search));
           setFound(filters);
        }
        
    }, [search]);

  

  return (
     <ul className="blockList">
       {
        found.map((item,index) =>
        <ListItem 
            key={`${Math.random}-${index}`}
            title={item.title}
            description={item.description}
            date={item.date}
            owener={item.owener}
        />)
       }
       {
        found.length === 0  && search!="" ? <h2>Ninguna coincidencia</h2> : null
       }

    </ul>
  )
}

export default List