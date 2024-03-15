<script>
    import { writable } from "svelte/store";
    import { onMount } from "svelte";
    import { teleEventList, gameData } from "./stores"
    import { ContextMenu, ContextMenuItem, MenuItemShape, FieldImageConfig, config_full_2024 } from "./field"
    import { getMousePos, drawCircle, Colors, AllianceColor } from "./field_utils"
    import * as events from "./field_events"

    export let canvasSize={w:910, h:470}
    export let alliance = AllianceColor.blue

    //-- Component-specific variables
      let canvas;
      let ctx;
      let fieldConfig = FieldImageConfig.from(config_full_2024)

    //-- Component state
      let currPos;
      let currEvent;
      
      $: {
            currEvent = ($teleEventList.length>0) ? $teleEventList.slice(-1)[0] : null
            currPos = (currEvent) ? currEvent.pos : null
      }

      let contextMenu = null;
      let mouseDown = false;
      let loaded=false;
    
  
    //-- Setup event handlers
      onMount(() => {
        ctx = canvas.getContext("2d");
        canvas.addEventListener("mousedown", mouseDownHandler);
        canvas.addEventListener("mousemove", mouseMoveHandler);
        canvas.addEventListener("mouseup", mouseUpHandler);    
  
        canvas.addEventListener("touchstart", touchStartHandler);   
        canvas.addEventListener("touchmove", touchMoveHandler);   
        canvas.addEventListener("touchend", touchEndHandler);   

        fieldConfig.setDims(canvas.width, canvas.height)
        console.log(fieldConfig)

        loaded=true;
        renderEvents()
      });
  

    //-----------------------------
    //  Game Event Helpers
    //------------------------------
  
      /**
       * Add point to the event queue
       * @param  {[{x,y}] pos } position of mouse event
       */
        function addMoveEvent(pos) {
            // Update position
            if(currPos==null){
                const init = new events.InitEvent(pos) 
                addGameEvent(init);
            }
            else{
                const m = new events.MoveEvent(pos) 
                addGameEvent(m);
            }
        }
  
        /**
         * Add point to the event queue (TODO: refactor to handler class with callbacks)
         * @param  {[GameEventType] e }
         */
        function addGameEvent(e) {
            
            if(currEvent==null && e.name!=events.GameEventType.init){
                console.log("Robot has not been placed on the field")
                return
            }
            
            let history_len = $teleEventList.length;
            if(history_len>0)
                e.prevEvent = $teleEventList[history_len-1];

            $teleEventList.push(e)
            $teleEventList=$teleEventList
    
            //Update normalized coordinates (refactor to be done in event factory?)
            e.setNormPos(fieldConfig.getNormCoord(e.pos.x, e.pos.y))

            console.log("Added  event [e: "+ e + "]");
            console.log(e)
            updatePoints(e)
            renderEvents()
        }

       
        /**
         * Function to update game scoring based on game event
         * NOTE: Needs refactored to remove if/else structure
         * @param event
         * @param undo
         */

        function updatePoints(event, undo=false) {
            console.log("Updating events: " + event)

            if (event.name=="scoreAmp"){
                if(undo)
                    $gameData.TeleAmpNoteSuccess--;
                else
                    $gameData.TeleAmpNoteSuccess++;

            }        
            else if (event.name=="scoreSpeaker"){
                if(undo)
                    $gameData.TeleSpeakerNoteSuccess--;
                else
                    $gameData.TeleSpeakerNoteSuccess++;

            }
            else if (event.name=="missSpeaker"){
                if(undo)
                    $gameData.TeleSpeakerNoteFail--;
                else
                    $gameData.TeleSpeakerNoteFail++;

            }
            else if (event.name=="missAmp"){
                if(undo)
                    $gameData.TeleAmpNoteFail--;
                else
                    $gameData.TeleAmpNoteFail++;

            }

        }
  
        /**
         * Remove last game event added to queue
         * NOTE: This function must be able to unroll
         * all of the robot state to work correctly
         */
        export function undo() {
            updatePoints(currEvent, true)
            $teleEventList= $teleEventList.slice(0, -1);
            $teleEventList=$teleEventList           
            renderEvents()
        }

  
    //-----------------------------
    //  Combined logic for touch and mouse events
    //------------------------------
      /**
       * Logic for when a down event (mouse or touch) is detected
       * @param pos Location of event
       */
      function downEvent(pos){
        mouseDown = true;
        let nitems=8
        let shape = MenuItemShape.circ
        contextMenu = new ContextMenu(ctx, pos, nitems)
        contextMenu.addItem(new ContextMenuItem(() => {addGameEvent(new events.PickupEvent(pos))}, Colors.darkorange, null, shape))
        contextMenu.addItem(new ContextMenuItem(() => {addGameEvent(new events.SpeakerScoreEvent(pos))}, Colors.green, null, shape))
        contextMenu.addItem(new ContextMenuItem(() => {addGameEvent(new events.DropEvent(pos))}, Colors.black, null, shape))
        contextMenu.addItem(new ContextMenuItem(() => { addGameEvent(new events.PickupEvent(pos)); 
                                                        addGameEvent(new events.SpeakerScoreEvent(pos))}, 
                                                Colors.green, 
                                                Colors.darkorange, shape))
        contextMenu.addItem(new ContextMenuItem(() => { addGameEvent(new events.PickupEvent(pos)); 
                                                        addGameEvent(new events.SpeakerMissEvent(pos))}, 
                                                Colors.red, 
                                                Colors.darkorange, shape))
        
        contextMenu.addItem(new ContextMenuItem(() => {addGameEvent(new events.AmpMissEvent(pos))}, Colors.burgundy, null, shape))
        contextMenu.addItem(new ContextMenuItem(() => {addGameEvent(new events.AmpScoreEvent(pos))}, Colors.blue, null, shape))
        
        contextMenu.addItem(new ContextMenuItem(() => {addGameEvent(new events.SpeakerMissEvent(pos))}, Colors.red, null, shape))

        addMoveEvent(pos); 
      }
  
      /**
       * Logic for when a up event (mouse or touch) is detected
       * @param pos Location of event
       */
      function upEvent(pos){
        if(contextMenu!=null)
          contextMenu.run()
  
        contextMenu = null;
        mouseDown = false;
        renderEvents();
      }

  
      /**
       * Logic for when a move event (mouse or touch) is detected
       * @param pos Location of event
       */
      function moveEvent(pos){
        if(contextMenu!=null) {   
          console.log("Move position:" + pos)
          contextMenu.highlight(pos)   
        }  
      }
  
    //-----------------------------
    //  Mouse event handler 
    //------------------------------
    
      function mouseDownHandler(e) {
        console.log("Mouse down");
        var pos = getMousePos(canvas, e);
        downEvent(pos)
      }
  
      function mouseUpHandler(e) {
        console.log("Mouse up");
        var pos = getMousePos(canvas, e);
        upEvent(pos)
      }
  
      function mouseMoveHandler(e) {
        console.log("Mouse move");
        let pos = getMousePos(canvas, e)
        moveEvent(pos)
      }
  
    //-------------------------
    //  Touch event handlers
    //-------------------------
  
      function touchStartHandler(e) {
        console.log("Started touch")
        e.preventDefault(); 
        console.log(e)
        
        var pos = getMousePos(canvas, e.touches[0])
        downEvent(pos)
      }
  
      function touchMoveHandler(e) {
        console.log("Move touch")
        e.preventDefault();
        let pos = getMousePos(canvas, e.touches[0])
        moveEvent(pos)  
      }
  
      function touchEndHandler(e) {
        console.log("End touch")
        e.preventDefault();
        mouseUpHandler(e)
      }
  
  
    //-------------------------
    //  Rendering 
    //-------------------------
  
      /**
       * Event specific rendering functions
       */
      let drawFun = {
        "move" : (e) => {
                    ctx.beginPath();
                    ctx.strokeStyle = Colors.white
                    ctx.lineWidth = 2
                    ctx.moveTo(e.prevEvent.pos.x, e.prevEvent.pos.y);
                    ctx.lineTo(e.pos.x, e.pos.y);
                    ctx.stroke();
                  },
        "pickup" : (e)=> {
                      drawCircle(ctx, e.pos, Colors.darkorange, 10);
                  },
        "drop" : (e)=> {
                      drawCircle(ctx, e.pos, Colors.black, 10);
                  },
        "scoreSpeaker" : (e)=> {
                      drawCircle(ctx, e.pos, Colors.green, 10);
                  },
        "missSpeaker" : (e)=> {
                      drawCircle(ctx, e.pos, Colors.red, 10);
                  },
        "scoreAmp" : (e)=> {
                      drawCircle(ctx, e.pos, Colors.blue, 10);
                  },
        "missAmp" : (e)=> {
                      drawCircle(ctx, e.pos, Colors.burgundy, 10);
                  },
        "init" : (e)=> {
                      drawCircle(ctx, e.pos, Colors.cyan, 10);
                  }
      }
  
  
      /**
       * Redraws all events on the canvas.
       * NOTE: This function should be called any time any
       * display element changes
       */
      function renderEvents() {
  
        let i=0;
        ctx.clearRect(0, 0, canvas.width, canvas.height)
  

        console.log($teleEventList)
        $teleEventList.forEach(
            el => {
                drawFun[el.name](el)
                i++;
            }
        )
  
        if(contextMenu!=null){
          console.log("Drawing menu")
          contextMenu.draw()
        }
        
      }
  
  </script>
  
  <style>
    canvas {
      background: url("images/2024_Field_gray.png");
      background-size: 100% 100%;
      border: 1px solid white;
    }

  </style>
  


<div>
    <canvas 
    bind:this={canvas}
    width={canvasSize.w}
    height={canvasSize.h}
    />
</div>
  