<script lang="ts" >
import Icon from '@iconify/svelte';
import { fade, fly } from 'svelte/transition';
  import Logger from './Logger.svelte';
  import { LogsStore } from './LoggerStore';
import {canvasState} from "./CanvasState.ts"
  import { editState } from './EditState';
  import Clickables from './Clickables.svelte';

    let some;

    let logDisplaying = false
    // let CanvasState = true;
    const loggDisplay = () => {
        logDisplaying = !logDisplaying;
    }

    let clickables = [];

    const addClickable = (v:any) => {

    }



</script>

<div>
    <ul class="navbar_list">
        <li 
            on:keypress={() => { LogsStore.clear() }}
            on:click={() => { LogsStore.clear() }}
        >  <Icon icon="carbon:clean" color="blue" width="30" inline={true} />   </li>
<!--  -->
        <li 
            on:click={() => {  canvasState.toggle()  }}
            on:keypress={() => {  canvasState.toggle()  }}
        > 
	<Icon icon="material-symbols:circle-outline" color={ $canvasState ? "blue" : "grey"} width="30" inline={true} />

	</li>
<!--  -->
        <li 
            on:click={() => {  editState.toggle()  }}
            on:keypress={() => {  editState.toggle()  }}
        >  
	<Icon icon="material-symbols:edit-document-outline-sharp" color={ $editState ? "blue" : "grey"} width="30" inline={true} />

	</li>
<!--  -->
        <li 
            on:click={() => {  clickables = [...clickables, 1]  }}
            on:keypress={() => {  clickables = [...clickables, 1]  }}
        >   <Icon icon="ic:outline-plus" color="gray" width="30" inline={true} />
  </li>
<!--  -->
        <li class="logg-btn"
            on:click={loggDisplay}
            on:keypress={loggDisplay}
        >  <Icon icon="icon-park:log" inline={true} width="30" />  </li>
    </ul>
    {#if logDisplaying}
        <Logger right={10} />

    {/if}

    {#each clickables as cliackable }
        <Clickables />
    {/each}

</div>


<style>

    /* .LoggerCont {

    } */

    ul{
        list-style: none;
    }


    .navbar_list {
        margin-block: 1px;
	height: 40px;
        background-color: beige;
        display: flex;
        flex-direction: row;
        list-style: none;
        padding-inline: 20px;
        
    }

    .logg-btn {
        margin-left: auto;

    }

    .navbar_list li {
        padding: 5px 7px ;
    }

    .logg-btn:hover,.logg-btn::selection {
        background-color: bisque;
    }

   

     
</style>
