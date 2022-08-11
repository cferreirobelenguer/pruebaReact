
import React,{useState,useEffect} from 'react'
import axios from 'axios'


const Prueba=()=>{
    const [resultado,setResultado]=useState("");
    const [resultadoCorto,setResultadoCorto]=useState("")
    const [imagen, setImagen]=useState("")
    const API_KEY="XXXXXXXXXXXXXX"

    const callAPI=()=>{
        //Ejemplo de petición con axios
        axios.get('https://catfact.ninja/fact')
        .then(res=>{
            setResultado(res.data.fact);
            console.log(res.data.fact);
            let resultadoTotal=""
            let contador=0
            for (let i of resultado){
                resultadoTotal+=i
                if(i===" "){
                    contador ++;
                }
                if(contador===3){
                    break;
                }
            }
            setResultadoCorto(resultadoTotal)
        })
        .catch(error=>{
            console.log("No se pudo procesar el título "+error)
        })

    }
    
    const callAPI2=()=>{
        //Ejemplo de petición con fetch
        fetch('https://api.giphy.com/v1/gifs/search?q='+resultadoCorto+'&api_key='+API_KEY)
        .then(res=>res.json())
        .then((data)=>{
            setImagen(data.data[0].images.original.url);
            console.log(data.data[0].images.original.url)
        })
    }
    //La llamada a las APIS se hacen 
    useEffect(()=>{
        callAPI();
        callAPI2()
    }
    ,[]);
    
    
    
    const recorrerImagen=()=>{
        console.log(imagen)
    }
    recorrerImagen()
    console.log("resultado: "+resultadoCorto)
    return(
        <div className="container">
            <div className="tituloGato">
                
                <h1>{resultado}</h1>
            </div>
            <div className="giftGato">
                <img src={imagen} width="500" height="500"/>
            </div>
            
        </div>
    )
}
export default Prueba;