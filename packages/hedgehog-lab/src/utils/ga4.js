import ReactGA from 'react-ga4'

const hostname = window.location.hostname;

let gaID
switch (hostname) {
    case "preview.hlab.app":
        gaID = "G-FLQZFQEJBL";
        break;
    case "hlab.app":
        gaID = "G-6RED8ZS8V6";
        break;
    default:
        gaID = "";
}

// initialize Google Analytics
ReactGA.initialize(gaID)


// custom pageview with the location from react router
export const pageView = path => {
    return ReactGA.send({hitType: 'pageview', page: path})
}

// custom event with label being an optional parameter
export const customEvent = (category, action, label = '') => {
    return ReactGA.event({
        category: category,
        action: action,
        label: label,
    })
}
