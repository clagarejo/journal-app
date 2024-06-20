import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { ImageGalery } from "../components/ImageGalery"
import { useForm } from "../../hooks/useForm"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo } from "react"
import { setActiveNote } from "../../store/journal/journalSice"
import { startSaveNote } from "../../store/journal"

import { Helmet, HelmetProvider } from 'react-helmet-async';


import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {

    const dispatch = useDispatch()
    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal)

    const { body, title, date, onInputChange, formState } = useForm(note)

    const dateString = useMemo(() => {

        const newDate = new Date(date)
        return newDate.toUTCString()

    }, [date])

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState]);

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success')
        }
    }, [messageSaved]);

    const onSaveNote = () => {
        dispatch(startSaveNote())
    }

    return (
        <HelmetProvider>
            
            <Helmet>
                <title> {!!note.title ? note.title : 'Nota'} </title>
                <meta name="description" content="Página para gestionar tus notas." />
                <meta name="keywords" content="journal, notas" />
            </Helmet>

            <Grid
                className="animate__animated animate__fadeIn animate__faster"
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1 }}
            >
                <Grid item>
                    <Typography fontSize={39} fontWeight="light">
                        {dateString}
                    </Typography>
                </Grid>

                <Grid item>
                    <Button
                        color="primary"
                        sx={{ padding: 2 }}
                        onClick={onSaveNote}
                        disabled={isSaving}
                    >
                        <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                        Guardar
                    </Button>
                </Grid>

                <Grid container>
                    <TextField
                        type="text"
                        variant="filled"
                        fullWidth
                        label="Titulo"
                        placeholder="Ingrese un titulo"
                        sx={{ border: 'none', mb: 1 }}
                        name="title"
                        value={title}
                        onChange={onInputChange}
                    />

                    <TextField
                        type="text"
                        variant="filled"
                        fullWidth
                        multiline
                        placeholder="¿Qué sucedio hoy?"
                        sx={{ border: 'none', mb: 1 }}
                        minRows={5}
                        name="body"
                        value={body}
                        onChange={onInputChange}
                    />
                </Grid>

                <ImageGalery />

            </Grid>
        </HelmetProvider>
    )
}
