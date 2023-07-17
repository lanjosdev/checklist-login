// Funcionalidades / Libs:
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'; // semelhante ao que o useNavigate faz, mas atraves de componenete.

// Services:
import { auth } from '../../services/firebaseConnection';
import { onAuthStateChanged } from 'firebase/auth';

// Estilo:
import './private.scss';


export default function PrivateRouter({ children }){
  const [loading, setLoading] = useState(true);
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    async function checkLogin(){
      onAuthStateChanged(auth, (user) => {
         if(user){
            // se tiver user logado...
            const userDetalhes = {
                uid: user.uid,
                email: user.email,
            };
            // localStorage.detalheUser = JSON.stringify(userDetalhes);
            localStorage.setItem("@detalheUser", JSON.stringify(userDetalhes));

            setLogado(true);
            setLoading(false);
         } else {
            // NÃO está logado...
            localStorage.clear();
            setLogado(false);
            setLoading(false);
         }
      })
    }
    checkLogin();
  }, []);


  // RETORNO DA FUNCTION/COMPONENTE:
  return (
    <>
    {loading ? (
        <h1 className='title-loading'>Carregando...</h1>
    ) : (
        logado ? (
            // retorna o filho, no caso o que está dentro (rota admin) do componente "PrivateRouter"
            children
        ) : (
            // se não estiver logado volta pra tela home
            <Navigate to='/' />
        )
    )}
    </>
  )

//   if(loading) {
//     return <h1>Carregando...</h1>
//   } else if(!logado) {
//     // se não estiver logado volta pra tela home
//     return <Navigate to='/' />
//   } else {
//     // retorna o filho, no caso o que está dentro (rota admin) do componente "PrivateRouter" 
//     return children;
//   }


//   if(loading){
//     return(
//       <div></div>
//     )
//   }
//
//   if(!logado){
//     return <Navigate to="/"/>
//   }
//
//   return children;

}