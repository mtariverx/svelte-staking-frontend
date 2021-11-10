export const createShortWalletAddress = (address) => {
    console.log('=>', address);
    const first = address.slice(0, 4);
    const last = address.substr(address.length - 4);
    const shortAddress = `${first}...${last}`;
    console.log('Short Address Set...');
    return shortAddress;
};
