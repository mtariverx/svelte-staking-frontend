<script>
    import { Router } from 'svelte-navigator';
    import Pages from './routes/index.svelte';
//    import { Connection, PublicKey } from '@solana/web3.js';
    //import * as solanaWeb3 from '@solana/web3.js';
</script>

<Router>
    <div id="background">
        <Pages />
    </div>
    <div id="overlay" />
</Router>
