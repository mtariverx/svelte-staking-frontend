<script>
    export let passedVotes;
    export let rejectedVotes;
</script>

<div class="box mt-5 mt-md-4">
    <div
        class="passed"
        style="width: {passedVotes === rejectedVotes
            ? '40%'
            : passedVotes > rejectedVotes
            ? '45%'
            : '35%'}"
    >
        <span class="passed-number"> {passedVotes} </span>
    </div>
    <div
        class="rejected"
        style="width: {passedVotes === rejectedVotes
            ? '40%'
            : passedVotes > rejectedVotes
            ? '35%'
            : '45%'}"
    >
        <span class="rejected-number"> {rejectedVotes} </span>
    </div>
</div>

<style>
    .box {
        background: #3a3a3a;
        box-shadow: inset -4px -4px 4px rgba(100, 100, 100, 0.5),
            inset 4px 4px 4px #242424;
        border-radius: 40px;
        height: 3rem;
    }
    .passed {
        background: #39ffa0;
        box-shadow: 0px 0px 2px rgba(214, 214, 214, 0.5), 1px 1px 2px #1d1d1d;
        border-radius: 60px;
        display: inline-block;
        height: 3rem;
    }
    .rejected {
        background: #ff3797;
        box-shadow: 0px 0px 2px rgba(214, 214, 214, 0.5), 1px 1px 2px #1d1d1d;
        border-radius: 60px;
        float: right;
        height: 3rem;
    }
    .passed-number {
        background: #39ffa0;
        box-shadow: 0px 0px 2px rgba(214, 214, 214, 0.5), 1px 1px 2px #1d1d1d;
        border-radius: 50%;
        height: 100%;
        width: 3rem;
        float: right;
        text-align: center;
        font-weight: 700;
        font-size: 1.3rem;
        line-height: 3rem;
    }
    .rejected-number {
        background: #ff3797;
        box-shadow: 0px 0px 2px rgba(214, 214, 214, 0.5), 1px 1px 2px #1d1d1d;
        border-radius: 50%;
        height: 100%;
        width: 3rem;
        float: left;
        text-align: center;
        font-weight: 700;
        font-size: 1.3rem;
        line-height: 3rem;
    }
</style>
