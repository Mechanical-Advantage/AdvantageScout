<script>
    import { gameData, selectedCommunity, displayText } from "./stores";
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    let robotX = 1000;
    let robotY = 1000;
    let screenOffset = 0;
    export let flippedH = true;
    export let flippedV = false;
    let orientString = "transform: ";
    let yRobotOffset = 0;
    let strokeWidth = 5;
    let red = "#FF0000";
    let blue = "#002eff";
    export let AllianceColor = "red";
    export let strokeColor = AllianceColor === "red" ? red : blue; //Red is #ff0000 Blue is #002eff
    export let width = 410;
    export let height = 660;
    let defaultWidth = 210; //Dont Touch
    let defaultHeight = 330; //Dont Touch
    export let xOffset = 0;
    export let yOffset = 60;
    export let robotSize = 30;
    export let robotEmoji = "🤖"; // (:

    $gameData["AllianceColor"] = $gameData["AllianceColor"];

    let zones = {
        1: [10, 190, 70, 140, 40, 120, 10, 150],
        2: [40, 120, 70, 140, 70, 60, 40, 80],
        3: [40, 80, 70, 60, 10, 10, 10, 50],
        4: [10, 190, 10, 250, 120, 280, 120, 140, 70, 140],
        5: [70, 140, 120, 140, 120, 10, 10, 10, 70, 60],
        6: [120,10, 206,10, 206,75, 120,75],
        7: [120,75, 206,75, 206,140, 120,140],
        8: [120,140, 206,140, 206,205, 120,205],
        9: [120,205, 206,205, 206,315, 120,290],
        10: [10, 50, 40, 80, 40, 120, 10, 150],
    };
    flippedH = flippedH == "true" ? true : false;
    flippedV = flippedV == "true" ? true : false;
    if (flippedV) {
        //Determines the offset for displaying the robot emoji, as it changes based on orientation
        yRobotOffset = robotSize / -4;
    } else {
        yRobotOffset = robotSize / 4;
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
        $gameData["AllianceColor"] = AllianceColor == "blue" ? 0 : 1;
        $selectedCommunity = AllianceColor == "blue" ? 0 : 1;

        //the solution!!
        if (AllianceColor === "red") {
            $displayText = [" ", "X"];
        } else {
            $displayText = ["X", " "];
        }

        if (flippedH) {
            //flips the input X and Y depending on if the SVG is flipped
            clickX = width - clickX;
        }

        if (flippedV) {
            clickY = height - clickY;
        }

        if (!isPointInSvg(clickX, clickY, ctx)) {
            //checks if the click is outside the bounds formed by the lines of the svg

            return;
        }

        console.log(
            `x: ${clickX * (defaultWidth / width)}, y: ${
                clickY * (defaultHeight / height)
            }`
        ); //logs the altered coords. Use these for the data and finding zones
        robotX = clickX;
        robotY = clickY + yRobotOffset; //adds offset to the emoji displaying coords

        $gameData["StartPosition"] = inZone(
            clickX * (defaultWidth / width),
            clickY * (defaultHeight / height)
        );
        console.log("Start zone in data", $gameData["StartPosition"]);
    }

    function isPointInSvg(x, y, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath(); //draws the shape of the svg on a 2d canvas
        ctx.moveTo((width / defaultWidth) * 7.6, (height / defaultHeight) * 250);
        ctx.lineTo(   
            (width / defaultWidth) * 208.4,
            (height / defaultHeight) * 315
        );
        ctx.lineTo((width / defaultWidth) * 208.4, (height / defaultHeight) * 10);
        ctx.lineTo(
            (width / defaultWidth) * 7.6,
            (height / defaultHeight) * 10
        );
        ctx.lineTo(
            (width / defaultWidth) * 7.6,
            (height / defaultHeight) * 50
        );
        ctx.lineTo(
            (width / defaultWidth) * 40,
            (height / defaultHeight) * 80
        );
        ctx.lineTo(
            (width / defaultWidth) * 40,
            (height / defaultHeight) * 120
        );
        ctx.lineTo(
            (width / defaultWidth) * 7.6,
            (height / defaultHeight) * 150
        );
        ctx.lineTo((width / defaultWidth) * 7.6, (height / defaultHeight) * 250);
        // ctx.lineTo(
        //     (width / defaultWidth) * 208.4,
        //     (height / defaultHeight) * 232
        // );
        // ctx.lineTo(
        //     (width / defaultWidth) * 206,
        //     (height / defaultHeight) * 315
        // );
        // ctx.lineTo(
        //     (width / defaultWidth) * 7.6,
        //     (height / defaultHeight) * 315
        // );
        // ctx.lineTo((width / defaultWidth) * 10, (height / defaultHeight) * 10);
        ctx.closePath();
        return ctx.isPointInPath(x, y); //checks if the point is within the drawn canvas shape
    }

    function inZone(testx, testy) {
        let i;
        let j;
        for (let zone in zones) {
            let vertx = [];
            let verty = [];
            let vertices = zones[zone];

            let nvert = vertices.length / 2;
            for (let i = 0; i < vertices.length; i += 2) {
                vertx.push(vertices[i]);
                verty.push(vertices[i + 1]);
            }
            var c = 0;
            for (i = 0, j = nvert - 1; i < nvert; j = i++) {
                if (
                    verty[i] > testy != verty[j] > testy &&
                    testx <
                        ((vertx[j] - vertx[i]) * (testy - verty[i])) /
                            (verty[j] - verty[i]) +
                            vertx[i]
                )
                    c = !c;
            }

            if (c) {
                console.log("In Zone", zone);
                return zone;
            }
            // return c;
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<svg
    {width}
    {height}
    xmlns="http://www.w3.org/2000/svg"
    on:click={handleClick}
    style={orientString}
>
    <g>
        <title>Layer 1</title>
        <!-- start zone -->
        <line
            stroke-width={strokeWidth}
            id="svg_2"
            y2={(height / defaultHeight) * 10}
            x2={(width / defaultWidth) * 208.4}
            y1={(height / defaultHeight) * 10}
            x1={(width / defaultWidth) * 7.6}
            stroke={strokeColor}
            fill="none"
        />
        <!-- start zone -->
        <line
            stroke-width={strokeWidth}
            id="svg_3"
            y2={(height / defaultHeight) * 315}
            x2={(width / defaultWidth) * 208.4}
            y1={(height / defaultHeight) * 250}
            x1={(width / defaultWidth) * 7.6}
            stroke={strokeColor}
            fill="none"
        />
        <!-- subwoofer -->
        <line
            stroke-width={strokeWidth}
            id="svg_4"
            y2={(height / defaultHeight) * 80}
            x2={(width / defaultWidth) * 40}
            y1={(height / defaultHeight) * 50}
            x1={(width / defaultWidth) * 7.6}
            stroke={strokeColor}
            fill="none"
        />
        <line
            id="svg_5"
            y2={(height / defaultHeight) * 120}
            x2={(width / defaultWidth) * 40}
            y1={(height / defaultHeight) * 78}
            x1={(width / defaultWidth) * 40}
            stroke-width={strokeWidth}
            stroke={strokeColor}
            fill="none"
        />
        <line
            id="svg_6"
            y2={(height / defaultHeight) * 150}
            x2={(width / defaultWidth) * 7.6}
            y1={(height / defaultHeight) * 120}
            x1={(width / defaultWidth) * 40}
            stroke-width={strokeWidth}
            stroke={strokeColor}
            fill="none"
        />
        <line
            id="svg_7"
            y2={(height / defaultHeight) * 315}
            x2={(width / defaultWidth) * 207}
            y1={(height / defaultHeight) * 10}
            x1={(width / defaultWidth) * 207}
            stroke-width={strokeWidth}
            stroke={strokeColor}
            fill="none"
        />
        <!-- <line
            id="svg_8"
            y2={(height / defaultHeight) * 315}
            x2={(width / defaultWidth) * 7.6}
            y1={(height / defaultHeight) * 315}
            x1={(width / defaultWidth) * 208.4}
            stroke-width={strokeWidth}
            stroke={strokeColor}
            fill="none"
        /> -->
        <line
            id="svg_9"
            y2={(height / defaultHeight) * 10}
            x2={(width / defaultWidth) * 7.6}
            y1={(height / defaultHeight) * 252}
            x1={(width / defaultWidth) * 7.6}
            stroke-width={strokeWidth}
            stroke={strokeColor}
            fill="none"
        />
    </g>
    <text
        x={robotX}
        y={robotY}
        font-size={robotSize}
        text-anchor="middle"
        fill="white"
        transform={flippedV
            ? `translate(${robotX},${robotY}) rotate(180) translate(${-robotX},${-robotY})`
            : ""}
    >
        {$displayText[AllianceColor === "blue" ? 0 : 1]}
    </text>
</svg>
