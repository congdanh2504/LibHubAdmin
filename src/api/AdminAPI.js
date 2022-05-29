import axios from 'axios'
import { getToken } from './Common'
axios.defaults.headers.common = {'Authorization': `bearer ${getToken()}`}

const BASE_URL = "http://localhost:3000"

export const getUser = (page) => {
    return axios({
        method: "GET",
        url: `${BASE_URL}/admin/user?page=${page}`
    })
}

export const getPackages = () => {
    return axios({
        method: "GET",
        url: `${BASE_URL}/package`
    })
}

export const getBooks = (page) => {
    return axios({
        method: "GET",
        url: `${BASE_URL}/book?page=${page}`
    })
}

export const getRequestedBooks = (page) => {
    return axios({
        method: "GET",
        url: `${BASE_URL}/admin/requestedbookspaginate?page=${page}`
    })
}

export const getRecords = (page) => {
    return axios({
        method: "GET",
        url: `${BASE_URL}/admin/recordpaginate?page=${page}`
    })
}

export const getCategories = () => {
    return axios({
        method: "GET",
        url: `${BASE_URL}/category`
    })
}

export const acceptRequestedBook = (bookId) => {
    return axios({
        method: "POST",
        url: `${BASE_URL}/admin/acceptrequest/${bookId}`
    })
}

export const confirmRecord = (recordId) => {
    return axios({
        method: "POST",
        url: `${BASE_URL}/admin/confirm/${recordId}`
    })
}

export const updatePackage = (Package, packageId) => {
    return axios({
        method: "PATCH",
        url: `${BASE_URL}/admin/package/${packageId}`,
        data: Package
    })
}

export const addPackage = (Package) => {
    return axios({
        method: "POST",
        url: `${BASE_URL}/admin/package`,
        data: Package
    })
}

export const deletePackage = (packageId) => {
    return axios({
        method: "DELETE",
        url: `${BASE_URL}/admin/package/${packageId}`
    })
}

export const uploadPicture = (file) => {
    var formData = new FormData();
    formData.append("file", file)
    return axios({
        method: "POST",
        url: `${BASE_URL}/uploadpicture`,
        headers: {'Content-Type': 'multipart/form-data'},
        data: formData
    })
}

export const updateBook = (bookId, book) => {
    return axios({
        method: "PATCH",
        url: `${BASE_URL}/admin/book/${bookId}`,
        data: book
    })
}

export const addBook = (book) => {
    return axios({
        method: "POST",
        url: `${BASE_URL}/admin/book`,
        data: book
    })
}

export const deleteBook = (bookId) => {
    return axios({
        method: "DELETE",
        url: `${BASE_URL}/admin/book/${bookId}`
    })
}

export const getReport = () => {
    return axios({
        method: "GET",
        url: `${BASE_URL}/admin/report`
    });
}

