import estrela from '../../assets/estrela.png'
import { RefObject, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface RecomendadosProps {
  visibility: { [key: number]: boolean }; 
  refs: RefObject<(HTMLDivElement | null)[]>; 
  recomendar: number;
  setRecomendar: any;
}

const Recomendados: React.FC<RecomendadosProps> = ({ recomendar, setRecomendar, visibility, refs }) => {
  type Recomendado = {
    id: number;
    loja: string;
    local: string;
    estrelas: number;
    avaliacoes: number;
    foto: string;
  };

  const [recomendados, setRecomendados] = useState<Recomendado[]>([]);
  
  //API PUXANDO AS LOJAS RECOMENDADAS
  useEffect(() => {
    const fetchRecomendados = async () => {
      try {
        const response = await axios.post('http://localhost:3000/pegarEmpresas');
        const fetchedData = response.data.map((item: any) => ({
          id: item.id,
          loja: item.nome,
          local: item.loc,
          estrelas: item.estrelas,
          avaliacoes: item.avaliacao,
          foto: item.logo,
        }));
        setRecomendados(fetchedData);
      } catch (error) {
        console.error('Error fetching recommended stores:', error);
      }
    };

    fetchRecomendados();
  }, []);

  const navigate = useNavigate();
  const prevRecomendar = () => setRecomendar((prev: number) => (prev > 3 ? prev - 1 : recomendados.length));
  const nextRecomendar = () => setRecomendar((prev: number) => (prev < recomendados.length ? prev + 1 : 3));

  return (
    <div className={`recomendados`} data-id={1} ref={(el) => { if (refs.current) { (refs.current[1] = el) }}} style={{opacity: visibility[1] ? 1 : 0.0,transition: 'opacity 0.3s',}}>
      <div className='trecomendado'>Nossas recomendações</div>
      <div className='proximo' onClick={nextRecomendar}></div>
      <div className='voltar' onClick={prevRecomendar}></div>
      <div className='abas'>
        {recomendados.slice(recomendar - 3, recomendar).map((item: any) => (
          <div className='cards' onClick={() => navigate('/loja/'+item.id)}>
            <img className='fotoCard' src={item.foto} alt="" />
            <div className='textos'>
              <div className='tituloCard'>{item.loja}</div>
              <div className='descCard'>{item.local}</div>
            </div>
            <div className='avaliacao'>
              <img className='ftEstrela' src={estrela} alt="" />
              <div className='qtdAva'>{item.estrelas}/5</div>
              <div className='textAva'>{item.avaliacoes} avaliações</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recomendados
