// Responsible for the uploaded matches section
function UploadedManager(adminManager) {
    // Update list of uploaded matches from server
    this.get = function () {
        adminManager.request("GET", "/get_uploaded", function (data) {
            uploaded = JSON.parse(data)
            var uploadedTable = document.getElementById("uploadedTable")
            while (uploadedTable.children[1]) {
                uploadedTable.removeChild(uploadedTable.children[1])
            }
            document.getElementById("uploadedDiv").hidden = uploaded.length == 0
            if (uploaded.length > 0) {
                for (var matchNumber = 0; matchNumber < uploaded.length; matchNumber++) {
                    var row = document.createElement("TR")
                    var cell = document.createElement("TD")
                    cell.classList.add("uploadedcell")
                    cell.innerHTML = matchNumber + 1
                    row.appendChild(cell)
                    for (var i = 0; i < uploaded[matchNumber].teams.length; i++) {
                        var cell = document.createElement("TD")
                        cell.classList.add("uploadedcell")
                        cell.innerHTML = uploaded[matchNumber].teams[i]
                        if (uploaded[matchNumber].uploaded[i]) {
                            cell.style.backgroundColor = "#ffff00"
                        }
                        row.appendChild(cell)
                    }
                    uploadedTable.appendChild(row)
                }
            }
        })
    }
}