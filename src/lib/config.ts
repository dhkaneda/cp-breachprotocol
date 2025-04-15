// Type definitions for buffer configuration
export interface BufferParams {
  size: number;
  subSequence: [number, number][];
}

export type BufferKeyConfig = Record<number, BufferParams[]>;

export const config: {
  byteRange: string[];
  matrixSize: number;
  possibleDaemons: string[];
  bufferKey: BufferKeyConfig;
} = {
  byteRange: ['BD', 'E9', '55', '1C', '7A'],
  matrixSize: 5,
  possibleDaemons: [
    "Mass Vulnerability",
    "Camera Shutdown",
    "Contagion",
    "Short Circuit",
    "Ping",
    "Overheat",
    "Reboot Optics",
    "Sonic Shock",
    "Whistle",
    "Weapon Glitch",
    "Data Mine",
    "Memory Wipe",
    "Remote Deactivation",
    "Netdriver",
    "Distract Enemies",
    "Armor Hack",
    "Firewall Breach",
    "Quickhack Charge",
    "System Reset",
    "Subdermal Sensor",
    "Datamine",
    "Firewall Penetration",
    "Data Corruption",
    "Data Theft",
    "Backdoor",
  ],
  bufferKey: generateBufferKey(2, 6, { minSize: 4, maxSize: 14, minSubs: 2, maxSubs: 7 }),
};


export function generateBufferKey(
  minKey: number,
  maxKey: number,
  options: { minSize: number, maxSize: number, minSubs: number, maxSubs: number }
): BufferKeyConfig {
  const bufferKey: BufferKeyConfig = {};
  for (let key = minKey; key <= maxKey; key++) {
    const configs: BufferParams[] = [];
    for (let variant = 0; variant < 5; variant++) {
      const size = Math.min(options.minSize + key + variant, options.maxSize);
      const numSubs = Math.min(options.minSubs + Math.floor(key / 2) + variant, options.maxSubs);
      const subSequence: [number, number][] = [];
      let start = 0;
      for (let sub = 0; sub < numSubs; sub++) {
        const length = 2 + Math.floor(Math.random() * 3); // length 2–4
        if (start + length > size) break;
        subSequence.push([start, length]);
        start += length;
      }
      configs.push({ size, subSequence });
    }
    bufferKey[key] = configs;
  }
  return bufferKey;
};
