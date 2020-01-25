// Responsible for alert boxes on web
function WebNotificationManager(appManager) {
    this.alert = function (title, text) {
        alert(text)
    }

    this.confirm = function (title, text, buttons, callback) {
        var success = confirm(text)
        if (success) {
            callback(1)
        } else {
            callback(2)
        }
    }
}
