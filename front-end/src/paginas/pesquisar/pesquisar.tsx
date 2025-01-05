import './style.css'
import Header from '../header/header';
import loc from '../../assets/loc.png'
import estrela from '../../assets/estrela.png'
import { useRef, useState, useEffect } from 'react';

import { barra } from './barra';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Pesquisar = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const navigate = useNavigate()

  const location = useLocation()
  const pesquisa = location.state?.pesquisa;

  type Loja = {
    id: number,
    logo: string,
    nome: string,
    desc: string,
    loc: string,
    avaliacao: number,
    produtos: any,
  }

  const [Lojas, setLojas] = useState<Loja[]>([]);
  //API PUXANDO AS LOJAS
  useEffect(() => {
    const fetchLojas = async () => {
      try {
        const response = await axios.post('http://104.234.65.129:3000/pegarEmpresas');
        const fetchedData = response.data.map((item: any) => ({
          id: item.id,
          nome: item.nome,
          loc: item.loc,
          desc: item.desc,
          avaliacao: item.estrelas,
          logo: item.logo,
          produtos: Array.isArray(item.produtos) ? item.produtos.map((valor: any) => ({
            titulo: valor.titulo,
            descProduto: valor.descricao,
            valor: valor.valor,
          })) : [],
        }));
        setLojas(fetchedData);
      } catch (error) {
        console.error('Error fetching recommended stores:', error);
      }
    };

    fetchLojas();
  }, []);

  const handleSearch = (texto: any) => {
    barra(texto, Lojas, tableRef.current);
  };

  return (
    <>
      <Header onSearch={handleSearch} texto={pesquisa} />
      <div className='paginaPesquisar' ref={tableRef}>
        {Lojas.map((item) => (
          <>
            <div className='cards' onClick={() => navigate('/loja/'+item.id)}>
              <img src={item.logo} alt="" />
              <h1>{item.nome}</h1>
              <h2>{item.desc}</h2>
              <div className='endereco'>
                <img src={loc} alt="" />
                <div className='rua'>{item.loc}</div>
              </div>
              <div className='ava'>
                <img src={estrela} alt="" />
                <div className='text'>{item.avaliacao}/5</div>
              </div>

              <div className='itens'>
                {item.produtos.map((valor: any) => (
                  <>
                    <div className='produtos'>
                      <div className='titulo'>{valor.titulo}</div>
                      <div className='descpro'>{valor.descProduto}</div>
                      <div className='informar'>
                        <div className='valor'>R${valor.valor}</div>
                        <button className='agendar'>Agendar</button>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  )
};

export default Pesquisar
