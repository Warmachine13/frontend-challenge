import React, { useReducer, useState, useRef, useEffect } from "react";
import { TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UpdatePlaceAdm, RegisterPlaceAdm } from "reduxItems/ducks/places";
import { useDispatch } from "react-redux";
import { validate } from "utils";
import BaseComponent from "components/BaseComponent";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
            flexDirection: 'row',
            display: 'flex',

        },
    },
}));

const RegisterPlace = ({ history: { push, location }, match }) => {
    let [stateGlobal, setState] = useReducer((prev, updated) => ({
        ...prev,
        ...updated,
    }), { name: '', slug: '', state: "", city: "", id: null, })

    let [oldFields, setOldState] = useReducer((prev, updated) => ({
        ...prev,
        ...updated,
    }), { name: '', slug: '', state: "", city: "", id: null, })

    let refs = useRef([])

    let [errors, setErrors] = useState([])
    let [error_message, setErrorBack] = useState()
    const classes = useStyles();
    let dispatch = useDispatch();

    useEffect(() => {
        if (match.params.id) {
            setState({ ...location.state.place });
            setOldState({ ...location.state.place });
        }
    }, [])

    const _actionBackend = async () => {
        setErrorBack()
        setErrors([])
        let renamedFields = {
            name: 'name',
            slug: "Slug",
            city: "Cidade",
            state: "Estado"
        }
        let fields = validate(stateGlobal, renamedFields);

        if (fields.length !== 0) return setErrors(fields)

        try {
            if (match.params.id) {
                await dispatch(UpdatePlaceAdm(stateGlobal, oldFields))
                alert("Atualizado com sucesso ")
                push("/")
            } else {
                await dispatch(RegisterPlaceAdm(stateGlobal, oldFields))
                alert("Cadastado com sucesso ")
                push("/")
            }
        } catch (error) {
            console.log(error)
            return setErrorBack(error.response.data.error_message)

        }
    }

    /**
     * Valida se o campo esta correto 
     * @param {} field 
     */
    const _isIncorrect = (field) => errors.some(v => v.field == field);

    /**
   * Valida se o campo esta correto e devolve a mensagem de erro
   * @param {} field 
   */
    const _isIncorrectMessage = (field) => errors.some(v => v.field == field) && errors.find(v => v.field == field).message

    let { name, slug, state, city } = stateGlobal;
    return (
        <BaseComponent>
            <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', width: '100%', height: '100vh' }}>
                <form className={classes.root} autoComplete="on"
                    onSubmit={e => { e.preventDefault(); _actionBackend() }}>

                    <h1>{match.params.id ? "Editar" : "Cadastar"} Localização</h1>

                    <div>

                        <TextField
                            id="filled-basic"
                            label="Nome"
                            style={{ width: '100%' }}
                            variant="filled"
                            type='name'
                            onSubmit={e => refs.current[0].focus()}
                            value={name}
                            error={_isIncorrect('name') || error_message}
                            helperText={_isIncorrectMessage('name')}
                            onChange={e => setState({ name: e.target.value })}
                        />
                    </div>
                    <div>

                        <TextField
                            id="filled-basic"
                            label="Slug"
                            variant="filled"
                            type='slug'
                            style={{ width: '100%' }}
                            inputRef={el => refs.current[0] = el}
                            // onSubmit={e => refs.current.focus()}
                            value={slug}
                            error={_isIncorrect('slug') || error_message}
                            helperText={_isIncorrectMessage('slug')}
                            onChange={e => setState({ slug: e.target.value })}
                        />
                    </div>
                    <div>

                        <TextField
                            id="filled-basic"
                            label="Estado"
                            variant="filled"
                            type='state'
                            style={{ width: '100%' }}
                            onSubmit={e => refs.current.focus()}
                            value={state}
                            error={_isIncorrect('state') || error_message}
                            helperText={_isIncorrectMessage('state')}
                            onChange={e => setState({ state: e.target.value })}
                        />
                    </div>
                    <div>

                        <TextField
                            id="filled-basic"
                            label="Cidade"
                            variant="filled"
                            type='name'
                            style={{ width: '100%' }}
                            onSubmit={e => refs.current.focus()}
                            value={city}
                            error={_isIncorrect('city') || error_message}
                            helperText={_isIncorrectMessage('city')}
                            onChange={e => setState({ city: e.target.value })}
                        />
                    </div>

                    {
                        error_message && <Typography>{error_message}</Typography>
                    }


                    <Button type={'submit'} variant="contained" color="primary">
                        {match.params.id ? "Atualizar" : "Cadastar"}
                    </Button>
                </form>
            </div>
        </BaseComponent>
    )
}

export default RegisterPlace