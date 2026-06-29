function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    return new Ctx();
  } catch {
    return null;
  }
}

export function playGoalSound(): void {
  const ctx = getCtx();
  if (!ctx) return;
  try {
    const sr = ctx.sampleRate;

    // --- Ruído de torcida ---
    const buf = ctx.createBuffer(1, sr * 3, sr);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    const crowd = ctx.createBufferSource();
    crowd.buffer = buf;

    // Dois filtros bandpass empilhados → textura de multidão
    const bp1 = ctx.createBiquadFilter();
    bp1.type = "bandpass";
    bp1.frequency.value = 600;
    bp1.Q.value = 0.9;

    const bp2 = ctx.createBiquadFilter();
    bp2.type = "bandpass";
    bp2.frequency.value = 2200;
    bp2.Q.value = 1.8;

    const crowdGain = ctx.createGain();
    crowdGain.gain.setValueAtTime(0, ctx.currentTime);
    crowdGain.gain.linearRampToValueAtTime(0.45, ctx.currentTime + 0.06);
    crowdGain.gain.setValueAtTime(0.38, ctx.currentTime + 0.5);
    crowdGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3);

    crowd.connect(bp1);
    crowd.connect(bp2);
    bp1.connect(crowdGain);
    bp2.connect(crowdGain);
    crowdGain.connect(ctx.destination);
    crowd.start();
    crowd.stop(ctx.currentTime + 3);

    // --- Fanfarra ascendente: C5 E5 G5 C6 ---
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.11;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.14, t + 0.04);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.6);
    });

    setTimeout(() => ctx.close().catch(() => {}), 4000);
  } catch {
    ctx.close().catch(() => {});
  }
}

export function playChampionSound(): void {
  const ctx = getCtx();
  if (!ctx) return;
  try {
    const sr = ctx.sampleRate;

    // Torcida épica — ruído mais longo e intenso
    const buf = ctx.createBuffer(1, sr * 5, sr);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    const crowd = ctx.createBufferSource();
    crowd.buffer = buf;

    const bp1 = ctx.createBiquadFilter();
    bp1.type = "bandpass";
    bp1.frequency.value = 700;
    bp1.Q.value = 0.8;

    const bp2 = ctx.createBiquadFilter();
    bp2.type = "bandpass";
    bp2.frequency.value = 2400;
    bp2.Q.value = 1.5;

    const crowdGain = ctx.createGain();
    crowdGain.gain.setValueAtTime(0, ctx.currentTime);
    crowdGain.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 0.08);
    crowdGain.gain.setValueAtTime(0.55, ctx.currentTime + 1.5);
    crowdGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 5);

    crowd.connect(bp1);
    crowd.connect(bp2);
    bp1.connect(crowdGain);
    bp2.connect(crowdGain);
    crowdGain.connect(ctx.destination);
    crowd.start();
    crowd.stop(ctx.currentTime + 5);

    // Fanfarra triunfal: arpejo C-E-G-C-E-G-C em oitavas
    const fanfare = [261.63, 329.63, 392, 523.25, 659.25, 783.99, 1046.5];
    fanfare.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.13;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.18, t + 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.9);
    });

    // Sino final dourado
    [1047, 1319, 1568].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const t = ctx.currentTime + 1.0 + i * 0.22;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.12, t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.001, t + 1.5);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 1.5);
    });

    setTimeout(() => ctx.close().catch(() => {}), 6000);
  } catch {
    ctx.close().catch(() => {});
  }
}

export function playWhistleSound(): void {
  const ctx = getCtx();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.value = 2900;

    lfo.type = "sine";
    lfo.frequency.value = 10;
    lfoGain.gain.value = 40;

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.2, ctx.currentTime + 0.45);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

    osc.connect(gain);
    gain.connect(ctx.destination);

    lfo.start();
    osc.start();
    lfo.stop(ctx.currentTime + 0.9);
    osc.stop(ctx.currentTime + 0.9);

    setTimeout(() => ctx.close().catch(() => {}), 1500);
  } catch {
    ctx.close().catch(() => {});
  }
}
