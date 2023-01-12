export const getUserTimes = (user, session) => {
    // Access DB to get all times from the current session
}

export const getGuestTimes = (session) => {
    // Access SessionStorage using the current session to get all times and return an array of the times
    let lsTimes = localStorage.getItem('monkeyTimes' + session);
    console.log(lsTimes)
    return lsTimes ? JSON.parse(lsTimes) : null
}