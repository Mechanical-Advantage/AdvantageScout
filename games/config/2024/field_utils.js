//-----------------------------
//  Helpers
//------------------------------

    export const AllianceColor = {
        red:"red",
        blue:"blue"
      }

    export const Colors = {
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

    export function drawCircle(ctx, pos, color, radius){
        ctx.beginPath();
        ctx.fillStyle = color
        ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    export function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }