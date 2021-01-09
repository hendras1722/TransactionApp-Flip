import axios from 'axios'

export const getUser = () => {
    return axios.get('https://nextar.flip.id/frontend-test')
}