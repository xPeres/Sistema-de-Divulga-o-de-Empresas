import './style.css';
import Header from '../header/header';
import { InicioContext } from '../conta/inicio'
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import relogio from '../../assets/relogio.png'
import cash from '../../assets/cash.png'
import info from '../../assets/info.png'
import axios from 'axios';

type Agendar = {
  loja: string,
  horario: string,
  valor: number,
  foto: string,
  id: number
}

const Agendamentos = () => {
  const { id } = useParams();
  const [agendamentos,setAgendamentos] = useState<Agendar[]>([])

  const navigate = useNavigate()
  const inicioContext = useContext(InicioContext);
  if (!inicioContext) {
    throw new Error("Outro Componente deve estar dentro de um InicioProvider");
  }

  const { userData } = inicioContext;
  const logado = userData

  useEffect(() => {
    if (logado.conta) {
      navigate('/')
    } else {
      const fetchLojas = async () => {
        try {
          const response = await axios.post('http://localhost:3000/pegarAgendamentos', { id: id });
          const fetchedData = response.data.map((item: any) => ({
            aba: Array.isArray(item.aba) ? item.aba.map((valor: any) => ({
              nomeAba: valor.nome,
              id: valor.id,
              loja: valor.loja,
              horario: valor.horario,
              valor: valor.valor,
              foto: valor.foto,
            })) : [],
          }));
          setAgendamentos(fetchedData);
        } catch (error) {
          console.error('Error fetching recommended stores:', error);
        }
      };
  
      fetchLojas();
    }
  }, []); 

  const cancelarAgendamento = async (id: number) => {
    // API PARA CANCELAR
    console.log(id)
    await axios.post('http://localhost:3000/cancelarAgendamento', { id: id });
  }

  const visualizarAgendamento = (id: number) => {
    console.log(id)
    // API PARA VER E CRIAR ABA DE MOSTRAR
  }

  const groupByAba = (abas: any[]) => {
    return abas.reduce((acc: Record<string, any[]>, item) => {
      if (!acc[item.nomeAba]) {
        acc[item.nomeAba] = [];
      }
      acc[item.nomeAba].push(item);
      return acc;
    }, {});
  };

  return (
    <>
      <Header onSearch={() => ''} texto={''} />
      <div className='paginaA'>
        <div className='cardsAgendamento'>
          {agendamentos.map((item: any) => {
            const groupedAbas = groupByAba(item.aba);

            return (
              <>
                {Object.entries(groupedAbas).map(([nomeAba, itens]) => (
                  <>
                    <h1>{nomeAba}</h1>
                    {itens.map((valor: any) =>
                      <div className="subCardsAgendamento">
                      <img src={valor.foto} alt="Foto da loja" />
                      <div className="titulo">{valor.loja}</div>
                      <div className="horario">
                        <img src={relogio} alt="Horário" />
                        <div className="desc">{valor.horario}</div>
                      </div>
                      <div className="valor">
                        <img src={cash} alt="Valor" />
                        <div className="desc">R${valor.valor}</div>
                      </div>
                      {nomeAba == "Cancelados" ? 
                      
                      <></> 
                      
                      : nomeAba == "Concluidos" ? 
                      
                        <div className="cancelar">
                          <div className='img2'></div>
                          <div className="desc" onClick={() => cancelarAgendamento(valor.id)}>
                            Clique para reagendar
                          </div>
                        </div>
                      
                      :
                        <div className="cancelar">
                          <div className='img'></div>
                          <div className="desc" onClick={() => cancelarAgendamento(valor.id)}>
                            Clique para cancelar
                          </div>
                        </div>
                      }
                      <div className="info">
                        <img src={info} alt="Mais informações" />
                        <div className="desc" onClick={() => visualizarAgendamento(valor.id)}>
                          Clique para visualizar mais
                        </div>
                      </div>
                    </div>
                    )}
                  </>
                ))}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Agendamentos;