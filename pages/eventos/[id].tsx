import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios';
import { FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Skeleton, TextField } from '@mui/material'

import GroupIcon from '@mui/icons-material/Group';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { useRouter } from 'next/router';

import NavBar from '@/components/NavBar';
import InterestBar from '@/components/InterestBar';

interface Event {
    Id: number,
    name_evento?: string,
    organizador?: string,
    descripcion_evento?: string,
    fecha_evento: Date,
}


function AddTask(props: {}) {

    const [evento, setEvento] = useState<Event>();
    const router = useRouter();
    const idEvento = router.query.id;
    const [prueba, setPrueba] = useState(false);

    useEffect(() => {
        axios.get("https://proactiveweek-superbrandon2018.b4a.run/events/" + idEvento).then(response => {
            console.log(response.data.body[0]);
            setEvento(response.data.body[0]);
            setPrueba(true);
        }).catch(error => {
            console.log(error);
        })
    }, [])


    return (
        <div className=''>
            <Head>
                <title>Evento</title>
            </Head>
            {prueba ?
                <div className='flex flex-col items-start justify-center p-6'>
                    <div className='flex items-center mb-5 space-x-3'>
                        <ArrowBackIcon onClick={() => router.back()} className='text-black' />
                        <h1 className='text-2xl font-semibold px-2'>Evento</h1>
                    </div>
                    <h1 className='text-2xl font-semibold mb-4'>{evento?.name_evento}</h1>
                    <div className='flex items-end space-x-2'>
                        <h3 className='font-semibold text-sm'>Organizador:</h3>
                        <span className='text-sm'>{evento?.organizador}</span>
                    </div>
                    <div className='flex items-end space-x-2'>
                        <h3 className='font-semibold text-sm'>Fecha:</h3>
                        <span className='text-sm'>{new Date(evento?.fecha_evento || "").toLocaleDateString('es-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</span>
                    </div>
                    <div className='mt-4'>
                        <span className='text-sm'>{evento?.descripcion_evento}</span>
                    </div>
                    <InterestBar id={evento?.Id} />
                    <h1 className='login'></h1>
                    <button onClick={() => console.log("Hola")} className='py-3 self-center px-20 shadow-lg mt-8 border rounded-lg bg-orange-500 text-white tracking-wider'>Añadir Evento</button>
                </div>
                :(
                    [1, 2, 3, 4, 5, 6, 7].map(task => {
                      return (
                        <Skeleton key={task} variant="rectangular" className='w-full my-3' height={80} />
                      )
                    })
                  )
            }

            <NavBar></NavBar>
        </div>
    )
}

export default AddTask