<script lang="ts">
  import { addLog } from "./LoggerStore";
import {canvasState} from "./CanvasState"
import { SocketSendData, socketState, tryConnectWs } from "./socket" 
import type { Res } from "./socket" 

  // let count: number = 0
  // const increment = () => {
  //   count += 1
  // }

let canvas;
let moving = false;
let touche = 0;
let dblClickTime = 250;
let multiTouchCount = 0
let prevCoords = [0, 0]
let ended = false;
let prevTme = 1000
const dataSendingTimerFPS = 1000/60
let sensitivity = 2.5
let diffX = 0;
let diffY = 0;
let DataSendingTimer = null;



const handleTouchStart = (e: TouchEvent) => {
  

  let touches = e.touches;
  ended = false
  if (touches.length >= 2) {

    let t = []
    for (let toch of touches) {
      t.push(toch.clientX)
      t.push(toch.clientY)
    }
    prevCoords = t;


    multiTouchCount = touches.length
    setTimeout(()=> {
      if (!moving && ended) {
        if (multiTouchCount === 2) {
          // console.log("Two tap")
          addLog("2 Touches")
          let s =SocketSendData("MCl 1 2")
          
        } else if(multiTouchCount === 3) {
          // console.log("triple tap")
          addLog("3 Touches")
          let s = SocketSendData("MCl 1 3")
        }

      }
      touche = 0
      multiTouchCount = 0;
    }, 201)
  } else if (touches.length === 1) {
    touche++;
    prevCoords = [e.touches[0].clientX, e.touches[0].clientY]
    setTimeout(() => {
	prevTme = e.timeStamp
      if (!moving && ended) {
        if (touche == 1) {
          // console.log("Single")
          addLog("1 Click")
          let s = SocketSendData("Cl 1")
        } else if (touche == 2) {
          // console.log("Double")
          addLog("2 Click")
          let s =SocketSendData("Cl 2")
        }else if (touche == 3) {
          // console.log("Triple")
          addLog("3 Click")
          let s =SocketSendData("Cl 3")
        }
      }
      
      touche = 0
    }, dblClickTime)
    
  
  }
  
}

let movabled = false;

const handleTouchMove = (e: TouchEvent) => {
  
  e.preventDefault()
  
  // e.stopPropagation()
  //addLog(`Touch while dragginh ${touche}`)
  // console.log( 'Time chng', e.timeStamp -  prevTme )
  // addLog( `Time chng ${e.timeStamp -  prevTme}, ${movabled}`)
  if( e.timeStamp -  prevTme < dblClickTime*2 && !movabled && !moving ) {
    touche = 0
    SocketSendData( "Dr S"  )
    movabled = true
  } 
  moving = true;
  let touches = e.touches;
  if (touches.length === 1) {

    if (!DataSendingTimer) {
      dataSendPerTimer()
      DataSendingTimer = setInterval(() => { 
        dataSendPerTimer()
      }, dataSendingTimerFPS);
    }

    let touch = touches[0]  
    
    diffX +=	-(prevCoords[0] - touch.clientX)
    diffY += -(prevCoords[1] - touch.clientY)
    
    prevCoords = [touch.clientX, touch.clientY]

    addLog(`x: ${parseInt(touch.clientX)}, y: ${parseInt(touch.clientY)}`)
	// let s =SocketSendData( `Dr ${diff[0]} ${diff[1]}` )

  } else if (touches.length === 2) {
      
  } else {

    addLog(`Unimplemented: ${ e.touches.length } touch move`)
  }

}

const handleTouchCancel = (e: TouchEvent) => {
  if (DataSendingTimer) {
    clearInterval(DataSendingTimer)
    DataSendingTimer = null
  }
  diffX = 0;
  diffY = 0;
  moving = false
  ended = true;
}
const handleTouchEnd = (e: TouchEvent) => {
  if (DataSendingTimer) {
    clearInterval(DataSendingTimer)
    DataSendingTimer = null
  }
  if ( movabled ) { 
    prevTme = -1000
    SocketSendData( "Dr E"  )
    diffX = 0;
    diffY = 0;
    touche = 0
  addLog("ended in")
    
  }
  addLog( touche )
  movabled = false
    moving = false
    ended = true

}

const dataSendPerTimer = () => { 
  // addLog(`${moving} ${!ended} ${diffX} ${diffY}`)
    if (moving && !ended ) {
      if (diffX !== 0 || diffY !== 0 ) {
        let [vX, vY] = getdiff()
        addLog(`Sending: ${vX}, ${vY}`)
        SocketSendData(`Dr ${vX} ${vY}`);
        diffX = 0;
        diffY = 0;
      }
    }
 }
  
 const getdiff = () => { 
  return [
    Math.round(diffX * sensitivity),
    Math.round(diffY * sensitivity)
  ]
}

// $: sty = 

</script>
<!-- 
<button on:click={increment}>
  count is {count}
</button> -->
<!--------------------------HTML          -------------------->
<div class="CanvaCont"  >

  {#if $canvasState}
  
  <canvas 
  style="{ $socketState ? "border-color:green;" : "border-color:red;" }"
bind:this={canvas}
  on:touchstart=    {handleTouchStart}
  
  on:touchmove =    {handleTouchMove}
  on:touchcancel =  {handleTouchCancel}
  on:touchend =     {handleTouchEnd}
  
  />
  {:else}
<canvas/>
{/if}

</div>
<!-------------------------- /HTML          -------------------->
<style>

  .CanvaCont {
    width: 100vw;
    height: 100vh;
    background-color: azure;
    display: flex;
    align-items: center;
    justify-content: center;
/*    z-index: -2;*/
  }

  canvas {
    border: 5px black;
    height: 80%;
    width: 80%;
    border-width: 3px;
    border-style: solid;
    /* border: 2px solid; */
/*    z-index: -1;*/
  }
  </style>
