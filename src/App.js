import {useState} from 'react';
import { FiSearch } from "react-icons/fi";
import './Styles.css';
import api from './servers/api';

 function App() {
  const[input, setInput] = useState('')
  const [cep,setCep]= useState ({});
    function validarCEP (input){
      if(input === ''){
        alert("Preenche algum CEP!") 
        return;
      } 
      const regex = /^[0-9]{8}$/;
      if (!regex.test(input)) {
        alert("CEP inválido! O CEP deve conter exatamente 8 números.");
        return false;
      }
  
      return true;
    }

   async function handleSearch(){
  
  
    try{
      const response = await api.get(`https://viacep.com.br/ws/${input}/json`)
      setCep (response.data);
      setInput("")
    }catch{
      alert ("Erro de OPS");
      setInput("")
    }
  }
  function handleChange(e) {
    const value = e.target.value;

    if (/[^0-9]/.test(value)) return; 
    if (value.length <= 8) {
      setInput(value);
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
       onChange={handleChange} 
       maxLength="8" 
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
