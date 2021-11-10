export const disconnectPhantom = () => {
    if (window['solana']?.isPhantom) {
        console.log('----solana log out---')
        window.solana.disconnect();
    }
};
