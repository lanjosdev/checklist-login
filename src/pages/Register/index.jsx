// Funcionalidades / Libs:
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Services:
import { auth } from '../../services/firebaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// Estilo:
import './register.scss';


export default function Register() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmeSenha, setConfirmeSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);

  const navigate = useNavigate();

  async function onSubmitRegister(e) {
    e.preventDefault();

    if(senha === confirmeSenha) {
      await createUserWithEmailAndPassword(auth, email, senha)
      .then(()=> {
        navigate('/', { replace: true });
        alert('CADASTRO REALIZADO COM SUCESSO!');
      })
      .catch((error)=> {
        if(error.code === 'auth/email-already-in-use') {
          alert('EMAIL já cadastrado!');
        } else if(error.code === 'auth/weak-password') {
          alert('Senha muito fraca!');
        } else {
          console.log('ERRO AO FAZER O CADASTRO!');
          console.log(error);
        }
      })
    } else {
      alert('Confirmação de senha invalida!');
    }
  }


  return (
    <main className='register-container'>
      <div className="grid">

        <h1>Cadastre-se</h1>
        <p><em>Vamos criar sua conta!</em></p>

        <form className='register' onSubmit={onSubmitRegister}>
          <input 
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            required
            autoComplete='off'
          />
          <input 
            type={showSenha ? 'text' : 'password'}
            placeholder='Senha'
            value={senha}
            onChange={(e)=> setSenha(e.target.value)}
            required
            autoComplete="off"
          />
          <input 
            type={showSenha ? 'text' : 'password'}
            placeholder='Confirme sua senha'
            value={confirmeSenha}
            onChange={(e)=> setConfirmeSenha(e.target.value)}
            required
            autoComplete="off"
          />

          <div className="show-senha">
            <input
              type="checkbox"
              id='showSenha'
              onClick={()=> setShowSenha(!showSenha)}
            />
            <label htmlFor="showSenha"> Mostrar senha</label>
          </div>

          <button type='submit'>Cadastrar</button>
        </form>

        <Link className='btn-link' to='/'>Já possui uma conta? Faça o login!</Link>

      </div>  
    </main>
  );
}