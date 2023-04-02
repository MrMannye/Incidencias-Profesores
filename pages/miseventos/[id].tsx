import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios';
import { Skeleton } from '@mui/material'

import GroupIcon from '@mui/icons-material/Group';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';

import NavBar from '@/components/NavBar';
import InterestBar from '@/components/InterestBar';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface Event {
    Id: number,
    name_evento?: string,
    organizador?: string,
    descripcion_evento?: string,
    fecha_evento: Date,
}


function MiEvento(props: {}) {

    const [evento, setEvento] = useState<Event>();
    const [miseventos, setMiseventos] = useState<Event[]>([])
    const [interesados, setInteresados] = useState(0);
    const router = useRouter();
    const idEvento = router.query.id;
    const [prueba, setPrueba] = useState(false);
    const IdUser = useSelector((state: RootState) => state.user.Id);

    useEffect(() => {
        axios.get("https://proactiveweek-superbrandon2018.b4a.run/events/" + idEvento).then(response => {
            console.log(response.data.body[0]);
            setEvento(response.data.body[0]);
            setPrueba(true);
        }).catch(error => {
            console.log(error);
        })
        axios.post("https://proactiveweek-superbrandon2018.b4a.run/events/miseventos", {
            id: IdUser
        }).then(response => {
            console.log(response.data.body);
            setMiseventos(response.data.body);
        }).catch(error => {
            console.log(error);
        })
        axios.get("https://proactiveweek-superbrandon2018.b4a.run/events/eventosInteresados/" + idEvento).then(response => {
            console.log(response.data.body[0]);
            setInteresados(response.data.body[0].Interesados);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const handleDeleteEventUser = () => {
        axios.post("https://proactiveweek-superbrandon2018.b4a.run/events/deletEventUser", {
            Id_Evento: idEvento,
            Id_Usuario: IdUser
        }).then(response => {
            alert(response.data);
            console.log(response.data.body);
            router.back();
        }).catch(error => {
            console.log(error);
        })
    }

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
                    <div className='flex items-center mt-4 space-x-2'>
                        <GroupIcon className='text-orange-400'/>
                        <span className='font-semibold'>{interesados && `${interesados} estudiantes registrados`}</span>
                    </div>
                    <InterestBar id={evento?.Id} />
                    <h1 className='login'></h1>
                    <button onClick={() => handleDeleteEventUser()} className='py-3 self-center px-20 shadow-lg mt-8 border rounded-lg bg-orange-500 text-white tracking-wider disabled:opacity-50'>Eliminar Evento</button>
                </div>
                : (
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

export default MiEvento