
import Promise from 'bluebird';
export default {
    getList,
    setState
};
var lights = [
    {
        id: 'ulko',
        name: 'Ulkovalot',
        toggle (powerOn) {
            const id = 7;
            let onOrOff = powerOn ? 'on' : 'off';
            return fetch(`http://10.0.0.14:3000/dev/${id}/${onOrOff}`);
        }
    },
    {
        id: 'sohva',
        name: 'Sohva',
        toggle (powerOn) {
            const id = 2;
            let onOrOff = powerOn ? 'press' : 'hold';
            return fetch(`http://10.0.0.10/buttons/${id}/${onOrOff}`);
        }
    }
];

function getList () {
    return new Promise((resolve, reject) => {
        resolve(lights);
    });
};

function find (id) {
    let light = lights.filter(x => x.id === id);
    if (light.length === 1) {
        return light[0];
    }
    return null;
}
function setState (lightId, powerOn) {
    console.log('Turning light', lightId, 'on', powerOn);
    var light = find(lightId);
    return new Promise((resolve, reject) => {
        if (!light) {
            reject('Invalid id');
            return;
        }
        light.toggle(powerOn)
        .then(function (res) {
            resolve(powerOn);
        })
        .catch(function (res) {
            console.warn('asdf', res);
            reject('Virhe!');
        });
    });
}
