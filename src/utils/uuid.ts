export default function uuid() {
    let f = (Math.random() * 46656) | 0;
    let s = (Math.random() * 46656) | 0;
    const firstPart = ("000" + f.toString(36)).slice(-3);
    const secondPart = ("000" + s.toString(36)).slice(-3);
    return firstPart + secondPart;
}