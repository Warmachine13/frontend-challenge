import Api from "services/Api";


const TYPES = {
    clearError: 'Places/CLEAR_ERROR',

    FetchPlacesuccess: 'Places/FetchPlace_SUCCESS',
    FetchPlaceFailure: 'Places/FetchPlace_FAILURE',

    ShowPlacesuccess: 'Places/ShowPlace_SUCCESS',
    ShowPlaceFailure: 'Places/ShowPlace_FAILURE',

    UpdatePlaceAdmSuccess: 'Places/UpdatePlace_Adm_SUCCESS',
    UpdatePlaceAdmFailure: 'Places/UpdatePlace_Adm_FAILURE',
}

const initialState = {
    error: null,
    Places: []
}


const PlacesReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.clearError:
            return Object.assign(state, { error: null })

        case TYPES.FetchPlacesuccess:
            return { ...state, ...action.payload }
        case TYPES.FetchPlaceFailure:
            return { ...state, ...action.error }

        case TYPES.ShowPlacesuccess:
            return { ...state, ...action.payload }
        case TYPES.ShowPlaceFailure:
            return { ...state, ...action.error }

        case TYPES.UpdatePlaceAdmSuccess:
            return { ...state, ...action.payload }
        case TYPES.UpdatePlaceAdmFailure:
            return { ...state, ...action.error }

        default:
            return state
    }
}

export default PlacesReducer;

/**
 * Pega todos os usuarios do sistema
 */
export const fetchPlaces = (search, type) => async (dispatch, getState) => {
    dispatch({ type: 'AUTH/CLEAR_ERROR' })
    //console.log(page = 1, rowsPerPage = 10, search)

    let { token } = getState().auth
    console.log(search)
    if (token) {
        var promise1 = new Promise(async (resolve, reject) => {
            try {
                let result;
                if (search)
                    result = await Api.fetchPlacesSearch(token.token, search, type)
                else
                    result = await Api.fetchPlaces(token.token, search)
                let Places = []
                console.log(result)
                console.log(type)
                if (type !== 'slug') {
                    Places = result.places.map(({ id, name, state, city, slug, created_at, updated_at }) => {
                        return {
                            id,
                            name,
                            state,
                            city,
                            slug,
                            created_at: new Date(created_at).toLocaleString("pt-br"),
                            updated_at: new Date(updated_at).toLocaleString("pt-br")
                        }
                    })
                } else {
                    if (result.place !== undefined)
                        Places = [result.place]
                }

                dispatch({
                    type: TYPES.FetchPlacesuccess,
                    payload: {
                        Places
                    }
                });
                resolve(result)
            } catch (error) {
                dispatch({
                    type: TYPES.FetchPlaceFailure,
                    error: { error }
                })
                reject(error)
            }
        });
    }
    return promise1;
}

/**
 * Pegar dados de um usuario
 */

export const Placeshow = (id) => async (dispatch, getState) => {
    dispatch({ type: 'AUTH/CLEAR_ERROR' })

    let { token } = getState().auth
    var promise1 = new Promise(async (resolve, reject) => {
        try {
            let Place = await Api.showPlace(token.token, id)
            dispatch({
                type: TYPES.ShowPlacesuccess,
                payload: {
                    showNewPlace: Place
                }
            })
            resolve()
        } catch (error) {
            dispatch({
                type: TYPES.ShowPlaceFailure,
                error: { error }
            })
            reject(error)
        }
    })
    return promise1
}

/**
 * atualiza os dados de Place sendo adm
 */
export const UpdatePlaceAdm = (state, oldFields) => async (dispatch, getState) => {
    dispatch({ type: 'AUTH/CLEAR_ERROR' })
    let itensDiferentes = {}

    Object.keys(state).map(v => {
        if (state[v] !== oldFields[v])
            itensDiferentes[v] = {
                current_value: oldFields[v],
                new_value: state[v]
            }
    })

    let data = {
        id: state.id,
        "fields": itensDiferentes
    }

    let { token } = getState().auth
    var promise1 = new Promise(async (resolve, reject) => {
        try {
            let Place = await Api.updateplaces(token.token, data)
            dispatch({
                type: TYPES.UpdatePlaceAdmSuccess,
                payload: {
                    Place
                }
            })
            resolve(Place)
        } catch (error) {
            dispatch({
                type: TYPES.UpdatePlaceAdmFailure,
                error: { error }
            })
            reject(error)
        }
    })
    return promise1
}


/**
 * atualiza os dados de Place sendo adm
 */
export const RegisterPlaceAdm = (state) => async (dispatch, getState) => {
    dispatch({ type: 'AUTH/CLEAR_ERROR' })


    let { token } = getState().auth
    var promise1 = new Promise(async (resolve, reject) => {
        try {
            let Place = await Api.registerplaces(token.token, state)
            dispatch({
                type: TYPES.UpdatePlaceAdmSuccess,
                payload: {
                    Place
                }
            })
            resolve(Place)
        } catch (error) {
            dispatch({
                type: TYPES.UpdatePlaceAdmFailure,
                error: { error }
            })
            reject(error)
        }
    })
    return promise1
}
