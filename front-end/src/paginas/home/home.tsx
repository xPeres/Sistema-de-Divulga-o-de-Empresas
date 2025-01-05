import './style.css'
import Header from '../header/header'
import Topico2 from './topico2'
import Topico1 from './topico1'
import Recomendados from './recomendados'

import { useState, useEffect, useRef } from 'react'

const Home = () => {

  const [recomendar, setRecomendar] = useState(3)
  const [visibility, setVisibility] = useState<{ [key: number]: boolean }>({})

  const refs = useRef<(HTMLDivElement | null)[]>([])
  
  const thresholds: { [ key:number ]: number } = {
    1: .5, 
    2: 0.4, 
    3: 0.5
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = Number(entry.target.getAttribute('data-id'))
        const customThreshold = thresholds[id] ?? 0.5;
        setVisibility((prev) => ({...prev,[id]: entry.intersectionRatio >= customThreshold}));})
      },

      { 
        threshold: Object.values(thresholds),
      }
    )

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Header onSearch={() => ''} texto={''} />
      <div className='pagina'>
        <div className='espacador'>
          <Recomendados recomendar={recomendar} setRecomendar={setRecomendar}  visibility={visibility} refs={refs}/>
  
          <div className='textosPrincipal'>
            <Topico1 visibility={visibility} refs={refs}/>
            <Topico2 visibility={visibility} refs={refs}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home