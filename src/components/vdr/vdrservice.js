
import Promise from 'bluebird';
export default {
    getTimers,
    getChannels,
    addTimer
};
const baseURL = 'http://10.0.0.10/vdr';

const preferredOrder = [
    'Yle TV1 HD',
    'Yle TV2 HD',
    'MTV3 HD',
    'Nelonen HD',
    'Yle Teema & Fem HD',
    'Sub HD',
    'TV5',
    'Liv',
    'Jim',
    'Kutonen',
    'TLC Finland',
    'FOX',
    'AVA HD',
    'Hero',
    'Frii',
    'National Geographic',
    'MTV Finland'
];

// {"channel":"C-0-2-529-0","name":"The Walking Dead (16)","desc":"","startDate":1489435020000,"endDate":1489438980000,"duration":66}
function getTimers () {
    return new Promise((resolve, reject) => {
        fetch(baseURL + '/timers', {
            method: 'get'
        }).then(response => {
            resolve(response.json());
        }).catch(err => {
            console.warn(err);
            reject('Ajastusten lataus epäonnistui');
        });
    });
};
function addTimer (program) {
    console.log('adding timer for', program);
    return new Promise((resolve, reject) => {
        fetch(baseURL + '/timers', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                channel: program.channel,
                name: program.name,
                startDate: program.startDate,
                endDate: program.endDate
            })
        })
        .then(function (res) {
            resolve(res.json());
        })
        .catch(function (res) {
            console.warn(res);
            reject('Virhe ajastuksessa, yritä uudelleen!');
        });
    });
}
function getChannels () {
    return new Promise((resolve, reject) => {
        fetch(baseURL + '/channels', {
            method: 'get'
        }).then(response => {
            resolve(response.json().then(sortChannels));
        }).catch(err => {
            console.warn(err);
            reject('Kanavien lataus epäonnistui');
        });
    });
}

function sortChannels (channels) {
    return new Promise((resolve, reject) => {
        channels.sort((a, b) => {
            let aIndex = preferredOrder.indexOf(a.name);
            let bIndex = preferredOrder.indexOf(b.name);
            if (aIndex !== -1 && bIndex === -1) {
                // a present, b not
                return -1;
            }
            if (bIndex !== -1 && aIndex === -1) {
                // b present, a not
                return 1;
            }
            if (bIndex + aIndex === -2) {
                // both missing
                return a.name.localeCompare(b.name);
            }
            // both present
            return -(bIndex - aIndex);
        });
        resolve(channels);
    });
}
