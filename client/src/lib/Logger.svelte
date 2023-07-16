<script lang="ts">
  import { fade } from "svelte/transition";
    import { LogsStore} from "./LoggerStore"
  import { beforeUpdate, afterUpdate } from 'svelte';


    export let top: Number = 0;;
    export let right: Number = 0;


    // let logs = ["s", "a", "aaa"];


let div;
let autoScroll;

beforeUpdate(() => {
  autoScroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20)
})

afterUpdate(() => {
  if (autoScroll) div.scrollTo(0, div.scrollHeight)
})



</script>

<div 
 bind:this={div}
class="loggs"
style={`right: ${right}px; 
        ${ top === 0 ? "" : `top: ${top};` } `}
    in:fade="{{ duration: 300 }  }"
    out:fade="{{ duration: 300 }  }"
>
<ul class="logg_list">
        {#if $LogsStore.length !== 0}
        {#each $LogsStore as log}
            <li >{ log.slice(1, log.length-1) }</li>
        {/each}
        {:else}
        <p>Empty</p>
    {/if}
    </ul>
</div>



<style>



    ul {
        list-style: none;
    }


.loggs {
        padding: 5px;
        /* padding: 10px; */
        /* background-color: gainsboro; */
        position: absolute;
        /* right: 10px; */
        width: 200px;
        min-height: 100px;
        max-height: 65%;
        overflow-y: auto;
        z-index: 99;
        
    }
    .logg_list {
        margin: 0px;
        padding: 5px;
        min-height: 100px;
        color: darkslateblue;
        background-color: rgb(252, 252, 252);
        border: 1px solid rgba(39, 39, 39, 0.404);
    }
    .logg_list li:nth-child(even) {
        background-color: rgba(128, 128, 128, 0.212);

    }
    .loggs p {
        text-align: center;
        color:gray
    }


</style>