import celular from '../../assets/celular.png'
import { RefObject } from 'react';

interface Topico1Props {
  visibility: { [key: number]: boolean }; 
  refs: RefObject<(HTMLDivElement | null)[]>; 
}

const Topico1: React.FC<Topico1Props> = ({ visibility, refs }) => {
  return (
    <div className='abasTextos' data-id={2} ref={(el) => { if (refs.current) { refs.current[2] = el;} }} style={{ opacity: visibility[2] ? 1 : 0.0, transition: 'opacity 0.3s',}} >
      <div className='tituloTextos'>Por que nos escolher?</div>
      <div className='descTextos'>
        Nosso sistema foi desenvolvido para oferecer praticidade e eficiência, tanto para você quanto para seus clientes, facilitando o agendamento de serviços. Confira abaixo algumas das funcionalidades que fazem a diferença: <br /> <br />

        (1)・ Praticidade ao Criar Serviços: Em apenas 2 minutos, você pode cadastrar seus serviços de forma rápida e intuitiva. <br />

        (2)・ Facilidade no Agendamento para o Cliente: Com apenas 5 cliques, seus clientes conseguem agendar o serviço desejado de maneira simples e eficiente. <br />

        (3)・ Sistema de Notificações: Tanto sua loja quanto seus clientes recebem notificações automáticas sobre os agendamentos, garantindo organização e pontualidade. <br />

        (4)・ Sistema de Localização Inteligente: Sua loja é recomendada para pessoas próximas, aumentando a visibilidade e atraindo novos clientes. <br />

        (5)・ Sistema Ágil de Feedback: Receba avaliações rápidas e detalhadas, ajudando a aprimorar seus serviços e construir confiança com sua clientela. <br />

        (6)・ Sistema de Recomendações Baseado em Avaliações: Quanto mais avaliações positivas você recebe, maiores as chances de sua loja ser recomendada a novos clientes. <br /> <br />
        Aproveite todas essas funções para proporcionar uma experiência incrível e tornar sua gestão ainda mais eficiente!
      </div>
      <div className='abaFotinhas'>
        <img className='fotinhas' src={celular} alt="" />
      </div>
    </div>
  );
};

export default Topico1