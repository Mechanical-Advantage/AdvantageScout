<script>
  import { liveGamepiece, liveLocation } from "./stores";
  export let gamePiece = "Cube";
  export let location = "Floor";
  export let gamePieceLocation = "Floor";

  let coneSVG = "";
  function updateGameObject() {
    $liveGamepiece = gamePiece;
    $liveLocation = gamePieceLocation;
  }
</script>

<button
  class="btn btn-square btn-outline w-24 h-24 {gamePiece === 'Cube'
    ? 'btn-accent'
    : 'btn-secondary'}  "
  on:click={updateGameObject}
>
  {#if gamePiece === "Cube"}
    <svg
      viewBox="0 0 64 64"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      fill="#000000"
      ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g><g id="SVGRepo_iconCarrier">
        <title>gen-lifebelt</title> <desc>Created with Sketch.</desc>
        <defs> </defs>
        <g
          id="General"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g id="SLICES-64px"> </g>
          <g id="ICONS" transform="translate(5.000000, 5.000000)">
            <g id="gen-lifebelt" transform="translate(0.000000, 2.000000)">
              <path
                d="M26.0001,40 C18.2681,40 12.0001,33.732 12.0001,26 C12.0001,18.267 18.2681,12 26.0001,12 C33.7321,12 40.0001,18.267 40.0001,26 C40.0001,33.732 33.7321,40 26.0001,40 M26.0001,0 C11.6411,0 0.0001,11.64 0.0001,26 C0.0001,40.359 11.6411,52 26.0001,52 C40.3591,52 52.0001,40.359 52.0001,26 C52.0001,11.64 40.3591,0 26.0001,0"
                id="Fill-464"
                fill="#fc761d"
              >
              </path>
              <path
                d="M3.0025,13.8716 L13.6385,19.4216 L13.6485,19.4116 C14.9905,16.9016 17.0765,14.8566 19.6105,13.5526 L19.6385,13.5256 L13.8725,3.0026 C9.2455,5.4476 5.4475,9.2456 3.0025,13.8716"
                id="Fill-465"
                fill="#F1F0E2"
              >
              </path>
              <path
                d="M38.128,3.0022 L32.361,13.5252 L32.39,13.5532 C34.923,14.8562 37.01,16.9012 38.352,19.4122 L38.361,19.4212 L48.998,13.8712 C46.553,9.2452 42.754,5.4472 38.128,3.0022"
                id="Fill-466"
                fill="#F1F0E2"
              >
              </path>
              <path
                d="M13.648,32.5872 L13.639,32.5782 L3.002,38.1282 C5.447,42.7542 9.246,46.5532 13.872,48.9972 L19.639,38.4742 L19.611,38.4472 C17.077,37.1442 14.99,35.0982 13.648,32.5872"
                id="Fill-467"
                fill="#F1F0E2"
              >
              </path>
              <path
                d="M48.9976,38.1284 L38.3616,32.5774 L38.3516,32.5864 C37.0106,35.0974 34.9236,37.1434 32.3896,38.4474 L32.3616,38.4744 L38.1276,48.9974 C42.7546,46.5524 46.5526,42.7544 48.9976,38.1284"
                id="Fill-468"
                fill="#F1F0E2"
              >
              </path>
              <path
                d="M2.9971,13.8689 C2.3621,12.7229 2.0001,11.4029 2.0001,9.9999 C2.0001,5.5819 5.5821,1.9999 10.0001,1.9999 C11.4031,1.9999 12.7231,2.3619 13.8691,2.9969"
                id="Stroke-469"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
              </path>
              <path
                d="M49.003,13.8689 C49.638,12.7229 50,11.4029 50,9.9999 C50,5.5819 46.418,1.9999 42,1.9999 C40.597,1.9999 39.277,2.3619 38.131,2.9969"
                id="Stroke-470"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
              </path>
              <path
                d="M2.9971,38.1311 C2.3621,39.2771 2.0001,40.5961 2.0001,42.0001 C2.0001,46.4171 5.5821,50.0001 10.0001,50.0001 C11.4031,50.0001 12.7231,49.6381 13.8691,49.0031"
                id="Stroke-471"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
              </path>
              <path
                d="M49.003,38.1311 C49.638,39.2771 50,40.5961 50,42.0001 C50,46.4171 46.418,50.0001 42,50.0001 C40.597,50.0001 39.277,49.6381 38.131,49.0031"
                id="Stroke-472"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
              </path>
              <path
                d="M52.0001,26 C52.0001,11.64 40.3591,0 26.0001,0 C11.6411,0 0.0001,11.64 0.0001,26 C0.0001,40.359 11.6411,52 26.0001,52 C40.3591,52 52.0001,40.359 52.0001,26 Z"
                id="Stroke-473"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
              </path>
              <path
                d="M40.0001,26 C40.0001,33.732 33.7321,40 26.0001,40 C18.2681,40 12.0001,33.732 12.0001,26 C12.0001,18.267 18.2681,12 26.0001,12 C33.7321,12 40.0001,18.267 40.0001,26 Z"
                id="Stroke-474"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
              </path>
              <path
                d="M13.8692,2.9968 L19.6392,13.5248"
                id="Stroke-475"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
              </path>
              <path
                d="M13.6387,19.4216 L2.9967,13.8686"
                id="Stroke-476"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
              </path>
              <path
                d="M38.1309,2.9968 L32.3609,13.5248"
                id="Stroke-477"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
              </path>
              <path
                d="M38.3614,19.4216 L49.0034,13.8686"
                id="Stroke-478"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
              </path>
              <path
                d="M13.8692,49.0027 L19.6392,38.4747"
                id="Stroke-479"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
              </path>
              <path
                d="M13.6387,32.5779 L2.9967,38.1309"
                id="Stroke-480"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
              </path>
              <path
                d="M38.1309,49.0027 L32.3609,38.4747"
                id="Stroke-481"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
              </path>
              <path
                d="M38.3614,32.5779 L49.0034,38.1309"
                id="Stroke-482"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
              </path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  {:else}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      enable-background="new 0 0 64 64"
      ><path
        d="m32 2c-16.568 0-30 13.432-30 30 0 16.569 13.432 30 30 30s30-13.431 30-30c0-16.568-13.432-30-30-30m0 45c-8.283 0-15-6.716-15-15s6.717-15 15-15c8.285 0 15 6.716 15 15s-6.715 15-15 15"
        fill="#fc761d"
      /></svg
    >
  {/if}
</button>
