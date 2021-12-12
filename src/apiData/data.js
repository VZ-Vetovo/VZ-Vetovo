import { html } from '../lib.js';
import * as api from './api.js';

export const _price = 0.25;
export const _tax = 5;
export const loader = () => html`<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAll(){
    return api.get('/classes/indication?order=-createdAt&limit=1');    
}

export async function getPosts(){
    return api.get(`/classes/posts?order=-createdAt`);    
}

export async function newPost(data) {
    return api.post('/classes/posts', data);
}

export async function createNew(data) {
    return api.post('/classes/indication', data);
}

export async function updateThis(data, id) {
    return api.put('/classes/indication/' + id, data);
}

export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
}

export function clearUserData() {
    sessionStorage.removeItem('userData');
}