<script>
    import ButtonGroup from "./ButtonGroup.svelte";

    let count = 0

let gameData = {
"AutoUpperSuccess" : 0,
"AutoUpperFail" : 0,
"AutoLowerSuccess" : 0,
"AutoLowerFail" : 0
}

function handleClick(varName, operation){
gameData[varName] += operation
} 



</script>

<main>
    <div class="line">
        <div class="btn-group">
            <button class="btn s" on:click={() => handleClick("AutoUpperSuccess", 1)}>+</button>
            <button class="btn n">{gameData["AutoUpperSuccess"]}</button>
            <button class="btn s" on:click={() => handleClick("AutoUpperSuccess", -1)}>-</button>
        </div>
    </div>

    <div class="line">
        <div class="btn-group">
            <button class="btn f" on:click={() => handleClick("AutoLowerSuccess", 1)}>+</button>
            <button class="btn n">{gameData["AutoLowerSuccess"]}</button>
            <button class="btn f" on:click={() => handleClick("AutoLowerSuccess", -1)}>-</button>
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
            <button class="btn s" on:click={() => handleClick("AutoUpperFail", 1)}>+</button>
            <button class="btn n">{gameData["AutoUpperFail"]}</button>
            <button class="btn s" on:click={() => handleClick("AutoUpperFail", -1)}>-</button>
        </div>
    </div>

    <div class="line">
        <div class="btn-group">
            <button class="btn f" on:click={() => handleClick("AutoLowerFail", 1)}>+</button>
            <button class="btn n">{gameData["AutoLowerFail"]}</button>
            <button class="btn f" on:click={() => handleClick("AutoLowerFail", -1)}>-</button>
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

        width: 150px;

        margin-left: 25px;
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
        margin-top: 150px;
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
