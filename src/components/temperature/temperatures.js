let readings = {};
const MAX_VALUES = 50;

function addReading (ts, name, value) {
    var node = getTemplate(ts);
    if (typeof value !== 'number') {
        return node;
    }
    if (!readings[name]) {
        readings[name] = [];
    }
    if (readings[name].length) {
        let latest = readings[name].pop();
        if (latest.time === node.time) {
            node = latest;
        }
    }
    node.value = value;
    readings[name].push(node);
    if (readings[name].length > MAX_VALUES) {
        readings[name].shift();
    }
    return node;
}

function getLatest (name) {
    let values = readings[name] || [];
    if (values.length) {
        return values[values.length - 1];
    }
    return getTemplate();
}

function getTemplate (time) {
    return {
        time: time || getTime(),
        value: ''
    };
}

function getTime () {
    var ts = new Date();
    var time = ts.getHours() + ':';
    var mins = ts.getMinutes();
    if (mins < 10) {
        mins = '0' + mins;
    }
    return time + mins;
}

export default {
    addReading,
    getLatest
};
