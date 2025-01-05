import './style.css'
import { useContext, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

import logo from '../../assets/Logo-S.png'
import boost from '../../assets/booster.png'
import conta from '../../assets/conta.png'
import { InicioContext } from '../conta/inicio'

interface HeaderProps {
  onSearch: any;
  texto: string;
}

const Header = ({ onSearch, texto }: HeaderProps) => {
  const location = useLocation();
  const [pesquisa, setPesquisa] = useState('')
  const navigate = useNavigate()

  const inicioContext = useContext(InicioContext);
  if (!inicioContext) {
    throw new Error("Outro Componente deve estar dentro de um InicioProvider");
  }

  const { showInicio, userData } = inicioContext;
  const logado = userData
  useEffect(() => {
    if (texto) {
      setPesquisa(texto);
      onSearch(texto);
    } else {
      setPesquisa('');
    }
  }, [texto]);
  
  return (  
    <>
      <header>
        <img className='logo' src={logo} alt="" />

        <div className='links'>
          <Link to="/" className={location.pathname === '/' ? 'active-link' : 'link-style'}>Inicio</Link>
          <Link to="/pesquisar" className={location.pathname === '/pesquisar' ? 'active-link' : 'link-style'}>Serviços</Link>
          <Link to="/agendamentos" className={location.pathname === '/agendamentos' ? 'active-link' : 'link-style'}>Agendamentos</Link>
        </div>

        <div className='barraPesquisa'>
          <input type="text" value={pesquisa} onKeyDown={(e) => e.key === 'Enter' ? navigate('/pesquisar', { state: { pesquisa } }) : '' } onChange={(e) => { if (location.pathname === '/pesquisar') { onSearch(e.target.value) } setPesquisa(e.target.value)}} />
        </div>

        {logado.conta ? 
          (<>
            <div className='contaUsuario'>
              <img className='usuarioFT' src={logado.foto} alt="" />
              <div className='infosUsuario'>
                <div className='nomeUsuario'>{logado.nome}</div>
                <div className='funcaoUsuario'>{logado.cargo}</div>
              </div>
            </div>
          </>) 
          
          : 
          
          (<>
            <div className='btnConta'>
              <img className='iconeConta' src={conta} alt="" />
              <div className='infosUsuario' onClick={() => showInicio('Mostrar')}>
                <div className='nomeUsuario'>Login/Criar</div>
                <div className='funcaoUsuario'>Acesse ou crie sua conta</div>
              </div>
            </div>
          </>)
        }

        <div className='anunciar'>
          <div className='btn'>
            <img src={boost} alt="" />
            <div className='txt'>Cresça sua Empresa</div>
          </div>
        </div>
      </header>
    </>
  )
};

export default Header