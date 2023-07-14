// Funcionalidades / Libs:
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';

// Services:

// Estilo Global:
import './styles/global.scss';


export default function App() {
   

  return (
    <BrowserRouter>

      <AppRoutes/>

    </BrowserRouter>
  );
}