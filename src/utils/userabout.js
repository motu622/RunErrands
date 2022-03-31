import { v4 as uuidv4 } from 'uuid';





function setToken(token) {
    localStorage.setItem('TOKEN_KEY', token)
}


function getToken() {
    return localStorage.getItem('TOKEN_KEY')
}

function removeToken() {
    localStorage.removeItem('TOKEN_KEY')
}

function getIsAdmin() {
    return localStorage.getItem('ISADMIN_KEY')
}
function setIsAdmin(isAdmin) {
    return localStorage.setItem('ISADMIN_KEY',isAdmin)
}
function removeIsAdmin() {
    return localStorage.removeItem('ISADMIN_KEY')
}
export {
    setIsAdmin,
    getIsAdmin,
    removeIsAdmin,
    setToken,
    getToken,
    removeToken
}