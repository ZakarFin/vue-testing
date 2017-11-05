
import Promise from 'bluebird';
export default {
    getTimers,
    getChannels,
    addTimer
};
const baseURL = 'http://10.0.0.10/vdr';

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
            resolve(response.json());
        }).catch(err => {
            console.warn(err);
            reject('Kanavien lataus epäonnistui');
        });
    });
}
