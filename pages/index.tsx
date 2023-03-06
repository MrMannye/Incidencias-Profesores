import Head from 'next/head'
import NavBar from '@/components/NavBar'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Skeleton } from '@mui/material';

interface Task {
  _id?: number,
  materia?: string,
  grupo?: string,
  nombre_profesor?: string,
  dia?: string,
  horario?: string,
  mensaje?: string
}

export default function Home() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [prueba, setPrueba] = useState(false);

  useEffect(() => {
    async function getTasks():Promise<Task[]>{
      const response = await axios.get("https://apptelegram.repl.co/");
      console.log(response.data.documents);
      return response.data.documents;
    }
    console.log("Miguel");
    const response = getTasks().then(response => response);
    console.log(response);
  }, [tasks])


  return (
    <div className=''>
      <Head>
        <title>Incidencias Profesores</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='p-4 flex flex-col items-start mb-24'>
        {prueba ? (
          tasks?.map((card) => {
            return (
              <div key={card._id} className="p-4 shadow-lg w-full border">
                <h2 className='font-semibold text-xl'> {card.materia} - {card.grupo}</h2>
                <div className='text-gray-600'>
                  <h4 className='text-lg'>{card.nombre_profesor ? card.nombre_profesor : "Miguel"}</h4>
                  <h5>{card.dia} - {card.horario}</h5>
                  <span className=''>{card.mensaje}</span>
                </div>
              </div>
            )
          })
        ) : (
          [1, 2, 3, 4, 5, 6, 7].map(task => {
            return (
              <Skeleton key={task} variant="rectangular" className='w-full my-3' height={80} />
            )
          })
        )
        }
      </main>
      <NavBar />
    </div>
  )
}
