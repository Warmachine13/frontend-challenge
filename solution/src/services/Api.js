
import axios from 'axios';

const url = {
    dev: 'https://pland-api.herokuapp.com/',
    release: 'https://colocar api final'
}


class Api {
    api = axios.create({ baseURL: url.dev })


    /**
     * 
     * Auth
     */

    // Faz o login do user
    async login({ body }) {
        const result = await this.api.post(`/auth`, body)
        return result.data
    }

    // Faz o cadastro do user
    async register({ body }) {
        const result = await this.api.post(`/register`, body)
        return result.data
    }

    // Pegar dados do user
    async show(token) {
        const headers = { Authorization: `JWT ${token}` }
        const result = await this.api.get(`/show`, { params: {}, headers })
        return result.data
    }

    // Logout do user
    async logout(token) {
        const headers = { Authorization: `JWT ${token}` }
        const result = await this.api.post(`/logout`, null, { headers })
        return result.data
    }

    // Atualizar dados do user
    async update(token, body) {
        const headers = { Authorization: `JWT ${token}` }
        const result = await this.api.put(`/update`, body, { headers })
        return result.data
    }

    /**
     * Users
     */

    // Pegar lista de usuarios
    async fetchUsers(token, page, limit, search) {
        const headers = { Authorization: `JWT ${token}` }
        const result = await this.api.get(`/users/index`, { page, limit, search, headers })
        return result.data
    }

    // Pegar lista de usuarios
    async showUser(token, id) {
        const headers = { Authorization: `JWT ${token}` }
        const result = await this.api.get(`/show/${id}`, { params: {}, headers })
        return result.data
    }

    // Atualizar dados do user
    async updateAdm(token, body, id) {
        const headers = { Authorization: `JWT ${token}` }
        const result = await this.api.post(`/users/update/${id}`, body, { headers })
        return result.data
    }


    /**
   * places
   */

    // Pegar lista de placess
    async fetchPlaces(token) {
        const headers = { Authorization: `JWT ${token}` }
        const result = await this.api.get(`/api/v1.0/places`, { headers })
        return result.data
    }
    // Pegar lista de placess
    async fetchPlacesSearch(token, search, type) {
        const headers = { Authorization: `JWT ${token}` }
        const result = await this.api.get(`/api/v1.0/places${type == 'name' ? "/search" : ""}/${search}`, { headers })
        return result.data
    }

    // // Pegar lista de placess
    // async showPlace(token, id) {
    //     const headers = { Authorization: `JWT ${token}` }
    //     const result = await this.api.get(`/api/v1.0/places/show/${id}`, null, { headers })
    //     return result.data
    // }

    // Atualizar dados do places
    async updateplaces(token, body) {
        const headers = { Authorization: `JWT ${token}` }
        const result = await this.api.put(`/api/v1.0/places/edit`, body, { headers })
        return result.data
    }

    // Cadastrar dados do places
    async registerplaces(token, body) {
        const headers = { Authorization: `JWT ${token}` }
        const result = await this.api.post(`/api/v1.0/places/new`, body, { headers })
        return result.data
    }

    // Pegar lista de placess
    async destroyplaces(token, id) {
        const headers = { Authorization: `JWT ${token}` }
        const result = await this.api.delete(`/api/v1.0/places/destroy/${id}`, { params: {}, headers })
        return result.data
    }







}

export default new Api();
