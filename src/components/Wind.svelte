<script>
    import { Link } from 'svelte-navigator';
    export let wind;
    export let index;
    export let detail;
</script>

<div class="col-12 px-0 px-lg-3 mt-4">
    <Link to={`/wind-detail/${wind.propose_id}`} style={detail ? 'cursor:default' : ''}>
        <div class="wind {detail ? 'still' : ''}">
            <div
                class="row px-4 px-lg-5 py-2 py-md-0 d-flex align-items-center {detail
                    ? 'py-2'
                    : ''}"
            >
                <div class="col-8 p-1 d-flex align-items-center">
                    <div class="serial-number pe-4 pe-lg-5 up">{index}</div>
                    <div class="p-1 d-flex flex-column">
                        {#if detail}
                        <span class="wind-title up"> {wind.heading} </span>
                        {:else}
                            <span class="wind-title up">
                                {wind.heading}
                            </span>
                        {/if}
                        {#if !detail}
                            <span
                                class="wind-author up {detail
                                    ? ''
                                    : 'd-none d-md-block'}"
                            >
                                proposed by: <span class="author-name up">
                                    {wind.author}
                                </span>
                            </span>
                        {/if}

                        {#if !detail}
                            {#if wind.ending_time}
                                <span class="time d-md-none up">
                                    voting ends in {wind.ending_time}
                                </span>
                            {:else}
                                <span class="time d-md-none up">
                                    voting ended
                                </span>
                            {/if}
                        {/if}
                    </div>
                </div>

                <div
                    class="col-4 d-flex justify-content-end serial-number p-1 ms-auto"
                >
                    <div class="p-1 d-flex flex-column text-end">
                        {#if !detail}
                            {#if wind.status > 10}
                                <span class="voting-status up">
                                    {wind.status} voted
                                </span>
                            {:else if wind.status === 'passed'}
                                <span class="voting-status-passed up">
                                    Passed
                                </span>
                            {:else if wind.status === 'rejected'}
                                <span class="voting-status-rejected up">
                                    Rejected
                                </span>
                            {:else}
                                <span class="voting-status-low up">
                                    {wind.status} voted
                                </span>
                            {/if}

                            {#if wind.ending_time}
                                <span class="time d-none d-md-block up">
                                    voting ends in {wind.ending_time}
                                </span>
                            {:else}
                                <span class="time d-none d-md-block up">
                                    voting ended
                                </span>
                            {/if}
                        {:else}
                            <span
                                class="wind-author up {detail
                                    ? ''
                                    : 'd-none d-md-block'}"
                            >
                                proposed by: <span class="author-name up">
                                    {wind.author}
                                </span>
                            </span>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </Link>
</div>

<!-- </div> -->
<style>
    .wind {
        background: #1a1b1c;
        box-shadow: -4px -4px 4px rgba(109, 109, 109, 0.5), 4px 4px 4px #060c18;
        border-radius: 60px;
    }
    .wind:hover {
        background: #404244;
        box-shadow: -4px -4px 4px rgba(109, 109, 109, 0.5), 4px 4px 4px #060c18;
    }
    .wind:active {
        background: #404244;
        box-shadow: -4px -4px 4px #060c18, 4px 4px 4px rgba(109, 109, 109, 0.5);
    }
    .wind-title {
        color: #ffffff;
        font-size: 1.3rem;
        font-weight: 600;
    }
    .wind-author {
        font-size: 0.7rem;
        color: #a1a1a1;
        font-weight: 400;
    }
    .wind-author .author-name {
        text-decoration: underline;
        color: #39ffa0;
    }
    .voting-status {
        color: #d6ffeb;
        font-size: 1.3rem;
        font-weight: 700;
    }
    .voting-status-low {
        color: #ffe2f0;
        font-size: 1.3rem;
        font-weight: 700;
    }
    .voting-status-passed {
        color: #39ffa0;
        font-size: 1.3rem;
        font-weight: 900;
    }
    .voting-status-rejected {
        color: #ff3797;
        font-size: 1.3rem;
        font-weight: 900;
    }
    .time {
        font-size: 0.7rem;
        color: #a1a1a1;
    }
    .serial-number {
        color: #ffffff;
        font-weight: 900;
        font-size: 1.5rem;
    }
    .still {
        pointer-events: none;
    }
</style>
