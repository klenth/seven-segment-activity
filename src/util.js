function encode(obj) {
    return btoa(JSON.stringify(obj));
}

function decode(b64) {
    return JSON.parse(atob(b64));
}

function integer_quotient(m, n) {
    return Math.trunc(m / n);
}

const exports = {
    encode: encode,
    decode: decode,
    integer_quotient: integer_quotient,
}

export default exports;
