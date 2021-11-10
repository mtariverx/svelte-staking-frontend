import { writable } from 'svelte/store';
import { createShortWalletAddress } from '../utils';

export const walletAddress = writable('');
export const walletAddressShort = writable('');

let walletAddressValue;
walletAddress.subscribe((value) => (walletAddressValue = value));

const wallet_address = localStorage.getItem('wallet_address');

if (wallet_address) {
    walletAddress.set(wallet_address);
}

if (walletAddressValue) {
    console.log('=> Short Address is set!');
    const address = createShortWalletAddress(walletAddressValue);
    walletAddressShort.set(address);
}
