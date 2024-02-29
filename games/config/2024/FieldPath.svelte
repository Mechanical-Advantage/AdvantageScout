<script>
    import { writable } from "svelte/store";
    import { onMount } from "svelte";
    import { autoEventList, gameData } from "./stores"
   
    //-- Properties
      export const AllianceColor = {
            red:"red",
            blue:"blue"
          }
      export let alliance = AllianceColor.blue

    //-- Component-specific variables
      let canvas;
      let ctx;
      let gameField;
      let canvasSize={w:610, h:470}
      
    //-- Compute field-width in pixels (based on background image geometry)
      let topCorner;
      let centerPos;
      let posOffset;
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
      
      let virtualFieldSizePx = {w: Math.abs(topCorner.x-centerPos.x)*2, h: Math.abs(topCorner.y-centerPos.y)*2 }
      let virtualFieldOffsetPx = posOffset;

    //-- Component state
      let currEvent = ($autoEventList.length>0) ? $autoEventList.slice(-1) : null
      let currPos = (currEvent) ? currEvent.pos : null
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

        gameField = new GameField(canvas.width, canvas.height, alliance)
        renderEvents()
      });
  
    
    //-----------------------------
    //  Helpers
    //------------------------------
      const Colors = {
          black : "rgb(0,0,0)", 
          red : "rgb(255,0,0)", 
          burgundy :"rgb(128,0,32)",
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
          this.npos = {
                       x: (pos.x-virtualFieldOffsetPx.x)/virtualFieldSizePx.w,
                       y: (pos.y-virtualFieldOffsetPx.y)/virtualFieldSizePx.h
                      } //Normalized position on a full field
                
              //Sanitize
                if(this.npos.x<0)
                  this.npos.x=0.0;
                else if(this.npos.x>1.0)
                  this.npos.x=1.0;

                if(this.npos.y<0)
                  this.npos.y=0;
                else if(this.npos.y>1.0)
                  this.npos.y=1.0;
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
        constructor(pos, id = undefined)
        {
          super(pos, GameEventType.pickup)
          this.noteId = id
        }

        setId(id){
            this.noteId=id
        }
      }
  
      class DropEvent extends GameEvent {
        constructor(pos)
        {
          super(pos, GameEventType.drop)
        }
      }
  
      class SpeakerScoreEvent extends GameEvent {
        constructor(pos)
        {
          super(pos, GameEventType.scoreSpeaker)
        }
      }
  
      class SpeakerMissEvent extends GameEvent {
        constructor(pos)
        {
          super(pos, GameEventType.missSpeaker)
        }
      }

      class AmpScoreEvent extends GameEvent {
        constructor(pos)
        {
          super(pos, GameEventType.scoreAmp)
        }
      }
      
      class AmpMissEvent extends GameEvent {
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
         * Add point to the event queue (TODO: refactor to handler class with callbacks)
         * @param  {[GameEventType] e }
         */
        function addGameEvent(e) {
            
            if(currEvent==null && e.name!=GameEventType.init){
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
    //  Game elements
    //-----------------------------
        const FieldElementTypes = {
          note:"note"
        }

        class FieldElement {
            constructor(type, id, enabled=true){
                this.type = type;
                this.path = new Path2D();
                this.enabled = enabled;
                this.id = id;
            }

            disable(){
                this.enabled = false;
            }


            isEnabled(){
                return this.enabled;
            }

        }

        class Note extends FieldElement {
            constructor(id, centerPos, size){
                super(FieldElementTypes.note, id);
                this.path.rect(centerPos.x-size/2, centerPos.y-size/2,size, size);
                this.color = Colors.orange
            }
        }


        /**
         * Object to capture field state.  Composed of all of game elements and their 
         * corresponding state
         */
        class GameField {

            /**
             * Constuctor
             * @param {int} width Width of the canvas element 
             * @param {int] height Height of the canvas element
             * @param {AllianceColor} aliance "red" or "blue"
             */
            constructor(width, height, aliance){
                this.items = []
                this.active = {}
                this.width = width
                this.height = height;

                let size = height/8.5;

                let rel_row_loc = 0.30;
                let rel_center_loc = 0.86;

                if(aliance==AllianceColor.red){
                  rel_row_loc = 0.65;
                  rel_center_loc = 0.10;
                }

                let notePos = [{x: width*rel_row_loc, y: height/2},    
                      {x: width*rel_row_loc, y: height/2 - height/6},
                      {x: width*rel_row_loc, y: height/2 - 2*height/6},
                      {x: width*rel_center_loc, y: height/2},   
                      {x: width*rel_center_loc, y: height/2 - height/6},
                      {x: width*rel_center_loc, y: height/2 - 2.1*height/6},
                      {x: width*rel_center_loc, y: height/2 + height/6},     
                      {x: width*rel_center_loc, y: height/2 + 2.1*height/6 }]


                //-- Add notes to the game field at the corresponding locations and size
                for(let i=0; i<8; i++)    
                  this.items[i]=new Note(i, notePos[i], size);    
   
                //-- Add all items to the active element list
                for(let i=0; i<this.items.length; i++){
                    this.active[i] = this.items[i]
                }  
                console.log("active")              
                console.log(this.active)
            }

            /**
             * Check if an item is under the given position
             * @param pos x,y position
             */
            select(pos){
                for(let item in this.active)
                {
                    if(ctx.isPointInPath( this.active[item].path, pos.x, pos.y))
                    {
                        return {type: this.active[item].type, id: this.active[item].id}
                    }        
                }

                return null
            }

            /**
             * Disable field element with a given id
             * @param id
             */
            disable(id){
                if(id in this.active) {
                  delete this.active[id]
                }
                else{
                    console.warn("Unable to find item")
                }
            }

            /**
             * Enable element with a given id
             * @param id
             */
            enable(id){
                if(id in this.items) {
                    this.active[id]=this.items[id]
                }
                else{
                    console.warn("Unable to find item")
                }
            }

            /**
             * Draw all of the field elements
             * NOTE:  May need to be refactored outside of this class
             */
            draw(){
                for(let i in this.active)
                {
                    ctx.beginPath();
                    ctx.fillStyle = this.active[i].color
                    ctx.fill(this.active[i].path);
                    ctx.strokeStyle = Colors.black;
                    ctx.lineWidth = 5
                    ctx.stroke(this.active[i].path);
                }
            }
        }


    //-----------------------------
    //  Context menu
    //-----------------------------
      /**
       * 
      */
      const MenuItemShape = {
        circ : "circ",
        rect : "rect"
      }

      /**
       * Object representing an item on the context menus
       */
      class ContextMenuItem {
  
        /**
         * Constructor
         * @param action Function pointer to execute when item is executed
         * @param color Color of the menu item (can be replaced with icon in the future)
         */
        constructor(action, color, decorator_color=null, shape=MenuItemShape.rect){
          this.action = action;
          this.color = color;
          if(decorator_color==null)
            decorator_color=color
          this.decorator_color = decorator_color;
          this.path = new Path2D;
          this.decorator = new Path2D;
          this.shape=shape
        }
  
        /** 
         * Define rectangle absolute location and size of menu item
         * @param pos : {x: x-location, y: y-locations}
         * @param {int} size : Size of rectangle in pixels
         */
        setPos(pos, size) {
          if (this.shape==MenuItemShape.circ){
            this.path.arc(pos.x, pos.y, size/2, 0, Math.PI*2);
            this.decorator.arc(pos.x, pos.y, size/4, 0, Math.PI*2);
          }
          else{
            this.path.rect(pos.x-size/2, pos.y-size/2, size, size);
            this.decorator.rect(pos.x-size/2+size/4, pos.y-size/2+size/4, size/2, size/2);
          }
        }
  
        draw(){   
          ctx.beginPath();
          ctx.fillStyle = this.color
          ctx.fill(this.path);
          
          ctx.beginPath();
          ctx.fillStyle = this.decorator_color
          ctx.fill(this.decorator);          
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
      class CircleLayout {
        /**
         * Constructor
         * @param center : {x: x-location, y: y-locations} center postion of menu
         * @param {int} nitems : Maximum number of items
         * @param {int} radius : center of elements
         */
        constructor(center, nitems, radius){
          this.coord = {}
          let startAngle = 0;
          let angle = 2*Math.PI/nitems;
          
          for(let i=0; i<nitems; i++){
              this.coord[i] = {x: center.x - radius*Math.cos(startAngle + angle*i), 
                            y: center.y - radius*Math.sin(startAngle + angle*i)}
          }
        }

        /**
         * Get center of element at specific index
         * @param idx Index of 
         */
        getCoord(idx){
          console.error("Index out of bounds.  Please allocate more items. ")
          if(idx in this.coord)
            return this.coord[idx];
          else
            return {}
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
            this.hoffset = (this.item_distance * this.items_p_row)/2 - this.row_distance/2
            let center_vdist = 15
            
            this.voffset = +(this.nrows_half)*(this.row_distance) + center_vdist - this.size/2
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
                                            y:center.y + center_vdist + this.vsep + this.size/2 + i*this.row_distance}
                    item_idx++;
                }
            }

            this.bounds = []
            for(let i=0; i<this.nrows; i++){
              if(i==0){
                this.bounds = [this.coord[i].x-this.size/2, 
                               this.coord[i].x+this.size/2, 
                               this.coord[i].y-this.size/2, 
                               this.coord[i].y+this.size/2 ]
              }
              if(this.coord[i].x-this.size/2 < this.bounds[0])
                this.bounds[0] = this.coord[i].x-this.size/2 
              if(this.coord[i].x+this.size/2 > this.bounds[1])
                this.bounds[1] = this.coord[i].x+this.size/2 
              if(this.coord[i].y-this.size/2 < this.bounds[2])
                this.bounds[2] = this.coord[i].y-this.size/2 
              if(this.coord[i].y+this.size/2 > this.bounds[3])
                this.bounds[3] = this.coord[i].y+this.size/2 

            }
        }
        /**
         * Get top left corner of element at specific index
         * @param idx Index of 
         */
        getCoord(idx){
            return this.coord[idx];
        }

        getRect(){
          return this.bounds
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
        constructor(center, nitems=3, shape=MenuItemShape.circ){       
            this.size = 50
            this.item_distance = this.size + 3
            this.nitems = nitems
            this.hoffset = (this.item_distance * this.nitems)/2
            this.voffset = this.size + 15
    
            if (shape==MenuItemShape.circ){
              this.layout = new CircleLayout(center, nitems, 70)
              this.background = new Path2D();
              this.background.arc(center.x, center.y, 120, 0, Math.PI*2 )
            }
            else {
              this.layout = new RowLayout(center, nitems, 2, this.size)
              this.background = new Path2D();
              this.background.rect(center.x-125, center.y-90, 250, 170)
            }
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

          ctx.globalAlpha = 0.45;
          ctx.beginPath();
          ctx.fillStyle = "rgb(200,200,200)"
          ctx.fill(this.background);
          ctx.strokeStyle = "rgb(100,100,100)"
          ctx.stroke(this.background);
          ctx.globalAlpha = 1.0;

          for(let i=0; i<this.items.length; i++){
            this.items[i].draw()
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
        let nitems=7
        let shape = MenuItemShape.circ
        contextMenu = new ContextMenu(pos, nitems)
        contextMenu.addItem(new ContextMenuItem(() => {addGameEvent(new SpeakerScoreEvent(pos))}, Colors.green, null, shape))
        contextMenu.addItem(new ContextMenuItem(() => {addGameEvent(new PickupEvent(pos))}, Colors.darkorange, null, shape))
        contextMenu.addItem(new ContextMenuItem(() => {addGameEvent(new SpeakerMissEvent(pos))}, Colors.red, null, shape))
       
        contextMenu.addItem(new ContextMenuItem(() => { addGameEvent(new PickupEvent(pos)); 
                                                        addGameEvent(new SpeakerScoreEvent(pos))}, 
                                                Colors.green, 
                                                Colors.darkorange, shape))
        contextMenu.addItem(new ContextMenuItem(() => { addGameEvent(new PickupEvent(pos)); 
                                                        addGameEvent(new SpeakerMissEvent(pos))}, 
                                                Colors.red, 
                                                Colors.darkorange, shape))


        contextMenu.addItem(new ContextMenuItem(() => {addGameEvent(new AmpScoreEvent(pos))}, Colors.blue, null, shape))
        contextMenu.addItem(new ContextMenuItem(() => {addGameEvent(new AmpMissEvent(pos))}, Colors.burgundy, null, shape))

       

  
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
                    ctx.lineWidth = 2
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
                      drawCircle(e.pos, Colors.burgundy, 10);
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
  
  </script>
  
  <style>
    canvas {
      border: 1px solid white;
      background-size: 100% 100%;
    }
  </style>
  
<main>
    <div>
        <canvas 
        bind:this={canvas}
        style='background: url("/images/2024-field-{alliance}.png"); background-size: 100% 100%;'
        width={canvasSize.w}
        height={canvasSize.h}
        />
    </div>
</main>
  