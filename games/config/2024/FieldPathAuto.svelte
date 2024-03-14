<script>
    import { writable } from "svelte/store";
    import { onMount } from "svelte";
    import { autoEventList, gameData } from "./stores"
    import { ContextMenu, ContextMenuItem, MenuItemShape, GameField } from "./field"
    import { getMousePos, drawCircle, Colors, AllianceColor } from "./field_utils"
    import * as events from "./field_events"

    export let alliance = AllianceColor.blue
    export let canvasSize={w:610, h:470}

    //-- Component-specific variables
      let canvas;
      let ctx;
      let gameField;
 
      
    //-- Compute field-width in pixels (based on background image geometry)
      let topCorner;
      let centerPos;
      let posOffset;      
      let virtualFieldSizePx;
      let virtualFieldOffsetPx;


    //-- Component state
      let currEvent = ($autoEventList.length>0) ? $autoEventList.slice(-1)[0] : null
      let currPos = (currEvent) ? currEvent.pos : null
      let contextMenu = null;
      let loaded = writable();
      loaded = false;
  
    //-- Setup event handlers
      onMount(() => {
        ctx = canvas.getContext("2d");
        canvas.addEventListener("mousedown", mouseDownHandler);
        canvas.addEventListener("mousemove", mouseMoveHandler);
        canvas.addEventListener("mouseup", mouseUpHandler);    
  
        canvas.addEventListener("touchstart", touchStartHandler);   
        canvas.addEventListener("touchmove", touchMoveHandler);   
        canvas.addEventListener("touchend", touchEndHandler);
        loaded = true
      });
      
    

    $: if(alliance && loaded===true) setAlliance(alliance)

    function setAlliance(alliance){
      if(ctx){
        gameField = new GameField(ctx, canvas.width, canvas.height, alliance)

        if(alliance==AllianceColor.blue){
          //Location of field markers
          topCorner={x:11.6, y:24}
          centerPos={x:535.6, y:235.3}
          posOffset={x:11.6, y:24}
        }
        else {
          //Location of field markers
          topCorner={x:600, y:24}
          centerPos={x:76.6, y:235.6}
          posOffset={x:-(topCorner.x-2*(centerPos.x)), y:24}
        }

        virtualFieldSizePx = {w: Math.abs(topCorner.x-centerPos.x)*2, h: Math.abs(topCorner.y-centerPos.y)*2 }
        virtualFieldOffsetPx = posOffset; 
        renderEvents()
      }
    }

    //-----------------------------
    //  Game Event Helpers
    //------------------------------
  
      /**
       * Enum representing whether robot is holding a note
       */
      const RobotState = {
        full: "full",
        empty : "empty"
      }
  
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
                currPos = pos;
                const m = new events.MoveEvent(currPos) 
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
            
            let history_len = $autoEventList.length;
            if(history_len>0)
                e.prevEvent = $autoEventList[history_len-1];

            $autoEventList.push(e)
            $autoEventList=$autoEventList
            console.log(JSON.stringify($autoEventList, 
                                      (k, v) => {
                                                  if(k=="prevEvent") 
                                                    return undefined; 
                                                  else 
                                                    return v;
                                                }
                                      )
                        )
    
            //-- Update states
            currEvent = e
            currPos = e.pos
    
            console.log("Added  event [e: "+ e + "]");
            console.log(e)
           
            
            updateField(e) 
            updatePoints(e)
            renderEvents()
        }

        /**
         * Update field elements based on event
         * NOTE: Needs refactored to remove if/else structure
         * @param {GameEventType} event Most recent event
         * @param {bool} undo Flag indicating that this is an undo operation
         */
        function updateField(event, undo=false){
          console
            if(event.name=="pickup") {
                if(!undo){
                  let item = gameField.select(event.pos);
                  console.log("item: " + item)

                  if (item && item.type == "note"){
                      console.log("Disabling note: " + item.id)
                      gameField.disable(item.id)
                      event.setId(item.id)
                    
                  }
                }
                else {
                  if(event.noteId!==undefined)
                    gameField.enable(event.noteId)
                }

            }

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
                    $gameData.AutoAmpNoteSuccess--;
                else
                    $gameData.AutoAmpNoteSuccess++;

            }        
            else if (event.name=="scoreSpeaker"){
                if(undo)
                    $gameData.AutoSpeakerNoteSuccess--;
                else
                    $gameData.AutoSpeakerNoteSuccess++;

            }
            else if (event.name=="missSpeaker"){
                if(undo)
                    $gameData.AutoSpeakerNoteFail--;
                else
                    $gameData.AutoSpeakerNoteFail++;

            }
            else if (event.name=="missAmp"){
                if(undo)
                    $gameData.AutoAmpNoteFail--;
                else
                    $gameData.AutoAmpNoteFail++;

            }

        }
  
        /**
         * Remove last game event added to queue
         * NOTE: This function must be able to unroll
         * all of the robot state to work correctly
         */
        export function undo() {
            updatePoints(currEvent, true)
            updateField(currEvent, true)
            $autoEventList= $autoEventList.slice(0, -1);
            $autoEventList=$autoEventList
 
            let history_len= $autoEventList.length;
            if(history_len>0){
                currEvent = $autoEventList[history_len-1];
                currPos = currEvent.pos
            }
            else{
                currEvent=null;
                currPos=null;
            }
            
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

        let nitems=8
        let shape = MenuItemShape.circ
        contextMenu = new ContextMenu(ctx, pos, nitems)
        contextMenu.addItem(new ContextMenuItem(() => {addGameEvent(new events.PickupEvent(pos))}, Colors.darkorange, null, shape))
        contextMenu.addItem(new ContextMenuItem(() => {addGameEvent(new events.SpeakerScoreEvent(pos))}, Colors.green, null, shape))
        contextMenu.addItem(new ContextMenuItem(() => {addGameEvent(new events.AmpScoreEvent(pos))}, Colors.blue, null, shape))
        contextMenu.addItem(new ContextMenuItem(() => { addGameEvent(new events.PickupEvent(pos)); 
                                                        addGameEvent(new events.SpeakerScoreEvent(pos))}, 
                                                Colors.green, 
                                                Colors.darkorange, shape))
        contextMenu.addItem(new ContextMenuItem(() => { addGameEvent(new events.PickupEvent(pos)); 
                                                        addGameEvent(new events.SpeakerMissEvent(pos))}, 
                                                Colors.red, 
                                                Colors.darkorange, shape))
        contextMenu.addItem(new ContextMenuItem(() => {addGameEvent(new events.DropEvent(pos))}, Colors.black, null, shape))

        contextMenu.addItem(new ContextMenuItem(() => {addGameEvent(new events.AmpMissEvent(pos))}, Colors.burgundy, null, shape))
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
  
        if (gameField!==undefined)
        {
          gameField.draw()

          console.log($autoEventList)
          $autoEventList.forEach(
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
      }
  
  </script>
  
  <style>
    canvas {
      border: 1px solid white;
    }

    .red_bg {
      background: url("/images/2024-field-red.png");
      background-size: 100% 100%;
    }

    .blue_bg {
      background: url("/images/2024-field-blue.png");
      background-size: 100% 100%;
    }

  </style>
  
<main>
    <div>
        <canvas 
        bind:this={canvas}
        class:blue_bg={alliance === "blue"}
        class:red_bg={alliance === "red"}
        width={canvasSize.w}
        height={canvasSize.h}
        />
    </div>
</main>
  