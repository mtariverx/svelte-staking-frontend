export const connectPhantom = () => {
    if (window['solana']?.isPhantom) {
        window.solana.connect();
    } else {
        window.open('https://phantom.app/', '_blank');
    }
};
