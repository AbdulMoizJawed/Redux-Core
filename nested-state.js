const redux = require('redux')
const createStore = redux.createStore
const produce = require('immer').produce


const initialState = {

    name: 'moiz',
    address: {
        street: '123 Main St',
        city: "Khi",
        state: 'Sindh'
    }
}

const STREET_UPDATED = 'STREET_UPDATED'

const updateStreet = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STREET_UPDATED:
            // return{
            //     ...state,
            //     address:{
            //         ...state.address,
            //         street: action.payload
            //     },
            // }
            return produce(state , (draft) => {
              draft.address.street = action.payload
            })
    
        default:
            return state
    }
}


const store = createStore(reducer) 
console.log('Initial State', store.getState())

const unsubscibe = store.subscribe(()=>console.log("Updated State", store.getState())) 

store.dispatch(updateStreet('6/49 5A'))

unsubscibe()