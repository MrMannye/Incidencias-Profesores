import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios';
import { FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from '@mui/material'

import GroupIcon from '@mui/icons-material/Group';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { useRouter } from 'next/router';

import NavBar from '@/components/NavBar';

interface Task {
    _id: string,
    mensaje: string,
    nombre_profesor: string,
    grupo: string,
    horario: string,
    dia: string,
    materia: string,
}


function AddTask() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const router = useRouter();
    const [prueba, setPrueba] = useState(false);
    const [dia, setDia] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setDia(event.target.value as string);
    };

    useEffect(() => {
        axios.get(process.env.NEXT_URL_BACKEND! || "https://apptelegram.repl.co/Noe").then(response => {
            console.log(response.data.document);
            setTasks(response.data.document);
            setPrueba(true);
        }).catch(error => {
            console.log(error);
        })
    }, [])


    return (
        <div className=''>
            <Head>
                <title>Añadir nuevo avios</title>
            </Head>
            <div className='flex flex-col items-center justify-center p-4'>
                <div className='flex items-center mb-5 px-2 space-x-6'>
                    <ArrowBackIcon onClick={() => router.back()} className='text-black'></ArrowBackIcon>
                    <h1 className='text-2xl font-semibold px-2'>{tasks[0]?.nombre_profesor}</h1>
                </div>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-materia">Materia</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-materia"
                        className=''
                        // onChange={(e) => user.current = e.target.value}
                        type="text"
                        endAdornment={
                            <InputAdornment position="end">
                                <LibraryBooksIcon className='text-black' />
                            </InputAdornment>
                        }
                        label="Materia"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-grupo">Grupo</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-grupo"
                        className='uppercase'
                        // onChange={(e) => password.current = e.target.value}
                        type="text"
                        endAdornment={
                            <InputAdornment position="end">
                                <GroupIcon className='text-black' />
                            </InputAdornment>
                        }
                        label="Grupo"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    {/* <InputLabel htmlFor="outlined-adornment-horario">Grupo</InputLabel> */}
                    <OutlinedInput
                        id="outlined-adornment-horario"
                        className=''
                        type="time"
                        label="Horario"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-dia">Dia</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={dia}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={"lunes"}>Lunes</MenuItem>
                        <MenuItem value={"martes"}>Martes</MenuItem>
                        <MenuItem value={"miercoles"}>Miercoles</MenuItem>
                        <MenuItem value={"jueves"}>Jueves</MenuItem>
                        <MenuItem value={"viernes"}>Viernes</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <TextField
                        id="outlined-multiline-mensaje"
                        label="Mensaje"
                        multiline
                        rows={4}
                        defaultValue="No podre asistir el dia de hoy"
                        variant="outlined"
                    />
                </FormControl>
                <button onClick={() => console.log("Hola")} className='py-3 px-20 shadow-lg mt-10 border rounded-lg bg-red-700 text-white tracking-wider self-center'>Añadir Aviso</button>
            </div>
            <NavBar></NavBar>
        </div>
    )
}

export default AddTask