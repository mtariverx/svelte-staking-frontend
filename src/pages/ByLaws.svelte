<script>
    import { Container } from 'sveltestrap';
    import Header from '../components/Header.svelte';
</script>

<Header />
<Container fluid>
    <div class="wraper mt-4 mt-lg-0">
        <img src="assets/images/hero.png" alt="DAOO Crayons" />
    </div>
    <Container>
        <p class="heading up mb-5">BYLAWS</p>
        <div class="desc-box px-3 px-lg-5 py-3 py-lg-4 mt-5 mt-md-0">
            <div class="document up pt-3 pb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec cursus tortor. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. In massa dui, congue ut nisi vel,
                accumsan interdum lacus. Mauris gravida, erat ut volutpat
                ornare, nisl nisi sagittis quam, sed volutpat libero eros ut
                felis. Aenean id purus vel lacus molestie commodo vitae sit amet
                dui. Vestibulum justo quam, ullamcorper sit amet nunc
                ullamcorper, varius tincidunt mi. Aliquam interdum metus et
                tortor auctor faucibus ut ut mauris. Curabitur ac neque
                malesuada, consectetur mi et, sagittis tellus. Curabitur
                tincidunt lacus sed mollis tempor.
                <br /><br />
                Vivamus at ultrices lectus. Nullam vulputate arcu id semper aliquam.
                Quisque id nisi consectetur, sodales neque quis, fringilla velit.
                Mauris fringilla sollicitudin urna vel consequat. Ut faucibus quis
                dui eget sagittis. Donec blandit, metus a luctus placerat, tellus
                massa porttitor mauris, vel vehicula arcu ex sed sapien. Etiam ullamcorper
                suscipit felis, lacinia commodo nibh venenatis at. Interdum et malesuada
                fames ac ante ipsum primis in faucibus. Etiam facilisis at lectus
                sit amet tincidunt. Proin et aliquam ligula. Donec mattis ac arcu
                quis pretium. Nulla tempor nulla neque, vel accumsan diam convallis
                vitae. Donec ac facilisis purus. Donec blandit lectus at hendrerit
                porta. Quisque accumsan rutrum neque porta fringilla. In hac habitasse
                platea dictumst.
                <br /><br />
                Aliquam faucibus ante at elit accumsan, eget tristique lacus maximus.
                Quisque maximus turpis quis convallis laoreet. Nam gravida, magna
                non scelerisque tincidunt, massa mi convallis enim, et semper tellus
                augue tincidunt odio. Duis accumsan luctus lacinia. Pellentesque
                nec interdum ante. Vestibulum tempor, leo ut iaculis pretium, quam
                quam condimentum dui, id ullamcorper dui ipsum vitae nisi. In hac
                habitasse platea dictumst. Morbi et ullamcorper ligula, ut convallis
                massa. Fusce ac nisi non libero euismod ornare. Maecenas blandit
                velit et justo finibus, eget lacinia augue sollicitudin. Aenean vestibulum
                id purus ac lacinia.
                <br /><br />
                Phasellus sed neque eu velit finibus blandit scelerisque id sapien.
                Pellentesque habitant morbi tristique senectus et netus et malesuada
                fames ac turpis egestas. Curabitur a molestie diam. Fusce sagittis
                interdum elit ac venenatis. Morbi sapien urna, aliquet a suscipit
                id, pellentesque eget orci. Nam pharetra faucibus elit ac tincidunt.
                Phasellus pretium ac nisi aliquet placerat. Pellentesque iaculis
                elit vel eleifend rutrum. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Sed scelerisque neque et dolor vehicula finibus.
                Phasellus finibus consectetur est, ut cursus erat laoreet id. Nulla
                feugiat cursus ligula, sit amet efficitur justo tempus at.
            </div>
        </div>
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
        text-align: center;
        color: white;
        font-family: 'azo-sans-uber';
        font-size: 2.5rem;
    }
    .desc-box {
        background: #1a1b1c;
        box-shadow: -4px -4px 4px rgba(109, 109, 109, 0.5), 4px 4px 4px #060c18;
        border-radius: 42px;
    }
    .document {
        color: #ffffff;
        font-weight: 300;
        font-size: 1rem;
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
        .desc-box {
            border-radius: 20px;
        }
        .document {
            font-size: 0.9rem;
        }
    }
    @media (max-width: 576px) {
        .wraper img {
            width: 55%;
            margin-bottom: 1rem;
        }
    }
</style>
