<script lang="ts">
  import { space } from "svelte/internal";
  import { KeysList } from "./Clickable.types";
  import { EventType,keyBoardEvent , InstructionType, MouseClickEvents, MouseMoveEvent, type Instruction } from "./Instruction.types";
//   import InstructionList from "./InstructionList.svelte";
  import { addLog } from "./LoggerStore";
  import SelectList from "./SelectList.svelte";


    export let ins_id : string;
    export let ins_setter: (v: string, id: string) => void
    export let instruction: Instruction = { type: InstructionType.KeyBoardKeys }
    export let deleter: (id: string) => void;
    let InstructionList = Object.values(InstructionType)
    // InstructionList.length =InstructionList.length/2.
    $: addLog(instruction.type)
    let ClickListSelection = KeysList[0];
    let KeySelection = false
    $: instruction.info = ClickListSelection
</script>


<div class="InstrcutionViewCont" id={ins_id}>
    <button on:click={() => deleter(ins_id)} > - </button>
    <select name="instructions" id="insSelect" bind:value={instruction.type}>
        {#each InstructionList as ins }
            <option value={ins}> {ins} </option>
        {/each}
    </select>
    {#if instruction.type === InstructionType.KeyBoardKeys || instruction.type === InstructionType.DSL}
    <input class="KeyInput" bind:value={instruction.info} type="text" placeholder="instruction text">
    {:else if MouseMoveEvent.includes(instruction.type) }
    
    <input class="MouseMoveInout" bind:value={instruction.info} type="text" placeholder="X, Y" >
    <!-- <input class="MouseMoveInout" placeholder="X" type="number">
    <input  class="MouseMoveInout"  placeholder="Y" type="number"> -->
    {:else if MouseClickEvents.includes(instruction.type)}
    <span>---</span>
    {:else if keyBoardEvent.includes(instruction.type)} 
        {#if !KeySelection}
            <button  on:click={() => KeySelection = true}>Open Keys</button>
            <span style="color:black">{ClickListSelection}</span>
        {:else}
        <SelectList 
        relPos={true}
        id={'KeyList'}
        ItemList={KeysList}
        selectorFunction={(v) => {ClickListSelection = v; KeySelection=false }}
        selected={ClickListSelection}
        color="rgb(240, 240, 240)"
        />
        {/if}
    {/if}
</div>


<style>
    .InstrcutionViewCont {
        width: 90%;
        /* height: 1.5rem; */
        margin-top: 10px;
        margin-inline: auto;
        /* background-color: rgb(87, 86, 86); */
        /* z-index: 6; */

    }
    select{
        display: inline-block;
        width: 30%;
    }
    .KeyInput {
        display: inline-block;
        width: 55%;
    }
    
    .MouseMoveInout {
        display: inline-block;
        width: 20%;
        
    }

    button{
        display: inline-block;
    }
</style>


