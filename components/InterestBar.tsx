import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next';

interface Interest{
  Id: number
  Id_Evento: number,
  Id_Interes: number,
  name_evento: string,
  descripcion_evento: string,
  fecha_evento: Date, 
  Tipo: string
}

function InterestBar({id}:any) {
  
  const [interests, setinterests] = useState<Interest[]>([]);
  const intereses = {
    "Programacion": "💻",
    "Escritura": "📝",
    "Lectura": "📖",
    "Artes Visuales":"👀",
    "Deportes":"🏀",
    "Aire Libre":"🍃",
    "Artes Marciales":"🥊"
  }
  

  useEffect(() => {
    axios.get(`https://proactiveweek-superbrandon2018.b4a.run/events/interest/${id!}`)
      .then(response => {
        setinterests(response.data.body)
      }).catch(error => {
        console.log(error);
      })
  }, [])
  
  
  return (
    <div className='flex items-center space-x-2 mt-4'>
        {interests?.map(interest => {
          return(
            <div className='p-2 cursor-default bg-slate-50 bg-opacity-40 text-xs rounded-full flex items-center space-x-1' key={interest.Id}> 
              <span>{intereses[(interest.Tipo) as keyof typeof intereses]}</span>
              <span>{interest.Tipo}</span>
            </div>
          )
        })}
    </div>
  )
}

export default InterestBar

export async function getServerSideProps(context:GetServerSidePropsContext) {
  console.log(context.query) 
  return {
      props: { 
         id: context.query.id //pass it to the page props
      }
  }
}