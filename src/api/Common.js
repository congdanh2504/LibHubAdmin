export const getUser = () => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
        return JSON.parse(userStr)
    }
    return null
}

export const getToken = () => {
    return localStorage .getItem('token')
}

export const setUser= (user) => {
    localStorage.setItem('user', JSON.stringify(user))
}

export const setToken = (token) => {
    localStorage.setItem('token', token)
}

export const removeUser = () => {
    localStorage .removeItem('user')
    localStorage .removeItem('token')
}


