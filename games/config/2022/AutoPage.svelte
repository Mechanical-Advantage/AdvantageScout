<script>
    import { get } from "svelte/store";
    import ButtonGroup from "./ButtonGroup.svelte";
    //   import { writable } from "svelte/store";
    //import { data } from "./data";
    import { state } from "./gameState";

    let shootPositionSelected = false;
    let mode = 0; // 0 = auto, 1 = teleop, 2 = endgame
    // this.setMode = function (newMode) {
    //     // REQUIRED FUNCTION
    //     if ((mode == 0 && newMode == 1) || (mode == 1 && newMode == 0)) {
    //         // dataLog = []
    //         // data["ShootPosition"] = ""
    //         //   shootPositionSelected = false
    //     }

    //     mode = newMode;
    // };

    let gameData = {
        Taxi: 0,
        StartPosition: "",
        AutoUpperSuccess: 0,
        AutoLowerSuccess: 0,
        AutoUpperFailures: 0,
        AutoLowerFailures: 0,
        TeleUpperSuccess: 0,
        TeleLowerSuccess: 0,
        TeleUpperFailures: 0,
        TeleLowerFailures: 0,
        ScoringData: [],
        ClimbLow: [],
        ClimbMid: [],
        ClimbHigh: [],
        ClimbTraversal: [],
        StartPositionZone: 0,
        ClimbCounter: [0, 0, 0, 0],
        ClimbText: ["L", "M", "H", "T"],
        ShootPosition: "",
    };

    function handleClick(varName, operation) {
        gameData[varName] += operation;
    }

    function handleClimb(climb) {
        let time = new Date().getTime() / 1000;

        gameData[climb] = [];
        gameData[climb].push(1, time);
    }

    function handleTaxi() {
        gameData["Taxi"] = 1 - gameData["Taxi"];
    }
</script>

<main>
    <div class="line">
        <div class="btn-group">
            <button
                class="btn s"
                on:click={() =>
                    handleClick(
                        mode == 0 ? "AutoUpperSuccess" : "TeleUpperSuccess",
                        1
                    )}>+</button
            >
            <button class="btn n"
                >{gameData[
                    mode == 0 ? "AutoUpperSuccess" : "TeleUpperSuccess"
                ]}</button
            >
            <button
                class="btn s"
                on:click={() =>
                    handleClick(
                        mode == 0 ? "AutoUpperSuccess" : "TeleUpperSuccess",
                        -1
                    )}>-</button
            >
        </div>
    </div>

    <div class="line">
        <div class="btn-group">
            <button
                class="btn f"
                on:click={() =>
                    handleClick(
                        mode == 0 ? "AutoUpperFailures" : "TeleUpperFailures",
                        1
                    )}>+</button
            >
            <button class="btn n"
                >{gameData[
                    mode == 0 ? "AutoUpperFailures" : "TeleUpperFailures"
                ]}</button
            >
            <button
                class="btn f"
                on:click={() =>
                    handleClick(
                        mode == 0 ? "AutoUpperFailures" : "TeleUpperFailures",
                        -1
                    )}>-</button
            >
        </div>
    </div>

    <!-- <div class="dropdown line">
        <label tabindex="0" class="btn m-1 d">Start Position</label>
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Fender</a></li>
            <li><a>Tarmac</a></li>
        </ul>
    </div> -->

    <br />

    <div class="line">
        <div class="btn-group">
            <button
                class="btn s"
                on:click={() =>
                    handleClick(
                        mode == 0 ? "AutoLowerSuccess" : "TeleLowerSuccess",
                        1
                    )}>+</button
            >
            <button class="btn n"
                >{gameData[
                    mode == 0 ? "AutoLowerSuccess" : "TeleLowerSuccess"
                ]}</button
            >
            <button
                class="btn s"
                on:click={() =>
                    handleClick(
                        mode == 0 ? "AutoLowerSuccess" : "TeleLowerSuccess",
                        -1
                    )}>-</button
            >
        </div>
    </div>

    <div class="line">
        <div class="btn-group">
            <button
                class="btn f"
                on:click={() =>
                    handleClick(
                        mode == 0 ? "AutoLowerFailures" : "TeleLowerFailures",
                        1
                    )}>+</button
            >
            <button class="btn n"
                >{gameData[
                    mode == 0 ? "AutoLowerFailures" : "TeleLowerFailures"
                ]}</button
            >
            <button
                class="btn f"
                on:click={() =>
                    handleClick(
                        mode == 0 ? "AutoLowerFailures" : "TeleLowerFailures",
                        -1
                    )}>-</button
            >
        </div>
    </div>

    <!-- <div class="form-control d line taxiButton">
        <label class="label cursor-pointer">
            <span class="label-text">Taxi?</span>
            <input type="checkbox" checked="checked" class="checkbox checkbox-lg" />
        </label>
    </div> -->

    <!-- <ButtonGroup />
    <ButtonGroup />
    <ButtonGroup />
    <ButtonGroup /> -->
    {#if mode == 1}
        <div class="btn-group btn-group-vertical">
            <button class="btn m-1" on:click={() => handleClimb("ClimbLow", 1)}
                >Low</button
            >
            <button class="btn m-1" on:click={() => handleClimb("ClimbMid", 1)}
                >Mid</button
            >
            <button class="btn m-1" on:click={() => handleClimb("ClimbHigh", 1)}
                >High</button
            >
            <button
                class="btn m-1"
                on:click={() => handleClimb("ClimbTraversal", 1)}
                >Traversal</button
            >
        </div>
    {/if}

    {#if mode == 0}
        <label class="swap">
            <input type="checkbox" />
            <div class="swap-off" on:click={handleTaxi}>NO TAXI</div>
            <div class="swap-on" on:click={handleTaxi}>TAXI</div>
        </label>
    {/if}
</main>

<style>
    button {
        border: none;
        color: white;
        padding-top: 50px;
        padding-bottom: 50px;

        display: inline-block;
        font-size: 30px;

        margin-top: 50px;
        text-align: center;
        vertical-align: middle;
        line-height: 0;

        width: 110px;

        margin-left: 10px;
        margin-right: 25px;
    }

    .s {
        background-color: #00ff00;
    }
    .f {
        background-color: #ff0000;
    }

    .n {
        background-color: rgb(215, 215, 215);
    }

    .line {
        display: inline-block;
        margin-top: 110px;
    }

    .d {
        background-color: gold;
    }

    .form-control {
        width: 150px;
    }

    /* .taxiButton {
        width: 200px;
        padding-top: 50px;
        padding-bottom: 50px;
        font-size: 100px;
    } */
</style>
