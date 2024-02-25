<script>
    import { writable } from "svelte/store";
    import { onMount } from "svelte";
    import { gameData } from "./stores"
    // import { Nodes } from "./Nodes.svelte";

    //-- Component-specific variables
      let canvas;
      let ctx;
      let gameField;
  
    //-- Component state
      const gameEvents = writable([]);
      let currEvent = null
      let currPos = null
      let contextMenu = null;
      let mouseDown = false;
 
  
    //-- Setup event handlers
      onMount(() => {
        ctx = canvas.getContext("2d");
        canvas.addEventListener("mousedown", mouseDownHandler);
        canvas.addEventListener("mousemove", mouseMoveHandler);
        canvas.addEventListener("mouseup", mouseUpHandler);    
  
        canvas.addEventListener("touchstart", touchStartHandler);   
        canvas.addEventListener("touchmove", touchMoveHandler);   
        canvas.addEventListener("touchend", touchEndHandler);   

        gameField = new GameField(canvas.width, canvas.height)
        renderEvents()
      });
  
    
    //-----------------------------
    //  Helpers
    //------------------------------
      const Colors = {
          black : "rgb(0,0,0)", 
          red : "rgb(255,0,0)", 
          white : "rgb(255,255,255)", 
          blue : "rgb(0,0,255)",
          purple :  "rgb(128,0,128)",
          green : "rgb(0,255,0)",
          orange : "rgb(255,165,0)",
          darkorange : "rgb(179,98,0)",
          cyan : "rgb(0,255,255)",
      };
  
      function drawCircle(pos, color, radius){
        ctx.beginPath();
        ctx.fillStyle = color
        ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
        ctx.fill();
      }
  
      function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
    
  
    //-----------------------------
    //  Game Events
    //------------------------------
      const GameEventType = {
        init: "init",
        pickup: "pickup",
        drop : "drop",
        scoreSpeaker : "scoreSpeaker",
        missSpeaker : "missSpeaker",
        move : "move",
        scoreAmp : "scoreAmp",
        missAmp : "missAmp"
      }
  
      class GameEvent {
        constructor(pos, name){
          this.pos = pos
          this.name = name
          this.prevEvent = null
        }
      }
  
      class InitEvent extends GameEvent {
        constructor(pos)
        {
          super(pos, GameEventType.init, null);
        }
      }
  
      class MoveEvent extends GameEvent {
        constructor(pos)
        {
          super(pos, GameEventType.move);
        }
      }
  
      class PickupEvent extends GameEvent {
        constructor(pos)
        {
          super(pos, GameEventType.pickup)
        }
      }
  
      class DropEvent extends GameEvent {
        constructor(pos)
        {
          super(pos, GameEventType.drop)
        }
      }
  
      class SpeakerScore extends GameEvent {
        constructor(pos)
        {
          super(pos, GameEventType.scoreSpeaker)
        }
      }
  
      class SpeakerMiss extends GameEvent {
        constructor(pos)
        {
          super(pos, GameEventType.missSpeaker)
        }
      }

      class AmpScore extends GameEvent {
        constructor(pos)
        {
          super(pos, GameEventType.scoreAmp)
        }
      }
      
      class AmpMiss extends GameEvent {
        constructor(pos)
        {
          super(pos, GameEventType.missAmp)
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
            const init = new InitEvent(pos) 
            addGameEvent(init);
            }
            else{
            currPos = pos;
    
            const m = new MoveEvent(currPos) 
            addGameEvent(m);
            }
    
        }
  
        /**
         * Add point to the event queue
         * @param  {[GameEventType] e }
         */
        function addGameEvent(e) {
            
            if(currEvent==null && e.name!=GameEventType.init){
                console.log("Robot has not been placed on the field")
                return
            }
            
            let history_len= $gameData.AutoEventList.length;
            if(history_len>0)
            e.prevEvent = $gameData.AutoEventList[history_len-1];

            $gameData.AutoEventList.push(e)
            $gameData=$gameData
            console.log($gameData)
    
            //-- Update states
            currEvent = e
            currPos = e.pos
    
            console.log("Added  event [e: "+ e + "]");
            console.log(e)
            renderEvents()
        }
  
        /**
         * Remove last game event added to queue
         * NOTE: This function must be able to unroll
         * all of the robot state to work correctly
         */
        function undo() {
            $gameData.AutoEventList= $gameData.AutoEventList.slice(0, -1);
            $gameData=$gameData
 
            let history_len= $gameData.AutoEventList.length;
            if(history_len>0){
                currEvent = $gameData.AutoEventList[history_len-1];
                currPos = currEvent.pos
            }
            else{
                currEvent=null;
                currPos=null;
            }
            
            renderEvents()
        }
  
    //-----------------------------
    //  Game elements
    //-----------------------------
        class FieldElement {
            constructor(){
                this.path = new Path2D;
                this.enabled = true;
            }

            disable(){
                this.enabled = false;
            }


            isEnabled(){
                return this.enabled;
            }

        }
        class Note extends FieldElement {
            constructor(pos, size){
                super();
                this.path.rect(pos.x, pos.y,size, size);
                
                this.color = Colors.orange
            }
        }


        class GameField {
            constructor(width, height){
                this.items = []
                let size = height/14 

                //Setup notes
                this.items.push(new Note({x: width*0.30, y: height/2 - size/2}, size));    
                this.items.push(new Note({x: width*0.30, y: height/2 - height/6 - size/2}, size));
                this.items.push(new Note({x: width*0.30, y: height/2 - 2*height/6 - size/2}, size));   
                
                this.items.push(new Note({x: width*0.85, y: height/2 - size/2}, size));    
                this.items.push(new Note({x: width*0.85, y: height/2 - height/6 - size/2}, size));
                this.items.push(new Note({x: width*0.85, y: height/2 - 2.1*height/6 - size/2}, size));
                this.items.push(new Note({x: width*0.85, y: height/2 + height/6 - size/2}, size));     
                this.items.push(new Note({x: width*0.85, y: height/2 + 2.1*height/6 - size/2}, size));   

            }


            draw(){
                for(let i=0; i<this.items.length; i++)
                {
                    ctx.beginPath();
                    ctx.fillStyle = this.items[i].color
                    ctx.fill(this.items[i].path);
                    ctx.strokeStyle = Colors.white;
                    ctx.stroke(this.items[i].path);
                }
            }
        }


    //-----------------------------
    //  Context menu
    //-----------------------------
  
      /**
       * Object representing an item on the context menus
       */
      class ContextMenuItem {
  
        /**
         * Constructor
         * @param action Function pointer to execute when item is executed
         * @param color Color of the menu item (can be replaced with icon in the future)
         */
        constructor(action, color){
          this.action = action
          this.color = color
          this.path = new Path2D;
        }
  
        /** 
         * Define rectangle absolute location and size of menu item
         * @param pos : {x: x-location, y: y-locations}
         * @param {int} size : Size of rectangle in pixels
         */
        setPos(pos, size) {
          this.path.rect(pos.x, pos.y, size, size);
        }
  
        /**
         * Run action for menu item
         */
        run(){
          this.action()
        }
      }

      /**
       * ContextMenu Item Layout object for multi-row layout
       */
      class RowLayout {

        /**
         * Constructor
         * @param center : {x: x-location, y: y-locations} center postion of menu
         * @param {int} nitems : Maximum number of items
         * @param {int} nrows : Number of rows 
         * @param {int} size : Size in px of each element
         */
        constructor(center, nitems, nrows, size){
            this.size = size
            this.nrows = nrows
            this.hsep = 3
            this.vsep = 10
            this.nrows_half = Math.ceil(nrows/2)
            this.items_p_row = Math.ceil(nitems/nrows)
            this.item_distance = this.size + this.hsep
            this.row_distance = this.size + this.vsep
            this.nitems = nitems
            this.hoffset = (this.item_distance * this.items_p_row)/2
            let center_vdist = 15
            
            this.voffset = +(this.nrows_half)*(this.row_distance) + center_vdist
            let item_idx = 0;
            this.coord = {}
            for(let i=this.nrows_half-1; i>=0; i--){
                for(let j=0; j<this.items_p_row; j++){
                    this.coord[item_idx] = {x:center.x - this.hoffset + j*this.item_distance, 
                                     y:center.y - this.voffset - i*this.row_distance}
                    item_idx++;
                }
            }
            
            for(let i=0; i<this.nrows_half; i++){
                for(let j=0; j<this.items_p_row; j++){
                    this.coord[item_idx] = {x:center.x - this.hoffset + j*this.item_distance,
                                            y:center.y + center_vdist + i*this.row_distance}
                    item_idx++;
                }
            }

        }
        /**
         * Get top left corner of element at specific index
         * @param idx Index of 
         */
        getCoord(idx){
            return this.coord[idx];
        }

      }
  
      /**
       * Context menu class
       */
      class ContextMenu {
  
        /**
         * Constructor
         * @param center Center point of menu (or click location)
         * @param { int } nitems Max number of items expected in the menu
         */
        constructor(center, nitems=3){       
            this.size = 60
            this.item_distance = this.size + 3
            this.nitems = nitems
            this.hoffset = (this.item_distance * this.nitems)/2
            this.voffset = this.size + 15
    
            //this.top_corner = {x:center.x - this.hoffset, y:center.y - this.voffset}
            let nrows = 2
            this.layout = new RowLayout(center, nitems, nrows, this.size)
            this.items = []
            this.selected = null;
            this.nextId = 0;
        }
        
        /**
         * Add item to the context menu.  The item will be place next to the last item.
         * NOTE: Layout currently assumed horizontal
         * @param {ContextMenuItem} item : item to be added to the menu
         */
        addItem(item){  
            let pos = this.layout.getCoord(this.nextId);
            item.setPos(pos, this.size)
            this.items.push(item)
            this.nextId++;
        }
  
        /**
         * Draw all of the menu items
         */
        draw(){
          for(let i=0; i<this.items.length; i++){
            ctx.beginPath();
            ctx.fillStyle = this.items[i].color
            ctx.fill(this.items[i].path);
          }
        }
  
        /**
         * Given a point on the canvas, select menu item
         * @param pos : Position on the canvas
         */
        highlight(pos) {
  
          this.selected=null;
  
          for(let i=0; i<this.items.length; i++){
              if(ctx.isPointInPath(this.items[i].path, pos.x, pos.y)){
                ctx.strokeStyle=Colors.white
                ctx.stroke(this.items[i].path)
                this.selected=i
              }
              else{
                ctx.strokeStyle=Colors.black
                ctx.stroke(this.items[i].path)
              }
          }
        }
  
        /**
         * If an item is currently selected, run selected item
         */
        run(){
          if(this.selected != null){
            this.items[this.selected].run()
          }
  
        }
  
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
        let nitems=5
        contextMenu = new ContextMenu(pos, nitems)
        contextMenu.addItem(new ContextMenuItem(() => {addGameEvent(new PickupEvent(pos))}, Colors.darkorange))
        contextMenu.addItem(new ContextMenuItem(() => {addGameEvent(new SpeakerScore(pos))}, Colors.green))
        contextMenu.addItem(new ContextMenuItem(() => {addGameEvent(new SpeakerMiss(pos))}, Colors.red))
        contextMenu.addItem(new ContextMenuItem(() => {addGameEvent(new AmpScore(pos))}, Colors.blue))
        contextMenu.addItem(new ContextMenuItem(() => {addGameEvent(new AmpMiss(pos))}, Colors.purple))
  
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
                    ctx.moveTo(e.prevEvent.pos.x, e.prevEvent.pos.y);
                    ctx.lineTo(e.pos.x, e.pos.y);
                    ctx.stroke();
                  },
        "pickup" : (e)=> {
                      drawCircle(e.pos, Colors.darkorange, 10);
                  },
        "drop" : (e)=> {
                      drawCircle(e.pos, Colors.black, 10);
                  },
        "scoreSpeaker" : (e)=> {
                      drawCircle(e.pos, Colors.green, 10);
                  },
        "missSpeaker" : (e)=> {
                      drawCircle(e.pos, Colors.red, 10);
                  },
        "scoreAmp" : (e)=> {
                      drawCircle(e.pos, Colors.blue, 10);
                  },
        "missAmp" : (e)=> {
                      drawCircle(e.pos, Colors.purple, 10);
                  },
        "init" : (e)=> {
                      drawCircle(e.pos, Colors.cyan, 10);
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
  
        gameField.draw()

        console.log($gameData.AutoEventList)
        $gameData.AutoEventList.forEach(
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
      border: 1px solid white;
      background: url('/images/2024-field-blue.png');
      background-size: 100% 100%;
    }

    button {
        border: 1px solid green;
        background-color: black;
        width: 100%;
        height: 100%;
        color: greenyellow;
    }
    button:disabled,
    button[disabled]{
    border: 1px solid #999999;
    background-color: gray;
    color: #666666;
    }
  
  </style>
  
<main>
  <div class="grid grid-cols-5 gap-3 ">
        <div class="col-span-1">
            <!-- <div class="absolute left-[60px] top-[350px]">
                <Nodes level="2" type="Fail" gameMode="Auto" />
            </div> -->
            
        </div>
        <div class="col-span-3">
            <canvas 
            bind:this={canvas}
            width="610"
            height="470"
            />
        </div>
        <div class="col-span-1">
            <button on:click="{undo}" disabled="{$gameData.AutoEventList.length === 0}">Undo</button>
        </div>
    </div>
</main>
  