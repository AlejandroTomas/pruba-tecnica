export default  function axios(data){
    //spreed
    let { url, resolve, configAxios }= data;
    //conseguir los datos
    const getData = async () => {
        try {
            const res = await fetch(url,configAxios);
            let json = await res.json();
            if(!res.ok) throw {status:res.status,statusText:res.statusText}; //Capturar el error
            await resolve(json);
        } catch (err) {
            let message= err.statusText || "Ocurrio un error";
            console.log(err)
            console.log(message +" "+ err.status)
        }
      
    }
    getData()
}