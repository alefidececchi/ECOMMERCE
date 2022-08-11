export const url = process.env.REACT_APP_API || 'http://localhost:3001/api'

export const setHeaders = () => {
    const headers = {
        headers: {
            "authorization": localStorage.getItem("token")
        }
    }
    return headers
}