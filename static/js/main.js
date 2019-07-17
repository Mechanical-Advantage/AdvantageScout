// Check for device name
if (window.localStorage.getItem("advantagescout_device") == null) {
    window.location = "/config"
} else {
    var connected = true
    var state = 0
    function ping() {
        const http = new XMLHttpRequest()
        
        http.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    connected = true
                } else {
                    connected = false
                }
            }
        }
        
        http.open("POST", "/heartbeat", true)
        http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        http.send("device_name=" + encodeURI(window.localStorage.getItem("advantagescout_device")) + "&state=" + state.toString())
    }
    ping()
    setInterval(function() {ping()}, 3000)
}
