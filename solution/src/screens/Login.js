import React, { useReducer, useState, useRef } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { login } from "reduxItems/ducks/auth";
import { useDispatch } from "react-redux";
import { validate } from "utils";
import Topbar from "components/Topbar";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 300,
            flexDirection: 'row',
            display: 'flex',

        },
    },
}));

const Login = ({ history: { push } }) => {
    let [state, setState] = useReducer((prev, updated) => ({
        ...prev,
        ...updated,
    }), { username: '', password: '' })

    let passwordfield = useRef()

    let [errors, setErrors] = useState([])
    const classes = useStyles();
    let dispatch = useDispatch()

    const _login = async () => {
        setErrors([])
        let renamedFields = {
            username: 'Login',
            password: 'Senha'
        }
        let fields = validate(state, renamedFields);

        if (fields.length != 0) return setErrors(fields)

        try {
            let resutl = await dispatch(login(state))
            // await dispatch(verify())
            push("/dashboard")
        } catch (error) {
            return setErrors([{ "field": "username", "message": "Login incorreto" }, { "field": "password", "message": "Senha Incorreta" }])
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

    let { username, password } = state;
    return (
        <div>
            <Topbar />
            <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', width: '100vw', height: '100vh' }}>

                <form className={classes.root} autoComplete="on"
                    onSubmit={e => { e.preventDefault(); _login() }}
                >
                    <div style={{ width: 300 }}>
                        <TextField
                            id="filled-size-normal"
                            label="Login"
                            variant="filled"
                            value={username}
                            style={{ width: '100%' }}
                            error={_isIncorrect('username')}
                            helperText={_isIncorrectMessage('username')}
                            onChange={e => setState({ username: e.target.value })} />
                    </div>

                    <div style={{ width: 300 }}>
                        <TextField
                            id="filled-basic"
                            label="Senha"
                            variant="filled"
                            type='password'
                            style={{ width: '100%' }}
                            inputRef={passwordfield}
                            value={password}
                            error={_isIncorrect('password')}
                            helperText={_isIncorrectMessage('password')}
                            onChange={e => setState({ password: e.target.value })}
                        />
                    </div>


                    <Button type={'submit'} variant="contained" color="primary">
                        Logar
                </Button>


                </form>
            </div>
        </div>
    )
}

export default Login