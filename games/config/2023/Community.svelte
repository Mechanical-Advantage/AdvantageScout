<script>
    import { onMount } from "svelte";

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    let robotX = 1000;
    let robotY = 1000;
    export let flippedH = false;
    export let flippedV = true;
    let orientString = "transform: ";
    let yRobotOffset = 0;
    export let strokeWidth = 5;
    let red = "#ff0000";
    let blue = "#002eff";
    export let AllianceColor = "red";
    export let strokeColor = AllianceColor === "red" ? red : blue; //Red is #ff0000 Blue is #002eff
    export let width = 210;
    export let height = 330;
    let defaultWidth = 210; //Dont Touch
    let defaultHeight = 330; //Dont Touch
    export let xOffset = 0;
    export let yOffset = 0;
    export let robotSize = 30;
    export let robotEmoji = "🤖"; // (:
    let screenOffset = 61;
    //testest

    let zones = [
        [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 0],
        ],
        [
            [2, 2],
            [2, 3],
            [3, 3],
            [3, 2],
        ],
        [
            [4, 4],
            [4, 5],
            [5, 5],
            [5, 4],
        ],
        [
            [6, 6],
            [6, 7],
            [7, 7],
            [7, 6],
        ],
        [
            [8, 8],
            [8, 9],
            [9, 9],
            [9, 8],
        ],
        [
            [10, 10],
            [10, 11],
            [11, 11],
            [11, 10],
        ],
    ];

    if (flippedV) {
        //Determines the offset for displaying the robot emoji, as it changes based on orientation
        yRobotOffset = 0;
    } else {
        yRobotOffset = 0;
    }

    if (flippedH) {
        //determines CSS for rotating the robot emoji
        orientString += "scaleX(-1) "; //this string will be injected into the CSS for the robot emoji
    }
    if (flippedV) {
        orientString += "scaleY(-1)";
    }

    function handleClick(event) {
        //whenever you click somewhere in the total rectangle of the community
        let clickX = event.clientX - xOffset;
        let clickY = event.clientY - yOffset - screenOffset;

        if (flippedH) {
            //flips the input X and Y depending on if the SVG is flipped
            clickX = width - clickX;
        }

        if (flippedV) {
            clickY = height - clickY;
        }

        if (!isPointInSvg(clickX, clickY, ctx)) {
            //checks if the click is outside the bounds formed by the lines of the svg
            console.log("Click outside of SVG bounds");
            return;
        }
        console.log(
            `x: ${clickX * (defaultWidth / width)}, y: ${
                clickY * (defaultHeight / height)
            }`
        ); //logs the altered coords. Use these for the data and finding zones
        robotX = clickX;
        robotY = clickY + yRobotOffset; //adds offset to the emoji displaying coords
    }

    function isPointInSvg(x, y, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath(); //draws the shape of the svg on a 2d canvas
        ctx.moveTo((width / defaultWidth) * 7.6, (height / defaultHeight) * 10);
        ctx.lineTo(
            (width / defaultWidth) * 121.4,
            (height / defaultHeight) * 10
        );
        ctx.lineTo((width / defaultWidth) * 119, (height / defaultHeight) * 91);
        ctx.lineTo(
            (width / defaultWidth) * 93.6,
            (height / defaultHeight) * 91
        );
        ctx.lineTo((width / defaultWidth) * 96, (height / defaultHeight) * 232);
        ctx.lineTo(
            (width / defaultWidth) * 208.4,
            (height / defaultHeight) * 232
        );
        ctx.lineTo(
            (width / defaultWidth) * 206,
            (height / defaultHeight) * 315
        );
        ctx.lineTo(
            (width / defaultWidth) * 7.6,
            (height / defaultHeight) * 315
        );
        ctx.lineTo((width / defaultWidth) * 10, (height / defaultHeight) * 10);
        ctx.closePath();
        return ctx.isPointInPath(x, y); //checks if the point is within the drawn canvas shape
    }

    function zoneFinder(x, y) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let point = { x: x, y: y };
        let containedZone = 0;

        for (let i = 0; i < zones.length; i++) {
            ctx.beginPath();
            ctx.moveTo(zones[i][0][0], zones[i][0][1]);
            for (let j = 1; j < zones[i].length; j++) {
                ctx.lineTo(zones[i][j][0], zones[i][j][1]);
            }
            ctx.closePath();

            if (ctx.isPointInPath(point.x, point.y)) {
                containedZone = i;
                break;
            }
        }
        return containedZone;
    }
</script>

<svg
    {width}
    {height}
    xmlns="http://www.w3.org/2000/svg"
    on:click={handleClick}
    style={orientString}
>
    <g>
        <title>Layer 1</title>
        <line
            stroke-width={strokeWidth}
            id="svg_2"
            y2={(height / defaultHeight) * 10}
            x2={(width / defaultWidth) * 121.4}
            y1={(height / defaultHeight) * 10}
            x1={(width / defaultWidth) * 7.6}
            stroke={strokeColor}
            fill="none"
        />
        <line
            stroke-width={strokeWidth}
            id="svg_3"
            y2={(height / defaultHeight) * 91}
            x2={(width / defaultWidth) * 119}
            y1={(height / defaultHeight) * 10}
            x1={(width / defaultWidth) * 119}
            stroke={strokeColor}
            fill="none"
        />
        <line
            stroke-width={strokeWidth}
            id="svg_4"
            y2={(height / defaultHeight) * 91}
            x2={(width / defaultWidth) * 93.6}
            y1={(height / defaultHeight) * 91}
            x1={(width / defaultWidth) * 121.4}
            stroke={strokeColor}
            fill="none"
        />
        <line
            id="svg_5"
            y2={(height / defaultHeight) * 232}
            x2={(width / defaultWidth) * 96}
            y1={(height / defaultHeight) * 91}
            x1={(width / defaultWidth) * 96}
            stroke-width={strokeWidth}
            stroke={strokeColor}
            fill="none"
        />
        <line
            id="svg_6"
            y2={(height / defaultHeight) * 232}
            x2={(width / defaultWidth) * 208.4}
            y1={(height / defaultHeight) * 232}
            x1={(width / defaultWidth) * 93.6}
            stroke-width={strokeWidth}
            stroke={strokeColor}
            fill="none"
        />
        <line
            id="svg_7"
            y2={(height / defaultHeight) * 315}
            x2={(width / defaultWidth) * 206}
            y1={(height / defaultHeight) * 232}
            x1={(width / defaultWidth) * 206}
            stroke-width={strokeWidth}
            stroke={strokeColor}
            fill="none"
        />
        <line
            id="svg_8"
            y2={(height / defaultHeight) * 315}
            x2={(width / defaultWidth) * 7.6}
            y1={(height / defaultHeight) * 315}
            x1={(width / defaultWidth) * 208.4}
            stroke-width={strokeWidth}
            stroke={strokeColor}
            fill="none"
        />
        <line
            id="svg_9"
            y2={(height / defaultHeight) * 10}
            x2={(width / defaultWidth) * 10}
            y1={(height / defaultHeight) * 315}
            x1={(width / defaultWidth) * 10}
            stroke-width={strokeWidth}
            stroke={strokeColor}
            fill="none"
        />
    </g>
    <text
        fill="white"
        x={robotX}
        y={robotY}
        font-size={robotSize}
        text-anchor="middle"
        transform={flippedV
            ? `translate(${robotX},${robotY}) rotate(180) translate(${-robotX},${-robotY})`
            : ""}>{robotEmoji}</text
    >
</svg>
