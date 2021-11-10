<script>
    import { windInfo } from './../store/WINDinfo.js';
    import Wind from '../components/Wind.svelte';
    import { Container } from 'sveltestrap';
    import { Link } from 'svelte-navigator';
    import Header from '../components/Header.svelte';
    import { Popover } from 'sveltestrap';
    import { walletAddress, walletAddressShort } from '../store/store.js';
    import { updateTutorial } from '../apis/operateOnDataApi';
    import { getHomeDetail, postProposer } from '../apis/getTableInfo';
    import moment from 'moment';
    import axios from 'axios';
    import { onMount } from 'svelte';

    let hide;
    $: hide = true;
    const handleClick = () => {
        hide = !hide;
    };
    let wallet_address = null;
    let wallet_address_short = null;
    let propop = { target: 'q-mark', placement: 'right' };
    const changePropop = () => {
        if (window.innerWidth > 767) {
            propop = { target: 'q-mark', placement: 'right' };
        } else {
            propop = { target: 'q-mark-mobile', placement: 'top' };
        }
    };
    window.addEventListener('resize', changePropop);

    walletAddress.subscribe((value) => {
        wallet_address = value;
        wallet_address ? console.log('home-wallet---', wallet_address) : null;
    });

    walletAddressShort.subscribe((value) => {
        wallet_address_short = value;
    });

   
    let _clock;
    let items = [];
    setInterval(() => {
        _clock = moment();
    }, 1000);
    let critical = 169 * 3600;
    function secsToTime(secs) {
        let d = (secs / 8.64e4) | 0;
        let H = ((secs % 8.64e4) / 3.6e3) | 0;
        let m = ((secs % 3.6e3) / 60) | 0;
        let s = secs % 60;
        let z = (n) => (n < 10 ? '0' : '') + n;
        return `${d}.${z(H)}:${z(m)}:${z(s)}`;
    }
    $: {
        items = items.map((item) => {
            if (_clock) {
                let counter = _clock?.diff(moment(item.time), 'seconds');
            
                let end_flag = false;
                let ending_time;
                if (!item.is_ended) {
                    let downcounter = critical - counter;
                    if (downcounter > 0) {
                     
                        ending_time =
                            downcounter > 1
                                ? secsToTime(downcounter)
                                : null;
                        if (downcounter < 1) {
                            item.status =
                                item.votes > 11 ? 'passed' : 'rejected';
                        }
                    } else {
                        ending_time = null;
                        end_flag = true;
                        if (!end_flag) {
                            let payload = {
                                is_ended: true,
                            };
                            // console.log('---home-ended-', item.is_ended);
                            updateTutorial(item.propose_id, payload);
                        }
                    }
                    item.ending_time = ending_time;
                }
            }
            return item;
        });
    }
    (async () => {
        localStorage.setItem('windDetail_is_vote', null);
        localStorage.setItem('windDetail_is_reject', null);
        localStorage.setItem('windDetail_is_rescined', null);
        const datalist = await getHomeDetail();
        items = [];
        for (let i = 0; i < datalist.length; i++) {
            let _d = datalist[i];
            let _tmp = {
                propose_id: _d.propose_id,
                heading: _d.title,
                author: _d.short_name,
                status: _d.votes + _d.rejects,
                votes: _d.votes,
                rejects: _d.rejects,
                time: _d.time,
                content: _d.content,
                is_ended: _d.is_ended,
            };
            items.push(_tmp);
        }
    })();

   
</script>

<Header />
<Container fluid>
    <div class="wraper mt-4 mt-lg-0">
        <img src="assets/images/hero.png" alt="DAOO Crayons" />
    </div>
    <Container>
        <div class="row">
            <div class="col-12 px-lg-3 d-none d-md-block">
                <span class="heading up">Proposed WINDS</span>

                <span class="question-mark ms-2">
                    <button id="q-mark">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="white"
                            class="bi bi-question-circle"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                                d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"
                            />
                        </svg>
                    </button>
                </span>

                {#if $walletAddress}
                    <div>
                        <Link to="/propose-wind">
                            <button class="propose-wind"
                                >Propose New WIND</button
                            >
                        </Link>
                    </div>
                {/if}
            </div>
            <div
                class="col-12 d-flex flex-column align-items-center mb-5 px-lg-3 d-md-none"
            >
                <span
                    class="info px-3 py-1 ms-2 mb-4 info-tip {hide
                        ? 'd-none'
                        : ''}"
                >
                    (Whiny Impulsive Notable Document)
                </span>
                <div class="heading">
                    Proposed WINDS
                    <span class="tip">
                        <button id="q-mark-mobile">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="11"
                                height="11"
                                fill="white"
                                class="bi bi-question-circle"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                                />
                                <path
                                    d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"
                                />
                            </svg>
                        </button>
                    </span>
                </div>
            </div>
            {#if items}
                {#each items as item, index}
                    <Wind wind={item} index={index + 1} />
                {/each}
            {/if}
        </div>
        <Popover
            placement={propop.placement}
            target="q-mark"
            trigger="hover"
            style="background:transparent;border:none;"
        >
            <span class="info px-2 py-1 ms-2 info-tip ">
                <span class="up">(Whiny Impulsive Notable Document)</span>
            </span>
        </Popover>
        <Popover
            placement={propop.placement}
            target="q-mark-mobile"
            trigger="hover"
            style="background:transparent;border:none;"
        >
            <span class="info px-2 py-1 ms-2 info-tip ">
                <span class="up">(Whiny Impulsive Notable Document)</span>
            </span>
        </Popover>
    </Container>
</Container>

<style>
    .wraper {
        display: flex;
        justify-content: center;
    }
    .wraper img {
        width: 20%;
        position: relative;
        top: -2rem;
    }
    .heading {
        color: #ffffff;
        font-size: 1.7rem;
        font-weight: 900;
    }
    .info {
        background: #1a1b1c;
        box-shadow: -4px -4px 4px rgba(109, 109, 109, 0.5), 4px 4px 4px #060c18;
        border-radius: 60px;
        color: #ffffff;
        font-weight: 400;
        font-size: 0.8rem;
        line-height: 18px;
        position: relative;
        bottom: 2px;
    }
    .question-mark {
        position: relative;
        bottom: 17px;
    }
    .tip {
        position: relative;
        bottom: 30px;
    }
    #q-mark {
        background: transparent;
        border: 0;
        padding: 0;
    }
    #q-mark-mobile {
        background: transparent;
        border: 0;
        padding: 0;
    }
    .propose-wind {
        float: right;
        background: #3a3b3c;
        box-shadow: -4px -4px 4px rgb(109 109 109 / 50%), 4px 4px 4px #060c18;
        border-radius: 60px;
        color: white;
        padding: 0.5rem 2rem;
        border: 0;
        font-weight: 700;
    }
    .propose-wind:hover {
        background: #404244;
        box-shadow: -4px -4px 4px rgba(109, 109, 109, 0.5), 4px 4px 4px #060c18;
    }

    @media (max-width: 998px) {
        .wraper img {
            width: 25%;
            top: -1rem;
        }
    }
    @media (max-width: 768px) {
        .wraper img {
            width: 30%;
            margin-bottom: 1rem;
        }
        .info {
            font-size: 0.9rem;
            position: static;
            padding: 10px;
        }
    }
    @media (max-width: 576px) {
        .wraper img {
            width: 55%;
            margin-bottom: 1rem;
        }
        .info-tip {
            float: right;
            bottom: 0;
        }
    }
</style>
