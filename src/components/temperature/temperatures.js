let readings = [];
const MAX_VALUES = 50;

function addReading (ts, name, value) {
    var node = getTemplate(ts);
    if (readings.length) {
        let latest = readings.pop();
        if (latest.time === node.time) {
            node = latest;
        }
    }
    if (value) {
        node.values[name] = value;
    }
    readings.push(node);
    if (readings.length > MAX_VALUES) {
        readings.shift();
    }
    return node;
}

function getLatest () {
    if (readings.length) {
        return readings[readings.length - 1];
    }
    return getTemplate();
}

function getTemplate (time) {
    time = time || getTime();
    return {
        time,
        values: {}
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
