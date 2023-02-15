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

    $gameData["AllianceColor"] = $gameData["AllianceColor"]

    let zones = {
        1: [90, 20, 120, 20, 120, 90, 90, 90],
        2: [90, 20, 90, 90, 10, 90, 10, 20],
        3: [10, 90, 90, 90, 90, 150, 10, 150],
        4: [10, 150, 90, 150, 100, 240, 10, 240],
        5: [10, 240, 105, 240, 105, 315, 10, 315],
        6: [105, 240, 200, 240, 200, 315, 105, 315],
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
        if (AllianceColor === "red"){
        $displayText = [" ", "X"]
        }
        else{
            $displayText = ["X", " "]
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
                return zone;
            }
            // return c;
        }
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
