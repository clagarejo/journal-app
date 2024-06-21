import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";

import { ImageGalery } from "../components/ImageGalery";

import { setActiveNote } from "../../store/journal/journalSice";
import { startDeletingNote, startSaveNote, startUploadingFile } from "../../store/journal";

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {

    const dispatch = useDispatch();
    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);

    const { body, title, date, onInputChange, formState } = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    const fileInputRef = useRef();

    const [isSavedClicked, setIsSavedClicked] = useState(false);

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState, dispatch]);

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    }, [messageSaved]);

    const onSaveNote = () => {
        setIsSavedClicked(true);
        dispatch(startSaveNote());
    };

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;
        dispatch(startUploadingFile(target.files));
    };

    const onDelete = () => {
        dispatch(startDeletingNote());
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>{isSavedClicked && note.title ? `Nota | ${note.title}` : 'Nota'}</title>
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

                    <input type="file"
                        multiple
                        ref={fileInputRef}
                        onChange={onFileInputChange}
                        style={{ display: 'none' }}
                    />

                    <IconButton
                        color="primary"
                        disabled={isSaving}
                        onClick={() => fileInputRef.current.click()}
                    >
                        <UploadOutlined />
                    </IconButton>

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
                        placeholder="¿Qué sucedió en el día de hoy?"
                        minRows={5}
                        name="body"
                        value={body}
                        onChange={onInputChange}
                    />
                </Grid>

                <Grid container justifyContent='end'>
                    <Button
                        onClick={onDelete}
                        sx={{ mt: 2 }}
                        color="error"
                    >
                        <DeleteOutline />
                        Borrar
                    </Button>
                </Grid>

                <ImageGalery images={note.imageUrls} />

            </Grid>
        </HelmetProvider>
    )
}
