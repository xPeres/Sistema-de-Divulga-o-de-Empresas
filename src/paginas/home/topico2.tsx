import avaliar from '../../assets/avaliar.png'
import { RefObject } from 'react';

interface Topico2Props {
  visibility: { [key: number]: boolean }; 
  refs: RefObject<(HTMLDivElement | null)[]>; 
}

const Topico2: React.FC<Topico2Props> = ({ visibility, refs }) => {
  return (
    <div className='abasTextos' data-id={3} ref={(el) => { if (refs.current) { refs.current[3] = el; } }} style={{ opacity: visibility[3] ? 1 : 0.0, transition: 'opacity 0.3s', }}>
      <div className='tituloTextos dois'>Facilidade na avaliação</div>
      <div className='descTextos dois'>
      Com o nosso sistema de avaliação, seus clientes terão a oportunidade de compartilhar suas experiências de forma prática e detalhada após a confirmação do serviço realizado. Eles poderão avaliar seus serviços utilizando uma escala de 1 a 5 estrelas em tópicos específicos, tornando o processo ágil e intuitivo. <br /> <br />Além disso, o cliente terá a opção de deixar um feedback personalizado, explicando o motivo de sua avaliação. Esse texto será exibido na aba de avaliações da sua loja, permitindo que outros clientes conheçam a qualidade do seu trabalho. <br /> <br />As avaliações também influenciarão o status da sua loja, refletindo o desempenho e a satisfação dos seus clientes. Esse sistema não apenas destaca o compromisso com a qualidade, mas também promove confiança e transparência, contribuindo para o crescimento do seu negócio.
      </div>
      <div className='abaFotinhas tres'>
        <img className='fotinhas' src={avaliar} alt="" />
      </div>
    </div>
  );
};

export default Topico2