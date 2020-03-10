// Responsible for alert boxes on mobile app
function AppNotificationManager(appManager) {
    this.alert = function (title, text) {
        navigator.notification.alert(text, function () { }, title)
    }

    this.confirm = function (title, text, buttons, callback) {
        navigator.notification.confirm(text, callback, title, buttons)
    }

    this.beep = function (times) {
        navigator.notification.beep(times)
    }
}
