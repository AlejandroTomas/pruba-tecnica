import { useEffect, useState } from 'react'
import Header from './components/Header'
import Buscador from './components/Buscador'
import List from './components/List'
import { create } from 'zustand'
import axios from './helpers/axios'

export const useIssuesStorage = create((set)=>({
  data:[],
  search:[],
  setSearch:(val) => set(state=>{
    return {
      ...state,
      search : val
    }
  }),

  setData:(val) => set(state=>{
    return {
      ...state,
      data : state.data.concat(val)
    }
  }),
}))



function App() {
  const [setData] = useIssuesStorage((state) => [state.setData]);
  const [flagControl, setFlagControl] = useState(1);
  
  useEffect(() => {
    axios({
      url :`https://api.github.com/repos/facebook/react/issues?labels=Type: Bug&per_page=100&page=${flagControl}`,
      configAxios: {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
      },
      
      resolve: (json) =>{
        let result = json.map((issue) => ({
          title:issue.title.toLowerCase(),
          description:issue.body.replaceAll('##', '<br/> <br/> '),
          date:issue.created_at.slice(0,10),
          owener:issue.user.login
        }));
        setData(result)
        
        if(result.length < 100){
          return 0  ;
        }else{
          setFlagControl(flagControl+1)
        }
        
      }
    });

  }, [flagControl]);  

  return (
    <div className="App">
      <div className="wrapper">
        <Header/>
        <Buscador/>
      </div>
      <List/>
    </div>
  )
}

export default App
