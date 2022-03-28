function encode(obj) {
    return btoa(JSON.stringify(obj));
}

function decode(b64) {
    return JSON.parse(atob(b64));
}

function integer_quotient(m, n) {
    return Math.trunc(m / n);
}

function join(delim, values) {
    let s = '';
    for (let v of values)
        s += v + delim;
    return s.slice(0, s.length - delim.length);
}

const exports = {
    encode: encode,
    decode: decode,
    integer_quotient: integer_quotient,
    join: join,
}

export default exports;
