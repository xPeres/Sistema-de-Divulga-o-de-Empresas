import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './paginas/home/home'
import Escolhida from './paginas/escolhidas/escolhida';
import Pesquisar from './paginas/pesquisar/pesquisar';
import Agendamentos from './paginas/agendamentos/agendamentos';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/> 
          <Route path="/loja/:id" element={<Escolhida />}/>
          <Route path="/pesquisar" element={<Pesquisar />}/>
          <Route path="/agendamentos/:id" element={<Agendamentos />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App