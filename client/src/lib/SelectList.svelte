<script lang="ts">
  import type { EventType } from "./Instruction.types";


    export let id: string;
    export let selectorFunction: (val: string) => void;
    export let ItemList: string[];
    export let selected: string;
    export let top = "-100px";
    export let left = "-50px";
    export let relPos = false
    export let color = "";
</script>


<div class="SelectorListCont" class:relPostion={relPos}
    style="--left:{left}; --top:{top};  --colors:{color};"
>
    {#each ItemList as item, i}
        <span   data-id={id}  
        class="item {selected === item ? "selected" : ""} " 
        on:click={() => selectorFunction(item )}> {item}  </span>
    {/each}
</div>

<style>
    .SelectorListCont {
        width: 80%;
        margin-inline: auto;
        margin-top: 30px;
        /* background-color: aliceblue; */
        background-color: var(--colors);
        /* background-color: red; */
        border: 5px dotted greenyellow;
    }

    .item {
        /* padding: 2px 2px; */
        display: inline-block;
        margin:  2px 3px;
        min-width: 30px;
        text-align: center;
        border: 1px solid black;
    }
    .selected {
        background-color: cornsilk;
    }
    .relPostion {
        position: absolute;
        z-index: 9;
        left: clamp(100px, var(--left), 90wh );
        top: clamp( 100px, var(--top), 90vh);
    }
</style>