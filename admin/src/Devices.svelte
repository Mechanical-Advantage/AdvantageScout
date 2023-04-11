<script>
    import { onMount } from "svelte";
    import { get } from "svelte/store";

    let devices = [];

    async function getData() {
        const response = await fetch("/get_devices", { method: "GET" });
        const data = await response.json();
        devices = data;
        //console.log("Data" + data)
    }
    setInterval(getData, 1500);

    // if device.last_battery is between 70 - 100, bg-green-500
    // if device.last_battery is between 30 - 69, bg-yellow-500
    // if device.last_battery is between 0 - 29, bg-red-500

    const batteryColor = (battery, charge) => {
        let batteryCharge;
        let chargeStatus;
        if (charge == 1) {
            chargeStatus = "animate-pulse duration-30000 ";
        } else if (battery < 30) {
            chargeStatus = "animate-pulse duration-1000 ";
        }

        if (battery >= 70) {
            batteryCharge = "text-black bg-green-500";
        } else if (battery >= 30) {
            batteryCharge = "text-black bg-yellow-500";
        } else {
            batteryCharge = "text-white bg-red-500";
        }
        return batteryCharge + " " + chargeStatus;
    };

    const scoutStatus = (status) => {
        if (status == 1) {
            return "Auto";
        } else if (status == 2) {
            return "Teleop";
        } else if (status == 3) {
            return "Endgame";
        } else if (status == 4) {
            return "Offline";
        } else if (status == 5) {
            return "Pit Scout";
        }
    };

    function formattedTime(unixTime) {
        let diff = Math.round(Date.now() / 1000) - unixTime;
        let hours = Math.floor(diff / 3600);
        diff -= hours * 3600;
        let minutes = Math.floor(diff / 60);
        let seconds = diff - minutes * 60;

        let formatted = "";
        if (hours != 0) {
            formatted = String(hours) + "h ";
        }
        if (minutes != 0) {
            formatted = formatted + String(minutes) + "m ";
        }
        if (seconds != 0) {
            formatted = formatted + String(seconds) + "s ";
        }
        formatted = formatted.substring(0, formatted.length - 1);
        if (formatted == "") {
            formatted = "0s";
        }
        return formatted;
    }
</script>

<table class="table-auto border-separate border-spacing-2">
    <thead>
        <tr class="border-slate-700">
            <th>Device Name</th>
            <th>Heartbeat</th>
            <th>Route</th>
            <th>Battery</th>
            <th>Status</th>
            <th>Team</th>
            <th>Match</th>
            <th>Scout Name</th>
        </tr>
    </thead>
    <tbody class="rounded-md">
        {#each devices as device}
            <tr>
                <td>{device.name}</td>
                <td
                    class={Math.round(Date.now() / 1000) -
                        device.last_heartbeat >
                    30
                        ? "bg-red-500"
                        : Math.round(Date.now() / 1000) -
                              device.last_heartbeat <
                          10
                        ? "bg-green-500"
                        : "bg-yellow-500"}
                    >{formattedTime(device.last_heartbeat)}</td
                >
                <td>{device.last_route}</td>
                <td
                    class={batteryColor(
                        device.last_battery,
                        device.last_charging
                    )}>{device.last_battery}</td
                >
                <td>{scoutStatus(device.last_status)}</td>
                <td
                    >{device.last_team != null
                        ? device.last_team
                        : "No Team"}</td
                >
                <td
                    >{device.last_match != null
                        ? device.last_match
                        : "No Matches"}</td
                >
                <td
                    >{device.last_scoutname != null
                        ? device.last_scoutname
                        : "No Scout"}</td
                >
            </tr>
        {/each}
    </tbody>
</table>
