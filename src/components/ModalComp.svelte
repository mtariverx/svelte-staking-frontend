<script>
    import { connectPhantom } from '../apis/connectPhantom';
    import { walletAddress, walletAddressShort } from '../store/store.js';
    import { createShortWalletAddress } from '../utils';

    const handleClick = () => {
        connectPhantom();
        if (window['solana']?.isPhantom) {
            window.solana.on('connect', () => {
                const address = window.solana.publicKey.toBase58();
                walletAddress.set(address);
                localStorage.setItem('wallet_address', address);
                if (address) {
                    const shortAddress = createShortWalletAddress(address);
                    walletAddressShort.set(shortAddress);
                }

                console.log('Wallet Address has been Successfully set.');
            });
        }
    };

    export let id, headingTitle, headingColor, text, button, connectButtons;
    export let button_option;
    
    export let onChange=(value)=>{

    }

</script>

<div
    class="modal fade"
    {id}
    tabindex="-1"
    aria-labelledby="walletsModalLabel"
    aria-hidden="true"
>
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body p-5">
                <div
                    class="heading text-center"
                    style="color:{headingColor ? headingColor : '#ffffff'}"
                >
                    {headingTitle ? headingTitle : ''}
                </div>

                {#if text}
                    <p class="body-text text-center up">
                        {text ? text : ''}
                    </p>
                {/if}

                {#if button}
                    <button
                        data-bs-dismiss="modal"
                        class="modal-button primary-animation"
                        on:click={onChange(button_option)}
                        >{button}
                    </button>
                {/if}

                {#if connectButtons}
                    <div class="connect-buttons-body">
                        <button
                            data-bs-dismiss="modal"
                            class="phantom-button mb-2"
                            on:click={handleClick}
                        >
                            <img
                                src="/assets/images/phantom.png"
                                alt="phantom_logo"
                                class="phantom-img"
                            />
                            <span class="phantom-text">Phantom</span>
                        </button>
                        <button data-bs-dismiss="modal" class="sollet-button">
                            <img
                                src="/assets/images/sollet.png"
                                alt="sollet_logo"
                                class="sollet-img"
                            />
                            <span class="sollet-text">Sollet</span>
                        </button>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>

<div
    class="modal fade"
    id="walletsModalMobile"
    tabindex="-1"
    aria-labelledby="walletsModalMobileLabel"
    aria-hidden="true"
>
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body">
                <div class="heading text-white text-center">
                    to connect please view on desktop or laptop
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .modal {
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
    }
    .modal-dialog {
        max-width: 380px !important;
    }
    .modal-content {
        background: #222222;
        border-radius: 20px;
        border: 0;
    }
    .heading {
        font-family: 'azo-sans-uber';
        font-size: 1.3rem;
        padding-bottom: 2rem;
    }
    @media (max-width: 998px) {
        .heading {
            padding: 1.2rem 6rem 2rem;
        }
    }
    .connect-buttons-body {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .phantom-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 195px;
        height: 45px;
        background: #5537d2;
        border-radius: 40px;
        border: 0;
        outline: 0;
        color: white;
        font-weight: 700;
    }
    .phantom-img {
        width: 20%;
        position: relative;
        right: 20px;
    }
    .sollet-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 195px;
        height: 45px;
        background: #0075ff;
        border-radius: 40px;
        border: 0;
        outline: 0;
        color: white;
        font-weight: 700;
    }
    .sollet-img {
        width: 15%;
        position: relative;
        right: 32px;
    }
    .body-text {
        color: white;
        font-weight: 400;
        padding-bottom: 2rem;
    }
    .modal-button {
        background: radial-gradient(
            128.94% 128.94% at 48.7% 21.2%,
            #3a3a3a 0%,
            #1b1b1d 27.08%
        );
        border: 0;
        background: #1a1b1c;
        box-shadow: -4px -4px 4px rgb(109 109 109 / 50%), 4px 4px 4px #060c18;
        border-radius: 60px;
        color: #ffffff;
        font-family: 'azo-sans-uber';
        padding: 0.8rem 2rem;
        width: 100%;
        font-size: 1.2rem;
    }
</style>
