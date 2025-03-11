import {useState} from 'react';
import { FiSearch } from "react-icons/fi";
import './Styles.css';
import api from './servers/api';

 function App() {
  const[input, setInput] = useState('')
  const [cep,setCep]= useState ({});

   async function handleSearch(){
    
    if(input === ''){
      alert("Preenche algum CEP!")
      return;
    }
    try{
      const response = await api.get(`https://viacep.com.br/ws/${input}/json`)
      setCep (response.data);
      setInput("")
    }catch{
      alert ("Erro de OPS");
      setInput("")
    }
  }
  return (
    <div className="container">
      <h1 className="title"> Buscando CEP  </h1>
      <div className="containerInput">
        <input 
        type="text"
        placeholder="Digite seu CEP..."
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        />
        <button className="ButtonSearth" onClick={handleSearch}>
          <FiSearch seze={25} color="#FFF"/>
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep} </h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
      </main>
      )}
    </div>
  );
}

export default App;
