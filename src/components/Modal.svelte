<script>
    function handleClick() {
        if (window['solana']?.isPhantom) {
            window.solana.request({ method: 'connect' });
        } else {
            window.open('https://phantom.app/', '_blank');
        }
    }
</script>

<div
    class="modal fade"
    id="walletsModal"
    tabindex="-1"
    aria-labelledby="walletsModalLabel"
    aria-hidden="true"
>
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body py-5">
                <div class="heading text-center">Connect Your Wallet</div>
                <div class="wrapper">
                    <button class="phantom-button mb-2" on:click={handleClick}>
                        <img
                            src="/assets/images/phantom.png"
                            alt="phantom_logo"
                            class="phantom-img"
                        />
                        <span class="phantom-text">Phantom</span>
                    </button>
                    <button class="sollet-button">
                        <img
                            src="/assets/images/sollet.png"
                            alt="sollet_logo"
                            class="sollet-img"
                        />
                        <span class="sollet-text">Sollet</span>
                    </button>
                </div>
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
                <div class="heading text-center">
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
        max-width: 420px !important;
    }
    .modal-content {
        background: #222222;
        border-radius: 20px;
        border: 0;
    }
    .heading {
        font-family: 'azo-sans-uber';
        color: #ffffff;
        font-size: 1.3rem;
        padding-bottom: 2rem;
    }
    @media (max-width: 998px) {
        .heading {
            padding: 1.2rem 6rem 2rem;
        }
    }
    .wrapper {
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
</style>
