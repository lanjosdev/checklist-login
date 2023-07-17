// Funcionalidades / Libs:
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Services:
import { auth } from '../../services/firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Estilo:
import './home.scss';


export default function Home() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);

  const navigate = useNavigate();

  async function onSubmitLogin(e) {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, email, senha)
    .then(()=> {
      // navega para / admin
      navigate('/admin', { replace: true });
    })
    .catch((error)=> {
      if(error.code === 'auth/user-not-found') {
        alert('Email NÃO CADASTRADO!');
      } else if(error.code === 'auth/wrong-password') {
        alert('Email ou senha incorreta!');
      } else {
        console.log('ERRO AO FAZER LOGIN!');
        console.log(error);
      }      
    })
  }


  return (
    <main className='home-container'>
      <div className="grid">

        <h1>Lista de Tarefas</h1>
        <p><em>Gerencie suas tarefas de forma fácil!</em></p>

        <form className='login' onSubmit={onSubmitLogin}>
          <input 
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            required
          />
          <input 
            type={showSenha ? 'text' : 'password'}
            placeholder='Senha'
            value={senha}
            onChange={(e)=> setSenha(e.target.value)}
            required
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

        <Link className='btn-link' to='/register'>Não possui uma conta? Faça o Cadastro</Link>

      </div>  
    </main>
  );
}