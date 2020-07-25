import Api from "../../services/Api";

const TYPES = {
    clearError: 'AUTH/CLEAR_ERROR',

    loginSuccess: 'AUTH/LOGIN_SUCCESS',
    loginFailure: 'AUTH/LOGIN_FAILURE',

    RegisterSuccess: 'AUTH/Register_SUCCESS',
    RegisterFailure: 'AUTH/Register_FAILURE',

    VerifySuccess: 'AUTH/Verify_SUCCESS',
    VerifyFailure: 'AUTH/Verify_FAILURE',

    ResetPasswordSuccess: 'AUTH/ResetPassword_SUCCESS',
    ResetPasswordFailure: 'AUTH/ResetPassword_FAILURE',

    UpdateUserSuccess: 'AUTH/UpdateUser_SUCCESS',
    UpdateUserFailure: 'AUTH/UpdateUser_FAILURE',

    LogoutSuccess: 'AUTH/Logout_SUCCESS',
    LogoutFailure: 'AUTH/Logout_FAILURE',
}

const initialState = {
    user: null,
    error: null,
    sessionToken: null,
    token: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TYPES.clearError:
            return { ...state, error: null }

        case TYPES.loginSuccess:
            return { ...state, ...action.payload }
        case TYPES.loginFailure:
            return { ...state, ...action.error }

        case TYPES.RegisterSuccess:
            return { ...state, ...action.payload }
        case TYPES.RegisterFailure:
            return { ...state, ...action.error }

        case TYPES.VerifySuccess:
            return { ...state, ...action.payload }
        case TYPES.VerifyFailure:
            return { ...state, ...action.error }

        case TYPES.ResetPasswordSuccess:
            return { ...state, ...action.payload }
        case TYPES.ResetPasswordFailure:
            return { ...state, ...action.error }

        case TYPES.UpdateUserSuccess:
            return { ...state, ...action.payload }
        case TYPES.UpdateUserFailure:
            return { ...state, ...action.error }

        case TYPES.LogoutSuccess:
            return initialState
        case TYPES.LogoutFailure:
            return { ...state, ...action.error }

        default:
            return state
    }
}


/**
 * Faz o login do usuario
 */
export const login = ({ username, password }) => async (dispatch) => {
    dispatch({ type: 'AUTH/CLEAR_ERROR' })
    let body = {
        username,
        password
    }
    var promise1 = new Promise(async (resolve, reject) => {
        try {
            let result = await Api.login({ body })

            console.log(result);
            dispatch({
                type: TYPES.loginSuccess,
                payload: {
                    token: { token: result.access_token }
                }
            });
            resolve({
                username,
                password
            })
        } catch (error) {
            dispatch({
                type: TYPES.loginFailure,
                error: error.response.data
            })
            reject(error.response.data)
        }
    });
    return promise1;
}

/**
 * Faz o cadastro do usuario
 */
export const register = ({ username, email, password }) => async (dispatch) => {
    dispatch({ type: 'AUTH/CLEAR_ERROR' })
    let body = {
        username,
        email,
        password
    }
    var promise1 = new Promise(async (resolve, reject) => {
        try {
            let result = await Api.register({ body })
            dispatch({
                type: TYPES.RegisterSuccess,
                payload: {
                    user: {
                        email,
                        password,
                        username
                    }
                }
            })
            resolve({
                email,
                password
            })
        } catch (error) {
            dispatch({
                type: TYPES.RegisterFailure,
                error: { error: error.response.data }
            })
            reject(error.response.data)
        }
    })
    return promise1;
}

/**
 * valida o cadastro do usurio com o back end
 */
export const verify = () => async (dispatch, getState) => {
    dispatch({ type: 'AUTH/CLEAR_ERROR' })

    let { token } = getState().auth
    if (token) {
        var promise1 = new Promise(async (resolve, reject) => {
            try {
                let user = await Api.show(token.token)
                dispatch({
                    type: TYPES.VerifySuccess,
                    payload: {
                        user,
                        token
                    }
                })
                resolve(user)
            } catch (error) {
                dispatch({
                    type: TYPES.VerifyFailure,
                    error: { error }
                })
                reject(error)
            }
        })
        return promise1
    }
}

/**
 * reseta a senha
 */
export const ResetPassword = ({ password }) => async (dispatch) => {
    dispatch({ type: 'AUTH/CLEAR_ERROR' })
    try {
        dispatch({
            type: TYPES.ResetPasswordSuccess,
            payload: {
                user: {
                    password
                }
            }
        })
    } catch (error) {
        dispatch({
            type: TYPES.ResetPasswordFailure,
            error: { error }
        })
    }
}

/**
 * atualiza os dados do user
 */
export const UpdateUser = ({ username, email, image }) => async (dispatch, getState) => {
    dispatch({ type: 'AUTH/CLEAR_ERROR' })

    let { token } = getState().auth
    let form = new FormData();

    form.append('username', username)
    form.append('email', email)
    form.append('image', image)

    var promise1 = new Promise(async (resolve, reject) => {
        try {
            let user = await Api.update(token.token, form)

            dispatch({
                type: TYPES.UpdateUserSuccess,
                payload: {
                    user
                }
            })
            resolve(user)
        } catch (error) {
            dispatch({
                type: TYPES.UpdateUserFailure,
                error: error.response.data
            })
            reject(error.response.data)
        }
    })
    return promise1
}

/**
 * atualiza os dados do user
 */
export const Logout = () => async (dispatch) => {
    dispatch({ type: 'AUTH/CLEAR_ERROR' })

    //let { token } = getState().auth
    var promise1 = new Promise(async (resolve, reject) => {
        try {
            // let user = await Api.update(sessionToken)
            dispatch({
                type: TYPES.LogoutSuccess
            })
            resolve()
        } catch (error) {
            dispatch({
                type: TYPES.LogoutFailure,
                error: { error }
            })
            reject(error)
        }
    })
    return promise1
}

