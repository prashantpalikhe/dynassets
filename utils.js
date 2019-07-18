export function randomHexColorCode() {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
}

export function randomNumberInRange(min, max) {
    return Math.random() * (max - min) + min;
}
