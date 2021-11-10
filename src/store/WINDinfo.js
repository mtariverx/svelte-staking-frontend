import {
  writable
} from 'svelte/store';

export const windInfo = writable(JSON.parse(localStorage.getItem('windInfo')));

windInfo.subscribe(value => {
  localStorage.setItem('windInfo', JSON.stringify(value))
})
