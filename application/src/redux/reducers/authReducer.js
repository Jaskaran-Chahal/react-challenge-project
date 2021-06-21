import { LOGIN, LOGOUT } from '../actions/types'

const INITIAL_STATE = { email: null, token: null };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
           // return { ...state, email: action.payload.login, token: action.payload.token }
           return { ...state, email: action.payload.email, token: action.payload.password }  
        case LOGOUT:
            return { ...state, ...INITIAL_STATE }
        default:
            return state;
    }
}