const redux = require('redux')
const bindActionCreators = redux.bindActionCreators
const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

// ----------------------------//
// Actions

// Action Creator are functions that returns actions
// Actions are objects with a 'type property'
const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

function orderCake() {
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}
function restockCake(qty = 1){
    return{
        type: CAKE_RESTOCKED,
        payload: qty
    }
}
function orderIcecream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}
function restockIcecream(qty = 1){
    return{
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}


//REDUCERS  

// const initialState = {
//     numOfCakes: 10,
//     numOfIcecreams: 20,
// }

const initialCakeState = {
    numOfCakes:10,
}
const initialIcecreamState = {
    numOfIcecreams: 20
}
//  Reducers
// (previousState, action)=> newState

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case CAKE_ORDERED:
//             return {
//                 ...state, //we used this to make a copy of state as there were other properties also
//                 numOfCakes: state.numOfCakes - action.payload
//             }
//         case CAKE_RESTOCKED:
//             return {
//                 ...state, //we used this to make a copy of state as there were other properties also
//                 numOfCakes: state.numOfCakes + action.payload
//             }
//         case ICECREAM_ORDERED:
//             return {
//                 ...state, //we used this to make a copy of state as there were other properties also
//                 numOfIcecreams: state.numOfIcecreams - action.payload
//             }
//         case ICECREAM_RESTOCKED:
//             return {
//                 ...state, //we used this to make a copy of state as there were other properties also
//                 numOfIcecreams: state.numOfIcecreams + action.payload
//             }
//         default:
//             return state
//     }
// }

const cakeReducer=(state = initialCakeState,action)=>{
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state, //we used this to make a copy of state as there were other properties also
                numOfCakes: state.numOfCakes - action.payload
            }
        case CAKE_RESTOCKED:
            return {
                ...state, //we used this to make a copy of state as there were other properties also
                numOfCakes: state.numOfCakes + action.payload
            }
    
        default:
            return state;
    }
}

const icecreamReducer = (state = initialIcecreamState, action)=>{
    switch (action.type) {
        case ICECREAM_ORDERED:
            return{
                ...state,
                numOfIcecreams: state.numOfIcecreams - action.payload
            }    
        case ICECREAM_RESTOCKED:
            return{
                ...state,
                numOfIcecreams: state.numOfIcecreams + action.payload
            }    
        default:
            return state
    }
}


// Store

const rootReducer = combineReducers({
    cake: cakeReducer,
    icecream: icecreamReducer
})


const store = createStore(rootReducer, applyMiddleware(logger)) //store holding the state of app, inside the reducer
console.log('Initial State', store.getState()) // Access to state

// store.subscribe(()=>console.log("Updated State", store.getState)) //Subbscribe function called whenever state updates

const unsubscibe = store.subscribe(()=>{}) //Subbscribe function called whenever state updates


// store.dispatch(orderCake()) // takes actionCreator as parameter
// store.dispatch(orderCake()) // takes actionCreator as parameter
// store.dispatch(orderCake()) // takes actionCreator as parameter
// store.dispatch(restockCake(3))
const actions = bindActionCreators({orderCake, restockCake, orderIcecream, restockIcecream}, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(5)
actions.restockIcecream(10)


unsubscibe();
