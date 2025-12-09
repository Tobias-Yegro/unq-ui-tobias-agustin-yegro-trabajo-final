import { audioConfig, subscribeVolume } from "./audioConfig";

export function createSound(src) {
    const audio = new Audio(src);

    audio.volume = audioConfig.volume;

    subscribeVolume(v => {
        audio.volume = v;
    });

    return audio;
}
