
<script context="module">

    export let counter = 0;
    export const addC = () => {counter++;} 


</script>


<script lang="ts">
  import { onMount, afterUpdate, beforeUpdate, onDestroy } from "svelte";
import Icon from '@iconify/svelte';

import { addLog } from "./LoggerStore";
    import {editState} from "./EditState"
  import ClickableEditor from "./ClickableEditor.svelte";

//   import { onMount } from "";



    export let size = 50;
    export let shape = "default";
    export let wid = size;
    export let heit = size
    let self: HTMLDivElement|null;
    export let top = 200;
    export let left = 200
    let thisComponentId = counter
    export let text = `Btn ${thisComponentId}`
    let settingsSWwitch = false
    export let maxSize = 200;
    export let minSize = 50;
    onMount(() => {

        self.style.width = `${wid}px`       
        self.style.height = `${heit}px`
        addLog(` some ${self.style.maxWidth} ${self.style.maxHeight}`)
    })


    $: if (self){
        console.log("Changed")        
        self.style.top = `${top}px`
        self.style.left = `${left}px`
    }
    
    $: {
	// if (self) {
    //     self.style.width = `${wid}px`       
    //     self.style.height = `${heit}px`
	// }
    }
    


    addC()
    console.log("rendered")
    /*      */
    
    let dblClickTime = 250;
    let isEnded = false
    let isMoving = false;
    let clicks = 0;
    let offX = 0;
    let offY = 0
    let prevPos = []
    
    const touchStartHnadler = (e: TouchEvent) => {
        isEnded = false;
        clicks++
        let touches = e.touches;

        if ($editState){
            heit = Number(self.style.height)
            wid = Number(self.style.width)
            if (touches.length !== 1) {
                addLog(`Unimplemented:${ e.touches.length }touch[Editing](${thisComponentId})`)

            } else {

                offY = top - touches[0].clientY
                offX = left - touches[0].clientX
                prevPos = [offX, offY]
            }

            setTimeout(() => {
                if (!isMoving && isEnded) {
                    showingEditor = !showingEditor;
                    addLog(`Touch[EditMode](${thisComponentId})`)
                }
                // clicks=0
            }, 100)
            
            return;
        }

        setTimeout(()=> {
            if (!isMoving && isEnded) {
                if (clicks === 1) {
                    addLog(`1 Touches(${thisComponentId})`)

                } else if (clicks === 2) {
                // console.log("Two tap")
                addLog(`2 Touches{${thisComponentId}}`)
                } else if(clicks === 3) {
                // console.log("triple tap")
                addLog(`3 Touches{${thisComponentId}}`)
                }

            }
            clicks = 0;
        }, dblClickTime)
    }
    const handleTouchCancel = (e: TouchEvent) => {
        isMoving = false
        isEnded = true;
    }
    const handleTouchEnd = (e: TouchEvent) => {
        isMoving = false
        isEnded = true
    }
    const handleTouchMove = (e: TouchEvent) => {
        isMoving = true
        prevPos = [e.touches[0].clientX, e.touches[0].clientY]
        if ($editState) {
            top = e.touches[0].clientY + offY;
            left = e.touches[0].clientX + offX;
        } else {

        }

    }

    $: {
        $editState;
        showingEditor = false
    }
    let editerList;
    let showingEditor = false
    $: {
        if(editerList) {
            console.log( editerList.style)
            editerList.style.left = `${left - editerList.offsetWidth -5}px`
            editerList.style.top = `${top - 3}px`
        }
    }


let pos = [ 0, 0 ]
const onSizeChang = (e) => { 
	pos[0] = e.touches[0].clientX
	pos[1] = e.touches[0].clientY
}

const changeSize = ( e ) => { 
    let posX = e.touches[0].clientX
	let posY = e.touches[0].clientY
	
	let changeX = posX - pos[0] 
	let changeY = posY - pos[1] 
	let pro = (changeX * pos[0] + changeY * pos[1]) /2000	
	
	if ( checkSizeL(50)) { 
        	size = 50
		return
	} 
	if ( checkSizeG(200)) { 
        	size = 200
        	return
        }
    size += pro > 0 ? 2 : -2;
    // size = parseInt(self.style)
	addLog( `size: ${size}` )
	addLog( `prto: ${pro}` )
}

const checkSizeG = (v ) => { 
	return v < size
}

const checkSizeL = (v ) => { 
	return v > size
}

    
</script>

<!-- on:touch={() => { top+=50; left+=50 }} -->
<!-- on:click={() => { top+=50; left+=50; }}
on:keypress={() => { top+=50; left+=50 }} -->

<div class="ClickablesCont" style=" --top:{top}px;--left:{ left }px;  --size:{size}px; --heit={heit}px; --wid={wid}px --maxSize: {maxSize}px; --minSize:{minSize}px; " >
<div class="Clickables"  
    bind:this={self}

    on:touchstart|preventDefault={touchStartHnadler}
    on:touchmove|preventDefault={handleTouchMove}
    on:touchcancel|preventDefault={handleTouchCancel}
    on:touchend|preventDefault={handleTouchEnd}

    >
    {text}
</div>
{#if $editState && showingEditor}
<ul  bind:this={editerList} class="EditModeOptions">
    <li on:click={() => { addLog(`Edit Name(${thisComponentId})`) }}  >
<Icon icon="material-symbols:edit-outline" color="black" width="24" inline={true} />
    </li>
    <li on:click={() => { addLog(`Remove (${thisComponentId})`) }}  >
<Icon icon="ic:baseline-delete-outline" color="black" width="24" inline={true} />
    </li>
    <li on:click={() => {  settingsSWwitch = true; addLog(`More Options(${thisComponentId})`) }}  >
<Icon icon="mdi:dots-vertical" width="24" inline={true} />

    </li>
</ul>
<!-- <div 
on:touchstart|preventDefault={ onSizeChang }
on:touchmove|preventDefault={ changeSize }
class="SizeOption">
	.
</div> -->

{/if}

{#if $editState && settingsSWwitch} 
    <ClickableEditor name={text} CloseCompo = {() => { settingsSWwitch = false }}  />
{/if}
</div>

<style>
    .Clickables {
        background-color: darkgray;
        /* display: ; */
        z-index: 2;
        position: absolute;
        resize: both;
        overflow: hidden;
        /* left: var(--left);
        top: var(--top); */
        /* width: var(--wid); */
        /* height: var(--heit); */
        /* width: 100px;
        height: 100px; */
        max-width: var(--maxSize)  ;
        
        max-height: var(--maxSize)  ;
        min-height: var(--minSize)  ;
        min-width: var(--minSize)  ;
       
        /* max-width: 200px;
        max-height:200px;
        min-height:50px;
        min-width: 50px; */
        
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .EditModeOptions {
        list-style: none;
        display: flex;
        flex-direction: column;
        position: absolute;
        /* top: -50px; */
        left: 100px;
        margin: 3px;
        padding: 3px;
        border: 1px solid black;
    }

    .SizeOption { 
    	z-index:2;
    	display: inline;
    	
	width: 15px;
    	height: 15px;
    	/*
	width:15px;
	height:15px;
	*/
	border: 2px blue solid;
	border-radius: 50%;
	position: absolute;
	background-color: blue;
	top: calc( var(--size) + var(--top) - 12px );
	left: calc( var(--size ) + var(--left) - 12px ) ;
  
  /*
  	top: var(--top);
	left: var(--left);
    */
    }
</style>
