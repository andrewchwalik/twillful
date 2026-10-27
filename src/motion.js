const clamp = value => Math.min(1, Math.max(0, value));
const mix = (from, to, progress) => from + (to - from) * progress;
const smootherstep = t => t * t * t * (t * (t * 6 - 15) + 10);

// A single continuous trajectory: the whole stack rises, then opens while still moving.
// No independently eased waypoints, timers, or layout changes during playback.
export function entranceFrames(end, belowFold, count = 180) {
  return Array.from({ length: count + 1 }, (_, index) => {
    const time = index / count;
    const rise = 1 - Math.pow(1 - clamp(time / 0.82), 4);
    const spread = smootherstep(clamp((time - 0.28) / 0.72));
    const x = mix(-42, end.x, spread);
    const y = mix(belowFold, 48, rise) + (end.y - 48) * spread - 10 * Math.sin(Math.PI * spread);
    const scale = 0.88 + 0.12 * rise + 0.035 * Math.sin(Math.PI * rise);
    const rotate = mix(6, end.rotate, spread);
    return {
      offset: time,
      opacity: clamp(time / 0.065),
      transform: `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`
    };
  });
}

export const finalCardTransform = end => `translate3d(${end.x}px, ${end.y}px, 0) scale(1) rotate(${end.rotate}deg)`;
