// Responsible for the block scheduling section
function BlockScheduleManager(adminManager) {
    this.create = function () {
        adminManager.request("POST", "/block_schedule", function (data) {
            alert(data)
        }, {
            training_length: Number(document.getElementById("blockTrainingLength").value),
            group_size: Number(document.getElementById("blockGroupSize").value),
            break_length: Number(document.getElementById("blockBreakLength").value),
            start: Number(document.getElementById("blockStart").value),
            end: Number(document.getElementById("blockEnd").value)
        }, "Failed to create block schedule")
    }
}