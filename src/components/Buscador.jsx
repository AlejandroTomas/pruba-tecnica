import React, { useEffect, useRef, useState } from 'react'
import axios from '../helpers/axios'
import { useIssuesStorage } from '../App';
import { useDebounce } from '../hooks/useDebounce';


const Buscador = () => {
//controlador del imput
  const [inputVal, setInputVal] = useState({
    search:""
  });
//Custom hook debounce
  const debounceValue = useDebounce(inputVal.search,500)

  const [setSearch] = useIssuesStorage((state) => [state.setSearch]);

  const handleChange = (e) =>{
      const {name, value } = e.target;
      setInputVal({...inputVal, [name]:value.toLowerCase()})
  }

  const handleSeachBtn =  ()=>{
    setSearch(inputVal.search)
  }

  const handleKey = (e)=>{
    if(e.code === "Enter"){
      const {name, value } = e.target;
      setInputVal({...inputVal, [name]:value.toLowerCase()})
      //Seteamos la busqueda en el contexto global
      setSearch(inputVal.search)
    }
  }

  useEffect(() => {
    setSearch(inputVal.search)
  }, [debounceValue]);

  const { search } = inputVal

  return (
    <div className="searcher">
        <input
              className='searcher--input'
              type="text"
              name="search"
              value={search}
              onChange={handleChange}
              onKeyDown={handleKey}
        />
        <button onClick={handleSeachBtn}>buscar</button>
    </div>
  )
}

export default Buscador