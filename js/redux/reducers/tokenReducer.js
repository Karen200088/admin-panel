const initialState = {
    token: localStorage.getItem('token')
}

const SET_TOKEN = "SET_TOKEN";

export const tokenReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_TOKEN:
            return {
                token: action.payload
            }
        default:
            return state;
    }

}

export const setToken = (payload) => ({type: SET_TOKEN, payload});
