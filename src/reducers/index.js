import {ADD_ARTICLE} from "../constants/action-types";
import {ADD_TITLE} from "../constants/action-types";
import {CART_ITEMS} from "../constants/action-types";
import {CHANGE_ITEMS} from "../constants/action-types";
import {FULL_PRICE} from "../constants/action-types";
import {REMOVE_ITEMS} from "../constants/action-types";

const initialState = {
  articles: [],
  items:[],
  price:0
}; 
function rootReducer(state = initialState, action) {
  if(action.type === ADD_TITLE){
    return Object.assign({}, state, {
      titles: state.titles.concat(action.payload)
    });
  } 
  if(action.type === CART_ITEMS){
    return Object.assign({}, state, {
      items: state.items.concat(action.payload)
    });
  }
  if(action.type === REMOVE_ITEMS){
    return Object.assign({}, state, {
      items: []
    });
  }
  if(action.type === FULL_PRICE){
    console.log(state.price);
    return Object.assign({}, state, {
      price: action.payload.price
    });
  }
  if(action.type === CHANGE_ITEMS){
    return Object.assign({}, state, {
      items: state.items.map(todo => {
         if (todo.id === action.payload.id) {
          return Object.assign({}, todo, {
            value: action.payload.value
          })
        }
        if (todo.id !== action.id) {
          return todo
        }
        

      })
    })
  }
  return state;
};
  
export default rootReducer;
  