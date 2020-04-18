import {ADD_ARTICLE} from "../constants/action-types";
import {ADD_TITLE} from "../constants/action-types";
import {CART_ITEMS} from "../constants/action-types";
import {CHANGE_ITEMS} from "../constants/action-types";
import {FULL_PRICE} from "../constants/action-types";
import {REMOVE_ITEMS} from "../constants/action-types";

export function addArticle(payload) {
    return { type: "ADD_ARTICLE", payload }
};
export function addTitle(payload) {
    return { type: "ADD_TITLE", payload }
};
export function cartItems(payload) {
    return { type: "CART_ITEMS", payload }
};
export function changeItems(payload) {
    return { type: "CHANGE_ITEMS", payload }
};
export function fullPrace(payload) {
    return { type: "FULL_PRICE", payload }
};
export function removItems(payload) {
    return { type: "REMOVE_ITEMS", payload }
};