import './style.css'
import { createContext, useState, ReactNode } from "react";

interface visualizarContextProps {
  message: any;
  showVisualizar: (msg: string) => void;
}

interface visualizarProviderProps {
  children: ReactNode;
}

interface Service {
  titulo: string;
  valor: number;
}

export const VisualizarContext = createContext<visualizarContextProps  | undefined>(undefined);
export const VisualizarProvider = ({ children }: visualizarProviderProps) => { 
  const [message, setMessage] = useState<Service[]>([]);
  const showVisualizar = (msg: any) => {
    setMessage(msg)
  }

  if (Array.isArray(message) && message.length > 0) {
    return (
      <VisualizarContext.Provider value={{ message, showVisualizar }}>
        {children} {message && 
          <div className='visuAgendamentos'>
            <div className='fechar' onClick={() => setMessage([])}></div>
            <table className='abaage'>
              <thead>
                <tr>
                  <th>Serviços</th>
                  <th>Valores</th>
                </tr>
              </thead>
              <tbody>
                {message.map((item: any) => (
                  <>
                    <tr>
                      <td>{item.titulo}</td>
                      <td>R${item.valor}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        }
      </VisualizarContext.Provider>
    )
  } else {
    return (
      <VisualizarContext.Provider value={{ message, showVisualizar }}>
        {children} {message && 
          <></>
        }
      </VisualizarContext.Provider>
    )
  }
}

export default VisualizarProvider