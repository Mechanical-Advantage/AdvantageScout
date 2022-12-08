<!--<script>-->
<!--    export let left = 100;-->
<!--    export let top = 100;-->
<!--    let moving = false;-->

<!--    function onMouseUp(){-->

<!--    }-->

<!--    function onMouseMove(){-->

<!--    }-->

<!--    function onMouseDown(){-->
<!--        moving = true-->
<!--    }-->
<!--</script>-->

<!--<svg width="248" height="248">-->
<!--    <circle cx="124" cy="124" r="115" stroke="white" stroke-width="12" fill-opacity="0"/>-->
<!--</svg>-->

<!--<svg width="60" height="60">-->
<!--    <circle cx="30" cy="30" r="26" stroke="white" stroke-width="1" fill="white"/>-->
<!--</svg>-->

<!--<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />-->

<script>
    let angle = 0;

    // calculate the position of the small circle on the edge of the outer circle
    // based on the current angle
    function calculatePosition() {
        const x = 50 + 50 * Math.cos(angle);
        const y = 50 + 50 * Math.sin(angle);
        return { x, y };
    }

    // handle mouse events to allow the user to drag the small circle along the edge
    // of the outer circle
    function handleMouseMove(event) {
        // calculate the new angle based on the mouse position
        const rect = event.target.getBoundingClientRect();
        const x2 = event.clientX - rect.left;
        const y2 = event.clientY - rect.top;
        angle = Math.atan2(y2 - 50, x2 - 50);

        // update the position of the small circle
        const { x3, y3 } = calculatePosition();
        smallCircle.style.left = `${x3}px`;
        smallCircle.style.top = `${y3}px`;
    }

    let smallCircle;
    function handleMouseDown(event) {
        // bind the mousemove and mouseup event listeners to the window
        // to allow the user to drag the small circle outside of the svg element
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }
    function handleMouseUp(event) {
        // unbind the mousemove and mouseup event listeners from the window
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    }
</script>

<svg width="100" height="100" on:mousedown={handleMouseDown}>
    <circle
            cx="50"
            cy="50"
            r="50"
            stroke="white"
            fill="none"
    />
    <circle
            ref={(el) => { smallCircle = el; }}
            cx={calculatePosition().x}
            cy={calculatePosition().y}
            r="10"
            stroke="white"
            fill="white"
    />
</svg>
