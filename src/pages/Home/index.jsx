// Funcionalidades / Libs:
import { useState } from 'react';

// Estilo:
import './home.scss';


export default function Home() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);


  return (
    <main className='home-container'>
      <div className="grid">

        <h1>Lista de Tarefas</h1>
        <p><em>Gerencie suas tarefas de forma fácil!</em></p>

        <form className='login'>
          <input 
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />
          <input 
            type={showSenha ? 'text' : 'password'}
            placeholder='Senha'
            autoComplete={false}
            value={senha}
            onChange={(e)=> setSenha(e.target.value)}
          />

          <div className="show-senha">
            <input
              type="checkbox"
              id='showSenha'
              onClick={()=> setShowSenha(!showSenha)}
            />
            <label htmlFor="showSenha"> Mostrar senha</label>
          </div>

          <button type='submit'>Acessar</button>
        </form>

      </div>  
    </main>
  );
}