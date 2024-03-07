import { Colors, AllianceColor } from "./field_utils";

//-----------------------------
//  Context menu
//-----------------------------
/**
 *  Enum for shape of menu items
*/
export const MenuItemShape = {
    circ: "circ",
    rect: "rect"
}

/**
 * Object representing an item on the context menus
 */
export class ContextMenuItem {

    /**
     * Constructor
     * @param action Function pointer to execute when item is executed
     * @param color Color of the menu item (can be replaced with icon in the future)
     */
    constructor(action, color, decorator_color = null, shape = MenuItemShape.rect) {
        this.ctx = null
        this.action = action;
        this.color = color;
        if (decorator_color == null)
            decorator_color = color
        this.decorator_color = decorator_color;
        this.path = new Path2D;
        this.decorator = new Path2D;
        this.shape = shape
    }

    /** 
     * Define rectangle absolute location and size of menu item
     * @param pos : {x: x-location, y: y-locations}
     * @param {int} size : Size of rectangle in pixels
     */
    setPos(pos, size) {
        if (this.shape == MenuItemShape.circ) {
            this.path.arc(pos.x, pos.y, size / 2, 0, Math.PI * 2);
            this.decorator.arc(pos.x, pos.y, size / 4, 0, Math.PI * 2);
        }
        else {
            this.path.rect(pos.x - size / 2, pos.y - size / 2, size, size);
            this.decorator.rect(pos.x - size / 2 + size / 4, pos.y - size / 2 + size / 4, size / 2, size / 2);
        }
    }

    draw() {
        this.ctx.beginPath();

        this.ctx.fillStyle = this.color
        this.ctx.fill(this.path);
        this.ctx.strokeStyle = Colors.black
        this.ctx.stroke(this.path)

        this.ctx.beginPath();
        this.ctx.fillStyle = this.decorator_color
        this.ctx.fill(this.decorator);
    }

    /**
     * Run action for menu item
     */
    run() {
        this.action()
    }
}

/**
 * ContextMenu Item Layout object for multi-row layout
 */
export class CircleLayout {
    /**
     * Constructor
     * @param center : {x: x-location, y: y-locations} center postion of menu
     * @param {int} nitems : Maximum number of items
     * @param {int} radius : center of elements
     */
    constructor(center, nitems, radius) {
        this.coord = {}
        let startAngle = 0;
        let angle = 2 * Math.PI / nitems;

        for (let i = 0; i < nitems; i++) {
            this.coord[i] = {
                x: center.x - radius * Math.cos(startAngle + angle * i),
                y: center.y - radius * Math.sin(startAngle + angle * i)
            }
        }
    }

    /**
     * Get center of element at specific index
     * @param idx Index of 
     */
    getCoord(idx) {
        if (idx in this.coord)
            return this.coord[idx];
        else
            console.error("Index out of bounds.  Please allocate more items. ")
        return {}
    }
}

/**
 * ContextMenu Item Layout object for multi-row layout
 */
export class RowLayout {

    /**
     * Constructor
     * @param center : {x: x-location, y: y-locations} center postion of menu
     * @param {int} nitems : Maximum number of items
     * @param {int} nrows : Number of rows 
     * @param {int} size : Size in px of each element
     */
    constructor(center, nitems, nrows, size) {
        this.size = size
        this.nrows = nrows
        this.hsep = 3
        this.vsep = 10
        this.nrows_half = Math.ceil(nrows / 2)
        this.items_p_row = Math.ceil(nitems / nrows)
        this.item_distance = this.size + this.hsep
        this.row_distance = this.size + this.vsep
        this.nitems = nitems
        this.hoffset = (this.item_distance * this.items_p_row) / 2 - this.row_distance / 2
        let center_vdist = 15

        this.voffset = +(this.nrows_half) * (this.row_distance) + center_vdist - this.size / 2
        let item_idx = 0;
        this.coord = {}
        for (let i = this.nrows_half - 1; i >= 0; i--) {
            for (let j = 0; j < this.items_p_row; j++) {
                this.coord[item_idx] = {
                    x: center.x - this.hoffset + j * this.item_distance,
                    y: center.y - this.voffset - i * this.row_distance
                }
                item_idx++;
            }
        }

        for (let i = 0; i < this.nrows_half; i++) {
            for (let j = 0; j < this.items_p_row; j++) {
                this.coord[item_idx] = {
                    x: center.x - this.hoffset + j * this.item_distance,
                    y: center.y + center_vdist + this.vsep + this.size / 2 + i * this.row_distance
                }
                item_idx++;
            }
        }

        this.bounds = []
        for (let i = 0; i < this.nrows; i++) {
            if (i == 0) {
                this.bounds = [this.coord[i].x - this.size / 2,
                this.coord[i].x + this.size / 2,
                this.coord[i].y - this.size / 2,
                this.coord[i].y + this.size / 2]
            }
            if (this.coord[i].x - this.size / 2 < this.bounds[0])
                this.bounds[0] = this.coord[i].x - this.size / 2
            if (this.coord[i].x + this.size / 2 > this.bounds[1])
                this.bounds[1] = this.coord[i].x + this.size / 2
            if (this.coord[i].y - this.size / 2 < this.bounds[2])
                this.bounds[2] = this.coord[i].y - this.size / 2
            if (this.coord[i].y + this.size / 2 > this.bounds[3])
                this.bounds[3] = this.coord[i].y + this.size / 2

        }
    }
    /**
     * Get top left corner of element at specific index
     * @param idx Index of 
     */
    getCoord(idx) {
        return this.coord[idx];
    }

    getRect() {
        return this.bounds
    }

}

/**
 * Context menu class
 */
export class ContextMenu {

    /**
     * Constructor
     * @param center Center point of menu (or click location)
     * @param { int } nitems Max number of items expected in the menu
     */
    constructor(ctx, center, nitems = 3, shape = MenuItemShape.circ) {
        this.ctx = ctx
        this.size = 50
        this.item_distance = this.size + 3
        this.nitems = nitems
        this.hoffset = (this.item_distance * this.nitems) / 2
        this.voffset = this.size + 15

        if (shape == MenuItemShape.circ) {
            let radius = 65
            this.layout = new CircleLayout(center, nitems, radius)
            this.background = new Path2D();
            this.background.arc(center.x, center.y, 120, 0, Math.PI * 2)
        }
        else {
            this.layout = new RowLayout(center, nitems, 2, this.size)
            this.background = new Path2D();
            this.background.rect(center.x - 125, center.y - 90, 250, 170)
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
    addItem(item) {
        let pos = this.layout.getCoord(this.nextId);
        item.ctx = this.ctx
        item.setPos(pos, this.size)
        this.items.push(item)
        this.nextId++;
    }

    /**
     * Draw all of the menu items
     */
    draw() {

        this.ctx.globalAlpha = 0.45;
        this.ctx.beginPath();
        this.ctx.fillStyle = "rgb(200,200,200)"
        this.ctx.fill(this.background);
        this.ctx.strokeStyle = "rgb(100,100,100)"
        this.ctx.stroke(this.background);
        this.ctx.globalAlpha = 1.0;

        for (let i = 0; i < this.items.length; i++) {
            this.items[i].draw()
        }
    }

    /**
     * Given a point on the canvas, select menu item
     * @param pos : Position on the canvas
     */
    highlight(pos) {

        this.selected = null;

        for (let i = 0; i < this.items.length; i++) {
            if (this.ctx.isPointInPath(this.items[i].path, pos.x, pos.y)) {
                this.ctx.strokeStyle = Colors.white
                this.ctx.stroke(this.items[i].path)
                this.selected = i
                console.log("Selected item: " + i)
            }
            else {
                this.ctx.strokeStyle = Colors.black
                this.ctx.stroke(this.items[i].path)
            }
        }
    }

    /**
     * If an item is currently selected, run selected item
     */
    run() {
        if (this.selected != null) {
            this.items[this.selected].run()
        }

    }

}


//-----------------------------
//  Game elements
//-----------------------------
    export const FieldElementTypes = {
        note: "note"
    }

    export class FieldElement {
        constructor(type, id, enabled = true) {
            this.type = type;
            this.path = new Path2D();
            this.enabled = enabled;
            this.id = id;
        }

        disable() {
            this.enabled = false;
        }


        isEnabled() {
            return this.enabled;
        }

    }

    export class Note extends FieldElement {
        constructor(id, centerPos, size) {
            super(FieldElementTypes.note, id);
            this.path.rect(centerPos.x - size / 2, centerPos.y - size / 2, size, size);
            this.color = Colors.orange
        }
    }


    /**
     * Object to capture field state.  Composed of all of game elements and their 
     * corresponding state
     * NOTE: Needs refactored to accept a external list of field elements to support 
     * arbitrary views of the field
     */
    export class GameField {

        /**
         * Constuctor
         * @param {int} width Width of the canvas element 
         * @param {int] height Height of the canvas element
         * @param {AllianceColor} aliance "red" or "blue"
         */
        constructor(ctx, width, height, aliance) {
            this.ctx = ctx
            this.items = []
            this.active = {}
            this.width = width
            this.height = height;

            let size = height / 8.5;

            let rel_row_loc = 0.30;
            let rel_center_loc = 0.86;

            if (aliance == AllianceColor.red) {
                rel_row_loc = 0.65;
                rel_center_loc = 0.15;
            }

            let notePos = [{ x: width * rel_row_loc, y: height / 2 },
            { x: width * rel_row_loc, y: height / 2 - height / 6 },
            { x: width * rel_row_loc, y: height / 2 - 2 * height / 6 },
            { x: width * rel_center_loc, y: height / 2 },
            { x: width * rel_center_loc, y: height / 2 - height / 6 },
            { x: width * rel_center_loc, y: height / 2 - 2.1 * height / 6 },
            { x: width * rel_center_loc, y: height / 2 + height / 6 },
            { x: width * rel_center_loc, y: height / 2 + 2.1 * height / 6 }]


            //-- Add notes to the game field at the corresponding locations and size
            for (let i = 0; i < 8; i++)
                this.items[i] = new Note(i, notePos[i], size);

            //-- Add all items to the active element list
            for (let i = 0; i < this.items.length; i++) {
                this.active[i] = this.items[i]
            }
            console.log("active")
            console.log(this.active)
        }

        /**
         * Check if an item is under the given position
         * @param pos x,y position
         */
        select(pos) {
            for (let item in this.active) {
                if (this.ctx.isPointInPath(this.active[item].path, pos.x, pos.y)) {
                    return { type: this.active[item].type, id: this.active[item].id }
                }
            }

            return null
        }

        /**
         * Disable field element with a given id
         * @param id
         */
        disable(id) {
            if (id in this.active) {
                delete this.active[id]
            }
            else {
                console.warn("Unable to find item")
            }
        }

        /**
         * Enable element with a given id
         * @param id
         */
        enable(id) {
            if (id in this.items) {
                this.active[id] = this.items[id]
            }
            else {
                console.warn("Unable to find item")
            }
        }

        /**
         * Draw all of the field elements
         * NOTE:  May need to be refactored outside of this class
         */
        draw() {
            for (let i in this.active) {
                this.ctx.beginPath();
                this.ctx.fillStyle = this.active[i].color
                this.ctx.fill(this.active[i].path);
                this.ctx.strokeStyle = Colors.black;
                this.ctx.lineWidth = 5
                this.ctx.stroke(this.active[i].path);
            }
        }
    }