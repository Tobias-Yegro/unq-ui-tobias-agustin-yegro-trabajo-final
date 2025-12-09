export const audioConfig = {
    volume: 1.0,
    listeners: [],

    notify() {
        this.listeners.forEach(fn => fn(this.volume));
    }
};

export function setGlobalVolume(v) {
    audioConfig.volume = v;
    audioConfig.notify();
}

export function subscribeVolume(fn) {
    audioConfig.listeners.push(fn);
}
