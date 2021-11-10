<script>
    import { getHomeDetail } from './../apis/getTableInfo.js';
    import { postVoter } from './../apis/operateOnDataApi.js';
    import { windInfo } from './../store/WINDinfo.js';
    import { useLocation, useNavigate } from 'svelte-navigator';
    import Wind from '../components/Wind.svelte';
    import { Container } from 'sveltestrap';
    import Header from '../components/Header.svelte';
    import VoteProgress from '../components/VoteProgress.svelte';
    import ModalComp from '../components/ModalComp.svelte';
    import { walletAddress, walletAddressShort } from '../store/store.js'; //10/15/2021
    import moment from 'moment';
    import { updateTutorial, updateVoter } from '../apis/operateOnDataApi.js';
    export let id;
    let wallet_address = null;
    let wallet_address_short = null;
    let proposer;
    let item;

    walletAddress.subscribe((value) => {
        wallet_address = value;
    });
    walletAddressShort.subscribe((value) => {
        wallet_address_short = value;
    });

    windInfo.subscribe((value) => {
        value.forEach((item) => {
            if (item.propose_id == id) {
                proposer = item;
            }
        });
        getInfoFromTable();
    });
    function secsToTime(secs) {
        let d = (secs / 8.64e4) | 0;
        let H = ((secs % 8.64e4) / 3.6e3) | 0;
        let m = ((secs % 3.6e3) / 60) | 0;
        let s = secs % 60;
        let z = (n) => (n < 10 ? '0' : '') + n;
        return `${d}.${z(H)}:${z(m)}:${z(s)}`;
    }
   
    let _clock;
    setInterval(() => {
        _clock = moment();
    }, 1000);
    let critical = 169 * 3600;
    $: {
        if (_clock) {
            let counter = _clock?.diff(moment(item.time), 'seconds');
            let ending_time;
            let end_flag = false;
            if (!item.is_ended) {
              
                if (counter < critical) {
                    let downcounter = critical - counter;
                    ending_time =
                        downcounter > 1
                            ? secsToTime(downcounter)
                            : null;
                    if (downcounter < 1) {
                        item.status = item.votes > 11 ? 'passed' : 'rejected';
                    }
                } else {
                    ending_time = null;
                    end_flag = true;
                    if (!end_flag) {
                        let payload = {
                            is_ended: true,
                        };
                        console.log('---update--tutorial--',item.is_ended);
                        updateTutorial(item.propose_id, payload);
                    }
                }
                item.ending_time = ending_time;
            }
        }
    }

    let is_vote_confirmed = false,
        is_reject_confirmed = false,
        is_rescined_confirmed = false;

    const actionChange = async (value) => {
        if (value == 'vote_confirm') {
            localStorage.setItem('windDetail_is_vote', true);
            let _tmp = localStorage.getItem('windDetail_is_vote');
            is_vote_confirmed = _tmp === 'true';
        } else if (value == 'reject_confirm') {
            localStorage.setItem('windDetail_is_reject', true);
            let _tmp = localStorage.getItem('windDetail_is_reject');
            is_reject_confirmed = _tmp === 'true';
        } else if (value == 'rescined_confirm') {
            localStorage.setItem('windDetail_is_rescined', true);
            let _tmp = localStorage.getItem('windDetail_is_rescined');
            is_rescined_confirmed = _tmp === 'true';
        }

        if (
            (is_vote_confirmed || is_reject_confirmed) &&
            !is_rescined_confirmed
        ) {
            let vote_data = {
                state: is_vote_confirmed ? 'vote' : 'reject',
                pubkey: wallet_address,
                token_kinds: JSON.stringify({
                    name: 'ape',
                    state: 'none',
                }),
                tutorial_id: item.propose_id,
            };
            await postVoter(vote_data);
            getHomeDetail();
        }
        if (is_rescined_confirmed) {
            const one = proposer.voters.find(
                (item) => item.pubkey === wallet_address
            );
            let vote_id;
            if (one) {
                vote_id = one.id;
                console.log('--one id-', vote_id)
                let payload = {
                    state: 'rescined',
                };
                await updateVoter(vote_id, payload);
                getHomeDetail();
            }
            // proposer.voters.forEach(async (vote) => {
            //     let vote_id;
            //     if (vote.pubkey == wallet_address) {
            //         vote_id = vote.id;
            //         let payload = {
            //             state: 'rescined',
            //         };
            //         await updateVoter(vote_id, payload);
            //         getHomeDetail();
            //     }
            // });

            // updateVoter
            console.log('-is_rescined-');
        }
    };

    $: {
        let _tmp = localStorage.getItem('windDetail_is_vote');
        is_vote_confirmed = _tmp === 'true';
        _tmp = localStorage.getItem('windDetail_is_reject');
        is_reject_confirmed = _tmp === 'true';
        _tmp = localStorage.getItem('windDetail_is_rescined');
        is_rescined_confirmed = _tmp === 'true';
        console.log('*****************************');
        console.log({ is_vote_confirmed });
        console.log({ is_reject_confirmed });
        console.log({ is_rescined_confirmed });
    }

    function getInfoFromTable() {
        let _d = proposer;
        let _tmp = {
            propose_id: _d.propose_id,
            heading: _d.title,
            author: _d.short_name,
            status: _d.votes + _d.rejects,
            votes: _d.votes,
            rejects: _d.rejects,
            time: _d.time,
            content: _d.content,
            voteradds: _d.voteradds,
        };

        item = _tmp;
    }

    let flag = false;

    const isBtnClked = () => {
        flag = true;
    };
</script>

<Header windDetail />
<Container fluid>
    <Container>
        <div class="row mt-5">
            <Wind wind={item} index={''} detail />
            <div class="col-lg-4 px-0 px-lg-3 mt-4">
                <!--for Box-->
                <!--for large screen-->
                <span class="d-none d-lg-block">
                    <div class="box box-padding py-lg-3 text-left">
                        <div class="time pt-3 pb-3 up">
                          {#if item.ending_time}
                            Voting Ends In {item.ending_time}
                          {:else}
                             Voting Ended
                          {/if}
                        </div>
                        <div class="votes pb-3 up">
                            (11 Votes Needed to Pass)
                        </div>
                    </div>
                </span>
                <!--for small screen-->
                <span class="d-lg-none">
                    <div class="box py-lg-3">
                        <div class="time pt-2 pb-2 box-padding text-left up">
                            Voting Ends In {item.ending_time}
                        </div>
                    </div>

                    <div class="votes pt-4 text-center up">
                        (11 Votes Needed to Pass)
                    </div>
                </span>

                <!--for Progress Bar-->
                <VoteProgress
                    passedVotes={item.votes}
                    rejectedVotes={item.rejects}
                />
                <!-- need to check whether the voter took a part in wind or not -->
                {#if wallet_address_short}
                    <!-- {#if item.ending_time} -->
                    {#if !is_vote_confirmed && !is_reject_confirmed}
                        <div class="text-center up text-empty" />
                    {:else}
                        <div
                            class={`text-center up text-${
                                is_vote_confirmed ? 'pass' : 'reject'
                            }`}
                            visibility={is_vote_confirmed || is_reject_confirmed
                                ? true
                                : false}
                        >
                            {is_vote_confirmed
                                ? 'YOU VOTED TO PASS THIS WIND'
                                : 'YOU VOTED TO REJECT THIS WIND'}
                        </div>
                    {/if}
                    {#if !is_vote_confirmed && !is_reject_confirmed}
                        <button
                            visibility={flag ? 'hidden' : 'show'}
                            class="button pass-color mt-3"
                            data-bs-toggle="modal"
                            data-bs-target="#votePassModal"
                            on:click={() => isBtnClked()}
                        >
                            <span class="up"> Vote to Pass </span>
                        </button>
                        <button
                            data-bs-toggle="modal"
                            data-bs-target="#voteRejectModal"
                            class="button reject-color mt-3"
                            on:click={() => isBtnClked()}
                        >
                            <span class="up"> Vote to Reject </span>
                        </button>
                        <!-- {/if} -->
                    {/if}
                    <ModalComp
                        id="votePassModal"
                        headingTitle="YOU ARE VOTING TO PASS"
                        headingColor="#39FFA0"
                        text="In order to cast this vote you will need to stake one Ape Token for the duration of the vote. You will not be able to sell, transfer or breed this Ape as long as it is staked."
                        button="STAKE MY hangeAPE"
                        button_option="vote_confirm"
                        onChange={actionChange}
                    />

                    <ModalComp
                        id="voteRejectModal"
                        headingTitle="YOU ARE VOTING TO REJECT"
                        headingColor="#FF3797"
                        text="In order to cast this vote you will need to stake one Ape Token for the duration of the vote. You will not be able to sell, transfer or breed this Ape as long as it is staked."
                        button="STAKE MY APE"
                        button_option="reject_confirm"
                        onChange={actionChange}
                    />

                    {#if is_vote_confirmed || is_reject_confirmed}
                        <div class="mind pt-4 text-center up">
                            Changed your mind?
                        </div>
                        <button
                            data-bs-toggle="modal"
                            data-bs-target="#voteRescindModal"
                            class="button black-color text-white primary-animation mt-3"
                        >
                            <span class="up"> Rescind Vote </span>
                        </button>
                    {/if}
                    <!-- {#if rescind_vote} -->
                    <ModalComp
                        id="voteRescindModal"
                        headingTitle="ARE YOU SURE YOU WANT TO RESCIND YOUR VOTE?"
                        text="(Your staked Ape Token will be returned to your wallet)"
                        button="RESCIND"
                        button_option="rescined_confirm"
                        onChange={actionChange}
                    />
                    <!-- {/if} -->
                {/if}
            </div>
            <!--for Big Box-->
            <div class="col-lg-8 px-0 px-lg-3 mt-4">
                <div class="desc-box px-3 px-lg-5 py-3 py-lg-4 mt-5 mt-md-0">
                    <div class="document up pt-3 pb-3">
                        {item.content}
                    </div>
                </div>
            </div>
        </div>
    </Container>
</Container>

<style>
    .box {
        background: #1a1b1c;
        box-shadow: -4px -4px 4px rgba(109, 109, 109, 0.5), 4px 4px 4px #060c18;
        border-radius: 42px;
    }
    .box-padding {
        padding: 35px;
    }
    .desc-box {
        background: #3e4246;
        box-shadow: -4px -4px 4px rgba(109, 109, 109, 0.5), 4px 4px 4px #060c18;
        border-radius: 42px;
    }
    .time {
        color: #ffffff;
        font-weight: bold;
        font-size: 1.2rem;
    }
    .votes {
        color: #898989;
        font-size: 0.8rem;
    }
    .mind {
        color: #898989;
    }
    .document {
        color: #ffffff;
        font-weight: 300;
        font-size: 1.2rem;
    }
    .text-pass {
        padding: 3rem;
        font-size: 1.8rem;
        font-family: 'azo-sans-uber';
        color: #39ffa0;
    }
    .text-reject {
        padding: 3rem;
        font-size: 1.8rem;
        font-family: 'azo-sans-uber';
        color: #ff3797;
    }
    .text-empty {
        padding: 5rem;
    }
    @media (max-width: 768px) {
        .desc-box {
            border-radius: 20px;
        }
        .document {
            font-size: 0.9rem;
        }
    }
    .hide {
        visibility: hidden;
    }
</style>
