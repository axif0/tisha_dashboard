import axios from 'axios'

export const setLogin = () => {
    return {
        type: 'SET_LOGIN',
        payload: true
    }
}

export const setLogout = () => {
    return {
        type: 'SET_LOGOUT',
        payload: false
    }
}

export const asyncLogin = (data, history, notify) => {
    return (dispatch) => {
        const url = 'https://tisha-dashboard-api.onrender.com/api/users/login'
        axios.post(url, data)
            .then(response => {
                const data = response.data
                if(data.token){
                    console.log(response.data)
                    localStorage.setItem('token', data.token)
                    dispatch(setLogin())
                    history.push('/dashboard')
                } else if(data.errors) {
                    const notifyError = {error: true, errorMessage: data.errors}
                    notify(notifyError)
                }
            })
            .catch(err => {
                console.log(err)
                alert(`${err.message}-${err.statusCode}`)
            })
    }
}