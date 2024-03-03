<script>
    import { onMount } from "svelte";
    import {autoVideoBase64} from "./stores"

    let controlButton;
    let playbackRateSelect;
    let videoLive;
    let videoRecorded
    let recording=false
    let viewing=true
  

    var mediaRecorder;

    function loadVideo (base64String){
        console.info("Loading video")
        videoRecorded.src = "data:video/webm;" + base64String.substring(36)
    }
    
    // stop both mic and camera
    function stopBothVideoAndAudio(stream) {
        stream.getTracks().forEach((track) => {
            if (track.readyState == 'live') {
                track.stop();
            }
        });
    }

    function register () {

        controlButton.addEventListener('click', async () => {
            if(viewing==true){
                const stream = await navigator.mediaDevices.getUserMedia({ 
                                video: { frameRate: { ideal: 10, max: 15 } },
                                audio: true,
                                })
        
                videoLive.srcObject = stream
            
                if (!MediaRecorder.isTypeSupported('video/webm')) { 
                    console.warn('video/webm is not supported')
                    }
            
                mediaRecorder = new MediaRecorder(stream, { 
                                                    mimeType: 'video/webm',
                                                    })
                recording=true
                viewing=false
                videoLive.play()
                mediaRecorder.start()

                mediaRecorder.addEventListener('dataavailable', event => {   
                    var reader = new FileReader();
                    reader.readAsDataURL(event.data); 
                    //Only necessaary for base64
                    reader.onloadend = function() {
                        $autoVideoBase64 = reader.result;
                    }       
                    
                    if (event.data.size>0)
                        console.info("size: " + event.data.size)
                        videoRecorded.src = URL.createObjectURL(event.data) 
                    videoRecorded.playbackRate=playbackRateSelect.value
                })

            }
            else {
                recording=false
                viewing=true
                videoLive.pause()
                stopBothVideoAndAudio(videoLive.srcObject)
                mediaRecorder.stop()
            }
            })

    
        
    }

    onMount(() => {
            if ($autoVideoBase64.length>0) {
                loadVideo($autoVideoBase64)
            }

            register()
        }
    )



</script>


   
<div class="h-auto w-auto flex flex-col rounded-lg overflow-hidden bg-black shadow">
    <!-- card cover -->
    <!-- <img class="h-56 w-full object-cover" src="https://images.unsplash.com/photo-1514897575457-c4db467cf78e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=384" alt="" /> -->
    <video class="object-cover"  muted playsinline bind:this={videoLive} class:viewing></video>
    <video class="object-cover" controls playsinline bind:this={videoRecorded} class:recording></video>
    <!-- end card cover -->

    <!-- card footer -->
    <div class="grid grid-cols-6 px-6 py-4 bg-slate-500"> 
        <div class="col-span-3">
            Playback Speed
        </div>
        <div class="col-span-2">
            <select  bind:this={playbackRateSelect} on:change={()=>{videoRecorded.playbackRate=playbackRateSelect.value}}>
            <option value="0.5">0.5x</option>
            <option value="1.0">1.0x</option>
            <option value="1.5"  selected="selected">1.5x</option>
            <option value="2.0">2.0x</option>
            </select>
        </div>
        <div>
            <button type="button" class="bg-blue-600 hover:bg-blue-700 py-2 px-2 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none" bind:this={controlButton}>
                {#if viewing==true}
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                        <circle cx="20" cy="20" r="15" fill="red" />
                    </svg>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                        <line x1="15"  y1="10" x2="15" y2="30" style="stroke:white;stroke-width:4" />
                        <line x1="25"  y1="10" x2="25" y2="30" style="stroke:white;stroke-width:4" />
                    </svg>
                {/if}
            </button>
        </div>
    <!-- end card footer -->
    </div>
</div>



<style>
    .recording {
        display: none
    }
    .viewing {
        display: none
    }

    button {
        border-style: solid;
        border: 2px solid rgb(240, 221, 9);
    }
    select {
        background-color:#000;
        border-style: solid;
        border: 2px solid rgb(255, 255, 255);
        margin: 2px 2px 2px 2px;
        color:#FFF;
    }
    select * {
        background-color:#000;
        color:#FFF;
    }
</style>