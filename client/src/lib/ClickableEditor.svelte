
<script lang="ts">
  import { each } from "svelte/internal";
  import { get } from "svelte/store";
    import {Keys} from "./Clickable.types"
  import { EventType, InstructionType, type Instruction } from "./Instruction.types";
  import InstructionView from "./InstructionView.svelte";
  import { addLog } from "./LoggerStore";
  import SelectList from "./SelectList.svelte";
    export let name = "None";
    let selected = "";
     
        // $selected;
    $: addLog(selected)

    // let InstructionMap = new Map<string, string[]>()
    // InstructionMap.set("Single Click", [])
    // InstructionMap.set("Double Click", [])
    // InstructionMap.set("Triple Click", [])
    let InstructionMap = {
        // "SingleClick": [],
        // "DoubleClick": [],
        // "TripleClick": []
    }
    export let CloseCompo: ()=> void;
    
    // const ClickList = ["Single Click", "Double Click", "Triple Click"]
    const ClickList = Object.values(EventType) as string[]
    ClickList.length = ClickList.length/2
    ClickList.forEach((v) => { InstructionMap[v] = [] })
    
    const EventList = ["Key Event", "Coustom Event"]
    const KeyList = Object.keys(Keys)
    


    let ClickListSelection = ClickList[0] 
    let EventListSelection = "SingleClick" 
    let KeyListSelection = "SingleClick" 
    $: addLog(ClickListSelection)
    $: addLog(EventListSelection)
    $: addLog(KeyListSelection)

    const addInstrcution = () => {
        // let old = (InstructionMap.get(ClickListSelection))
        // InstructionMap.get(ClickListSelection).push("Empty")
        // InstructionMap.set(ClickListSelection, [...old, "Empty"])
        let newIns: Instruction = {
            type: InstructionType.KeyEvent,

        }
        InstructionMap[ClickListSelection] = [...InstructionMap[ClickListSelection], newIns  ]
    }

    const ins_set = (v, id) => {

    }

    const saver = ( ) => {
        console.log(InstructionMap)
    }

    const deleter = (id: string) => {
        let [selected, idx] = id.split("-")
        addLog(` :: ${selected}   ${idx}`)
        // InstructionMap[selected].filter  idx
        let idxn = Number(idx)
        let new_ins = InstructionMap[selected].filter((_, i) => i !== idxn )
        InstructionMap[selected] = new_ins
        console.log(InstructionMap[selected])
    }
    console.log(ClickList)
</script>

<div class="ClickableEditorCont">
    <div class="topbar">

        <span>{name}</span>
        <button class="CloseBtn" on:click={CloseCompo}> X </button>
    </div>
    <SelectList 
    id={'ClickList'}
    ItemList={ClickList}
    selectorFunction={(v) => ClickListSelection = v }
    selected={ClickListSelection}
    
    />
   
    <div class="InstructionList">
        {#each InstructionMap[ClickListSelection] as instr, i }
            <!-- <div id={`${ClickListSelection}-${i}`}>inst:  {instr} </div> -->
            <InstructionView  
            ins_id={`${ClickListSelection}-${i}`}
            ins_setter={(v, id) => ins_set(v, id)}
            deleter={deleter}
            instruction={instr}
            />
            {/each}
    </div>
        <button class="addBtn" on:click={addInstrcution}> + </button>
        <button class="clearBtn" on:click={() => InstructionMap[ClickListSelection] = []}> _ </button>
        <button class="saveBtn block sty"
            on:click={saver}
        >Save</button>
    <!-- <div>

        <SelectList 
        id={'EventList'}
        ItemList={EventList}
        selectorFunction={(v) => EventListSelection = v }
        selected = {EventListSelection}
        />
        <SelectList 
        id={'KeyList'}
        ItemList={KeyList}
        selectorFunction={(v) => KeyListSelection = v }
        selected={KeyListSelection}
        />
    </div> -->



<!-- 
    <div>

        <h3>{name}</h3>
        <button on:click={CloseCompo}> Close </button>
    </div>
    
    <div>

        <label for="handlers">Select Event Type:</label>
        <select name="handlers" >
            <option value="single-click">Single click</option>
            <option value="double-click">Double click</option>
            <option value="triple-click">triple click</option>
             <option value="opel">Opel</option>
            <option value="audi">Audi</option> 
        </select>
    </div>
        
    <div>

        <label for="events">Select Event Type:</label>
        <select name="events" >
            <option value="Key-Event">Key Event</option>
            <option value="Coustom-Event">Coustom Evet</option>
             <option value="opel">Opel</option>
            <option value="audi">Audi</option> 
        </select>
    </div>

    <div>

        <label for="eventsvalue">Select Event Type:</label>
        <select name="eventsvalue" >
            <option value="Key-Event">Key Event</option>
            <option value="Coustom-Event">Coustom Evet</option>
             <option value="opel">Opel</option>
                <option value="audi">Audi</option> 
        </select>
    </div>
    <div class="KeyData">
        <input pattern="[A-Za-z0-9]{1}" type="text" placeholder="Key Character"> 
        <div class="keyList">
            {#each Object.keys(Keys) as key }
                <span class="KeyItem" on:click={ () => {selected = key}} > {key} </span>
            {/each}
        </div>
    </div> -->




</div>


<style>
div {
    display: block;
}

    .ClickableEditorCont {
        z-index: 4;
        position: absolute;
        background-color: rgb(255, 255, 255);
        left: 10%;
        top: 100px;
        width: 400px;
        height: 500px;
        /* max-width:300px ; */
        /* display: flex; */
        /* justify-content: center;
        align-items: center; */
        overflow-y: auto;
        box-shadow: 3px 3px 5px 5px rgb(200,200,200);
    }

    .ClickableEditorCont div {
        margin-inline: 10px ;
    }

    .keyList {
        background-color: whitesmoke;
        text-shadow: 1px black;
        /* box-shadow: ; */
        /* display: flex; */

    }
    .KeyData {
        width: 270px;
        max-width: 270px;
    }
    .KeyItem {
        margin: 2px 4px;
        /* outline: grey solid 2px; */
        border: 1px solid grey;
        /* box-shadow:1px 1px 1px black; */
    }
    .topbar {
        display: flex;
        background-color: beige;
    }
    .topbar span {
        margin-top: 10px;
    }

    .CloseBtn {
        margin-left:auto ;
        margin-top: 10px;
    }
    .InstructionList {
        max-height: 60%;
        overflow-y: auto;
    }
    .addBtn, .clearBtn, .saveBtn{
        min-width: 2.5rem;
        min-height: 2.5rem;
    }
    .block {
        display: block;
    }

    .sty {
        /* align-items: center;
        justify-content: center; */
        margin-inline: auto;
        width: 20%;
    }
</style>