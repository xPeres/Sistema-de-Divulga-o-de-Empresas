import './style.css';
import Header from '../header/header';
import { InicioContext } from '../conta/inicio'
import { VisualizarContext } from '../visualizar/visualizar';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import relogio from '../../assets/relogio.png'
import cash from '../../assets/cash.png'
import info from '../../assets/info.png'
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Agendar = {
  loja: string,
  dia: string,
  horario: string,
  valor: number,
  foto: string,
  id: number
}

const Agendamentos = () => {
  const { id } = useParams();
  const [reload, setReload] = useState(false);
  const [agendamentos,setAgendamentos] = useState<Agendar[]>([])
  const [activeReagendamentoId, setActiveReagendamentoId] = useState<number | null>(null);
  
  const navigate = useNavigate()
  const inicioContext = useContext(InicioContext);
  if (!inicioContext) {
    throw new Error("Outro Componente deve estar dentro de um InicioProvider");
  }

  const visualizarContext = useContext(VisualizarContext);
  if (!visualizarContext) {
    throw new Error("Outro Componente deve estar dentro de um InicioProvider");
  }

  const { showVisualizar } = visualizarContext
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
              dia: valor.dia,
              horario: valor.horario,
              valor: valor.valor,
              foto: valor.foto,
              produtos: valor.produtos
            })) : [],
          }));
          setAgendamentos(fetchedData);
        } catch (error) {
          console.error('Error fetching recommended stores:', error);
        }
      };
  
      fetchLojas();
    }
  }, [logado,navigate,reload]); 

  const cancelarAgendamento = async (id: number) => {
    await axios.post('http://localhost:3000/cancelarAgendamento', { id: id });
    setReload(!reload)
  }

  const formatDateToDDMMYYYY = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear(); // Pega o ano
  
    return `${day}/${month}/${year}`; 
  };
  

  const reagendarAgendamento = async (id: number, date: any) => {
    if (!date) {
      alert("Por favor, selecione uma data.");
      return;
    }

    const formattedDate = formatDateToDDMMYYYY(date) 

    try {
      await axios.post("http://localhost:3000/reagendarAgendamento", { id, data: formattedDate });
      setReload(!reload);
      setActiveReagendamentoId(0)
    } catch (error) {
      console.error("Erro ao reagendar:", error);
      alert("Erro ao reagendar. Tente novamente.");
    }
  };

  const visualizarAgendamento = (valores: any) => {
    showVisualizar(valores)
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

  const abaPriority = ['Próximos Agendamentos', 'Cancelados', 'Concluídos'];

  return (
    <>
      <Header onSearch={() => ''} texto={''} />
      <div className='paginaA'>
        <div className='cardsAgendamento'>
          {agendamentos.map((item: any) => {
            const groupedAbas = groupByAba(item.aba);

            const orderedAbas = Object.entries(groupedAbas).sort(
              ([nomeAbaA], [nomeAbaB]) =>
                abaPriority.indexOf(nomeAbaA) - abaPriority.indexOf(nomeAbaB)
            );

            return (
              <>
                {orderedAbas.map(([nomeAba, itens]) => (
                  <>
                    <h1>{nomeAba}</h1>
                    {itens.map((valor: any) =>
                      <div className="subCardsAgendamento">
                      <img src={valor.foto} alt="Foto da loja" />
                      <div className="titulo">{valor.loja}</div>
                      <div className="horario">
                        <img src={relogio} alt="Horário" />
                        <div className="desc">{valor.dia} - {valor.horario}</div>
                      </div>
                      <div className="valor">
                        <img src={cash} alt="Valor" />
                        <div className="desc">R${valor.valor}</div>
                      </div>

                      {nomeAba == "Cancelados" ? 
                      
                      <></> 
                      
                      : nomeAba == "Concluídos" ? 
                        
                      <div className="cancelar">
                        {activeReagendamentoId === valor.id ? (
                          <>
                            <div className='img2'></div>
                            <DatePicker className='data'
                              onChange={(date) =>  reagendarAgendamento(valor.id, date)}
                              dateFormat="dd/MM/yyyy"
                            />
                          </>
                        ) : (
                          <>
                            <div className='img2'></div>
                            <div className="desc"onClick={() => setActiveReagendamentoId(valor.id)}>
                              Clique para reagendar
                            </div>
                          </>
                        )}
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
                        <div className="desc" onClick={() => visualizarAgendamento(valor.produtos)}>
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