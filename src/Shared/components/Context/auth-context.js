import { createContext } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    name: null,
    username:null,
    token: null,
    isAdmin: false,
    favSubjectsIds: [],
    saveSubjectsIds: [],
    login: () => { },
    logout: () => { },

})