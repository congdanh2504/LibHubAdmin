import axios from 'axios'

const BASE_URL = "http://localhost:3000"

export const login = (email, password) => {
    return axios({
        method: "POST",
        url: `${BASE_URL}/auth/signin`,
        headers: {'Content-Type': 'application/json'},
        data: {
            email: email,
            password: password
        }
    });
}
