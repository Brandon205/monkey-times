export const getUserTimes = (user, session) => {
    // Access DB to get all times from the current session
}

export const getGuestTimes = (session) => {
    // Access SessionStorage using the current session to get all times and return an array of the times
    let lsTimes = localStorage.getItem('monkeyTimes' + session);
    if (lsTimes) {
        return JSON.parse(lsTimes)
    }
    return []
}

export const msToTime = (s) => {

    function pad(n, z) {
        z = z || 2;
        return ('00' + n).slice(-z);
    }

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;

    return pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
}

export const msToTimeSlow = (s) => {

    function pad(n, z) {
        z = z || 2;
        return ('00' + n).slice(-z);
    }

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;

    return pad(mins) + ':' + pad(secs) + '.' + pad(ms, 1);
}
