
import React,{useState,useEffect} from 'react'
import axios from 'axios'
const API_KEY="XGHZ8VQzgcGSGPqo69RM3L48BXno61ZU"

const Prueba=()=>{
    const [resultado,setResultado]=useState("");
    const [resultadoCorto,setResultadoCorto]=useState("")
    const [imagen, setImagen]=useState("")
    

    const callAPI=()=>{
        //petición con axios de la api de gatos
        axios.get('https://catfact.ninja/fact')
        .then(res=>{
            //state que almacena la frase random de la api de gatos
            setResultado(res.data.fact);
            console.log(res.data.fact);
            let resultadoTotal=""
            let contador=0
            //Si se lee espacio se cuenta como palabra, al llegar el contador a 3 se deja de concatenar el string
            for (let i of resultado){
                resultadoTotal+=i
                if(i===" "){
                    contador ++;
                }
                if(contador===3){
                    break;
                }
            }
            //state que almacena las tres palabras sacadas del random de la api de gatos
            setResultadoCorto(resultadoTotal)
        })
        .catch(error=>{
            console.log("No se pudo procesar el título "+error)
        })

    }
    
    const callAPI2=()=>{
        //petición con fetch de la api de giphy
        fetch('https://api.giphy.com/v1/gifs/search?q='+resultadoCorto+'&api_key='+API_KEY)
        .then(res=>res.json())
        .then((data)=>{
            //state que almacena la url del gift
            setImagen(data.data[0].images.original.url);
            console.log(data.data[0].images.original.url)
        })
    }
    
    useEffect(()=>{
        callAPI();
        callAPI2()
    }
    ,[]);
    

    console.log("resultado: "+resultadoCorto)
    return(
        <div className="container">
            <div className="tituloGato">
                <img src={imagen} width="500" height="500" alt="imagen"/>
            </div>
            <div className="giftGato">
                <h1>{resultado}</h1>
            </div>
            
        </div>
    )
}
export default Prueba;