<script>
    //import ButtonGroup from "./ButtonGroup.svelte";
    import Nodes from "./Nodes.svelte";
    import GameObject from "./GameObject.svelte";
</script>

<main>


    <Nodes level = 3 type = "success"/>
    <Nodes level = 3 type = "fail"/>
    <br>
    <Nodes level = 2 type = "success"/>
    <Nodes level = 2 type = "fail"/>
    <br>
    <Nodes level = 1 type = "success"/>
    <Nodes level = 1 type = "fail"/>
    <!-- <GameObject gamePiece = 'cube'/> -->
    <!-- <GameObject gamePiece = 'cone'/> -->
<!-- <Nodes/> -->

    <!-- <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="1000.000000pt" height="500.000000pt" viewBox="0 0 1000.000000 500.000000"
 preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.10, written by Peter Selinger 2001-2011
</metadata>
<g transform="translate(0.000000,154.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M17 1533 c-4 -3 -7 -350 -7 -770 l0 -763 1493 2 1492 3 3 759 c2 601
0 761 -10 768 -16 9 -2962 11 -2971 1z m1765 -225 c1 -112 2 -212 2 -223 1
-19 11 -20 236 -27 129 -5 247 -6 263 -3 l27 5 0 -296 c0 -243 3 -298 14 -310
12 -11 70 -14 330 -14 l316 0 0 -205 0 -205 -1467 0 -1468 0 0 740 0 740 873
0 872 0 2 -202z m1188 -315 l0 -518 -315 -4 -315 -3 0 297 c0 244 -3 299 -14
311 -12 11 -61 14 -260 14 l-246 0 0 88 c0 49 -3 144 -7 210 l-6 122 581 0
582 0 0 -517z"/>
</g>
</svg> -->
    <!--checkbox and cross-->
    <!-- <div class="btn group">
        <button class="btn btn-square btn-outline">
            <svg
                fill="#1bbb43"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#1bbb43"
                ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                /><g id="SVGRepo_iconCarrier">
                    <polygon
                        fill-rule="evenodd"
                        points="9.707 14.293 19 5 20.414 6.414 9.707 17.121 4 11.414 5.414 10"
                    />
                </g></svg
            >
        </button>
        <button class="btn btn-square btn-outline">
            <svg
                fill="#e31c1c"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                id="cross"
                class="icon glyph"
                stroke="#e31c1c"
                ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                /><g id="SVGRepo_iconCarrier"
                    ><path
                        d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
                    /></g
                ></svg
            >
        </button>
    </div>
    <div class="btn group">
        <button class="btn btn-square btn-outline">
            <svg
                fill="#1bbb43"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#1bbb43"
                ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                /><g id="SVGRepo_iconCarrier">
                    <polygon
                        fill-rule="evenodd"
                        points="9.707 14.293 19 5 20.414 6.414 9.707 17.121 4 11.414 5.414 10"
                    />
                </g></svg
            >
        </button>
        <button class="btn btn-square btn-outline">
            <svg
                fill="#e31c1c"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                id="cross"
                class="icon glyph"
                stroke="#e31c1c"
                ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                /><g id="SVGRepo_iconCarrier"
                    ><path
                        d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
                    /></g
                ></svg
            >
        </button>
    </div>
    <div class="btn group">
        <button class="btn btn-square btn-outline">
            <svg
                fill="#1bbb43"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#1bbb43"
                ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                /><g id="SVGRepo_iconCarrier">
                    <polygon
                        fill-rule="evenodd"
                        points="9.707 14.293 19 5 20.414 6.414 9.707 17.121 4 11.414 5.414 10"
                    />
                </g></svg
            >
        </button>
        <button class="btn btn-square btn-outline">
            <svg
                fill="#e31c1c"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                id="cross"
                class="icon glyph"
                stroke="#e31c1c"
                ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                /><g id="SVGRepo_iconCarrier"
                    ><path
                        d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
                    /></g
                ></svg
            >
        </button>
    </div> -->


    <!--cone and cube-->
    <div class="ml-[60%] -mt-[2%]">
        <button class="btn btn-outline btn-warning btn-square btn-lg">
            <svg
                class="-mt-2.5 bi bi-cone"
                width="82px"
                height="82px"
                viewBox="0 0 16.00 16.00"
                xmlns="http://www.w3.org/2000/svg"
                fill="#dccc18"
                stroke="#dccc18"
                ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                /><g id="SVGRepo_iconCarrier">
                    <path
                        d="M7.03 1.88c.252-1.01 1.688-1.01 1.94 0l2.905 11.62H14a.5.5 0 0 1 0 1H2a.5.5 0 0 1 0-1h2.125L7.03 1.88z"
                    />
                </g></svg
            >
        </button>
        <button class="btn btn-outline btn-primary btn-square btn-lg">
            <svg
                class="-mt-2.5"
                fill="#c729c2"
                width="82px"
                height="82px"
                viewBox="0 0 56 56"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#c729c2"
                ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                /><g id="SVGRepo_iconCarrier"
                    ><path
                        d="M 28.0000 26.6406 L 50.0783 14.1016 C 49.7264 13.75 49.3045 13.4688 48.7890 13.1875 L 32.2657 3.7657 C 30.8126 2.9453 29.4063 2.5000 28.0000 2.5000 C 26.5938 2.5000 25.1875 2.9453 23.7344 3.7657 L 7.2110 13.1875 C 6.6954 13.4688 6.2735 13.75 5.9219 14.1016 Z M 26.4063 53.5 L 26.4063 29.4532 L 4.3985 16.8906 C 4.2813 17.4063 4.2110 17.9688 4.2110 18.6719 L 4.2110 36.9297 C 4.2110 40.3281 5.4063 41.5938 7.5860 42.8360 L 25.9375 53.2891 C 26.1016 53.3828 26.2422 53.4532 26.4063 53.5 Z M 29.5938 53.5 C 29.7579 53.4532 29.8985 53.3828 30.0626 53.2891 L 48.4141 42.8360 C 50.5938 41.5938 51.7890 40.3281 51.7890 36.9297 L 51.7890 18.6719 C 51.7890 17.9688 51.7189 17.4063 51.6018 16.8906 L 29.5938 29.4532 Z"
                    /></g
                ></svg
            >
        </button>
    </div>
    <div class="ml-[85%] mt-[2%]">
        <button class="btn btn-outline btn-warning btn-square btn-lg">
            <svg
                class="-mt-2.5 bi bi-cone"
                width="82px"
                height="82px"
                viewBox="0 0 16.00 16.00"
                xmlns="http://www.w3.org/2000/svg"
                fill="#dccc18"
                stroke="#dccc18"
                ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                /><g id="SVGRepo_iconCarrier">
                    <path
                        d="M7.03 1.88c.252-1.01 1.688-1.01 1.94 0l2.905 11.62H14a.5.5 0 0 1 0 1H2a.5.5 0 0 1 0-1h2.125L7.03 1.88z"
                    />
                </g></svg
            >
        </button>
        <button class="btn btn-outline btn-primary btn-square btn-lg">
            <svg
                class="-mt-2.5"
                fill="#c729c2"
                width="82px"
                height="82px"
                viewBox="0 0 56 56"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#c729c2"
                ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                /><g id="SVGRepo_iconCarrier"
                    ><path
                        d="M 28.0000 26.6406 L 50.0783 14.1016 C 49.7264 13.75 49.3045 13.4688 48.7890 13.1875 L 32.2657 3.7657 C 30.8126 2.9453 29.4063 2.5000 28.0000 2.5000 C 26.5938 2.5000 25.1875 2.9453 23.7344 3.7657 L 7.2110 13.1875 C 6.6954 13.4688 6.2735 13.75 5.9219 14.1016 Z M 26.4063 53.5 L 26.4063 29.4532 L 4.3985 16.8906 C 4.2813 17.4063 4.2110 17.9688 4.2110 18.6719 L 4.2110 36.9297 C 4.2110 40.3281 5.4063 41.5938 7.5860 42.8360 L 25.9375 53.2891 C 26.1016 53.3828 26.2422 53.4532 26.4063 53.5 Z M 29.5938 53.5 C 29.7579 53.4532 29.8985 53.3828 30.0626 53.2891 L 48.4141 42.8360 C 50.5938 41.5938 51.7890 40.3281 51.7890 36.9297 L 51.7890 18.6719 C 51.7890 17.9688 51.7189 17.4063 51.6018 16.8906 L 29.5938 29.4532 Z"
                    /></g
                ></svg
            >
        </button>
    </div>
    <div class="ml-[60%] mt-[10%]">
        <button class="btn btn-outline btn-warning btn-square btn-lg">
            <svg
                class="-mt-2.5 bi bi-cone"
                width="82px"
                height="82px"
                viewBox="0 0 16.00 16.00"
                xmlns="http://www.w3.org/2000/svg"
                fill="#dccc18"
                stroke="#dccc18"
                ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                /><g id="SVGRepo_iconCarrier">
                    <path
                        d="M7.03 1.88c.252-1.01 1.688-1.01 1.94 0l2.905 11.62H14a.5.5 0 0 1 0 1H2a.5.5 0 0 1 0-1h2.125L7.03 1.88z"
                    />
                </g></svg
            >
        </button>
        <button class="btn btn-outline btn-primary btn-square btn-lg">
            <svg
                class="-mt-2.5"
                fill="#c729c2"
                width="82px"
                height="82px"
                viewBox="0 0 56 56"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#c729c2"
                ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                /><g id="SVGRepo_iconCarrier"
                    ><path
                        d="M 28.0000 26.6406 L 50.0783 14.1016 C 49.7264 13.75 49.3045 13.4688 48.7890 13.1875 L 32.2657 3.7657 C 30.8126 2.9453 29.4063 2.5000 28.0000 2.5000 C 26.5938 2.5000 25.1875 2.9453 23.7344 3.7657 L 7.2110 13.1875 C 6.6954 13.4688 6.2735 13.75 5.9219 14.1016 Z M 26.4063 53.5 L 26.4063 29.4532 L 4.3985 16.8906 C 4.2813 17.4063 4.2110 17.9688 4.2110 18.6719 L 4.2110 36.9297 C 4.2110 40.3281 5.4063 41.5938 7.5860 42.8360 L 25.9375 53.2891 C 26.1016 53.3828 26.2422 53.4532 26.4063 53.5 Z M 29.5938 53.5 C 29.7579 53.4532 29.8985 53.3828 30.0626 53.2891 L 48.4141 42.8360 C 50.5938 41.5938 51.7890 40.3281 51.7890 36.9297 L 51.7890 18.6719 C 51.7890 17.9688 51.7189 17.4063 51.6018 16.8906 L 29.5938 29.4532 Z"
                    /></g
                ></svg
            >
        </button>
    </div>
</main>
