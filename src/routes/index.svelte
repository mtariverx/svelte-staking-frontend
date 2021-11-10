<script>
    import { Route } from 'svelte-navigator';
    import ByLaws from '../pages/ByLaws.svelte';
    import Home from '../pages/Home.svelte';
    import NewWind from '../pages/NewWind.svelte';
    import WindDetail from '../pages/WindDetail.svelte';
</script>

<main>
    <Route path="/" component={Home} />
    <Route path="bylaws" component={ByLaws} />
    <Route path="wind-detail/:id" component={WindDetail} />
    <Route path="propose-wind" component={NewWind} />
</main>
