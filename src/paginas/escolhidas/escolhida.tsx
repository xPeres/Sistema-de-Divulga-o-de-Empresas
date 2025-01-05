import './style.css'
import { useState, useEffect } from 'react';
import Header from '../header/header'
import { useParams } from 'react-router-dom';
import foto from '../../assets/teste.jpeg'
import foto2 from '../../assets/Logo-F.jpg'
import telefone from '../../assets/telefone.png'
import estrela from '../../assets/estrela.png'
import loc from '../../assets/loc.png'
import axios from 'axios';

const Escolhida = () => {
  const { id } = useParams();
  const [slide, setSlide] = useState(1)

  // Pegar fotos Baseado no ID dela
  const fotos = [
    { id: 1, foto: foto },
    { id: 2, foto: foto2 },
  ]

  // Pegar as datas de funcionamento baseado no ID da Loja
  const datas = [
    { dia: "Sábado", hora: null },
    { dia: "Segunda-Feira", hora: "08:00 - 18:00" },
    { dia: "Terça-Feira", hora: "08:00 - 18:00" },
    { dia: "Quarta-Feira", hora: "08:00 - 18:00" },
    { dia: "Quinta-Feira", hora: "08:00 - 18:00" },
    { dia: "Sexta-Feira", hora: "08:00 - 18:00" },
    { dia: "Sábado", hora: null },
  ]

  // Pegar os Produtos baseados no ID da loja
  type Produtos = {
    produto: string,
    valor: number,
    desc: string,
  }

  const formatNumero = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue.replace(/(\d{1})(\d)/, "($1$2) ").replace(/(\d{5})(\d)/, "$1-$2")
  }

  const [produtos,setProdutos] = useState<Produtos[]>([])
  useEffect(() => {
    const fetchLojas = async () => {
      try {
        const response = await axios.post('http://localhost:3000/pegarEmpresa', { id: id });
        const fetchedData = response.data.map((item: any) => ({
          id: item.id,
          nome: item.nome,
          loc: item.loc,
          desc: item.desc,
          avaliacao: item.avaliacoes,
          estrela: item.estrelas,
          logo: item.logo,
          numero: item.numero,
          produtos: Array.isArray(item.produtos) ? item.produtos.map((valor: any) => ({
            titulo: valor.titulo,
            descProduto: valor.descricao,
            valor: valor.valor,
          })) : [],
        }));
        setProdutos(fetchedData);
      } catch (error) {
        console.error('Error fetching recommended stores:', error);
      }
    };

    fetchLojas();
  }, []);

  const prevSlide = () => setSlide((prev: number) => (prev > 1 ? prev - 1 : fotos.length));
  const nextSlide = () => setSlide((prev: number) => (prev < fotos.length ? prev + 1 : 1));
  
  return (
    <>
      <Header onSearch={() => ''} texto={''}/>
      <div className='escolhido'>
        <div className='fotos'>
          <div className='voltar' onClick={prevSlide}></div>
          <div className='proximo' onClick={nextSlide}></div>
          {fotos.slice(slide -1, slide).map((item: any) => (
            <img src={item.foto} alt="" />
          ))}
        </div>

        <div className='dados'>
          {produtos.map((item: any) => (
            <>
              <div className='inicio'>
                <img src={item.logo} alt="" />
                <h1>{item.nome}</h1>
                <h2>{item.desc}</h2>
              </div>

              <div className='metade1'>
                <div className='titulo'>Horário de Atendimento</div>
                <div className='horarios'>
                  {datas.map((valor: any) => (
                    <div className='hora'>
                    <div>{valor.dia}</div> 
                    {valor.hora ? 
                      (<>
                        <div>{valor.hora}</div>
                      </>) 
                      
                      : 
                      
                      (<>
                        <div className='fechado'>Fechado</div>
                      </>)
                    }
                  </div>
                  ))}
                </div>
              </div>

              <div className='metade2'>
                <div className='abas'>
                  <div className='titulo'>Localização</div>
                  <img className='telefone' src={loc} alt="" />
                  <div className='desc'>{item.loc}</div>
                </div>
                <div className='abas'>
                  <div className='titulo'>Contato</div>
                  <img className='telefone' src={telefone} alt="" />
                  <div className='desc2'>{formatNumero(item.numero)}</div>
                </div>
                <div className='abas'>
                  <div className='titulo'>Avaliações</div>
                  <div className='abaava'>
                    <img className='estrela' src={estrela} alt="" />
                    <div className='qtdava'>{item.estrelas}/5</div>
                    <div className='textava'>{item.avaliacao} Avaliações</div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>

        <div className="paginagendamentos">
          <div className='abas'>
            {produtos.map((item: any) => 
              (<>
                <div className='titulo'>{item.Aba}</div>
                {item.produtos.map((valor: any) => 
                  (<>
                    <div className='produto'>
                    <div className='nome'>{valor.titulo}</div>
                    <div className='descp'>{valor.descProduto}</div>
                    <div className='abaagendar'>
                      <div className='valor'>R${valor.valor}</div>
                      <button className='agendar'>Agendar</button>
                    </div>
                  </div>
                  </>)
                )}
                <div className='finalizaraba'></div>
              </>)
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Escolhida