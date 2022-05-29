import axios from 'axios'

const BASE_URL = "http://127.0.0.1:8000/api/"

export const getCategories = (setCategories) => {
    axios({
        method: 'get',
        url: `${BASE_URL}category`,
        headers: {'Content-Type': 'application/json'},
    }).then(response => {
        setCategories(response.data)
    })
}

export const deleteCategory = async (id) => {
    await axios({
        method: 'delete',
        url: `${BASE_URL}category/${id}`,
        headers: {'Content-Type': 'application/json'},
    })
}