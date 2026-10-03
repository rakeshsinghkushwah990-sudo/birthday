"""Generates the Lottie animations and placeholder audio used by the site.
Not needed at runtime — kept so the assets can be regenerated/tweaked."""
import json, numpy as np, subprocess, os, wave

OUT_L = 'src/assets/lottie'
OUT_A = 'public/audio'

def kf(t, s, ease=(0.42, 0.58)):
    n = len(s)
    return {"t": t, "s": s, "i": {"x": [ease[1]] * n, "y": [1] * n}, "o": {"x": [ease[0]] * n, "y": [0] * n}}

def static(v): return {"a": 0, "k": v}
def anim(keys): return {"a": 1, "k": keys}

def tr(p=(0, 0), s=(100, 100), r=0, o=100):
    return {"ty": "tr", "p": static(list(p)), "a": static([0, 0]), "s": static(list(s)), "r": static(r), "o": static(o), "sk": static(0), "sa": static(0)}

def fill(rgb, o=100): return {"ty": "fl", "c": static(list(rgb) + [1]), "o": static(o), "r": 1}
def stroke(rgb, w, o=100): return {"ty": "st", "c": static(list(rgb) + [1]), "o": static(o), "w": static(w), "lc": 2, "lj": 2}

def hex2(h): h = h.lstrip('#'); return [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)]

HEART = {"c": True,
         "v": [[0, 60], [-45, -40], [0, -32], [45, -40]],
         "o": [[-50, -35], [20, -22], [0, -18], [25, 30]],
         "i": [[50, -35], [-25, 30], [0, -18], [-20, -22]]}

def layer(ind, nm, shapes, ks, ip=0, op=60):
    return {"ddd": 0, "ind": ind, "ty": 4, "nm": nm, "sr": 1, "ks": ks, "ao": 0, "shapes": shapes, "ip": ip, "op": op, "st": 0, "bm": 0}

def ks(p, s=None, o=None, r=None):
    return {"o": o or static(100), "r": r or static(0), "p": static(list(p) + [0]), "a": static([0, 0, 0]), "s": s or static([100, 100, 100])}

# ---------- heartbeat ----------
heart_group = {"ty": "gr", "nm": "heart", "it": [
    {"ty": "sh", "ks": static(HEART)},
    fill(hex2('#e8577a')),
    tr()]}
shine = {"ty": "gr", "nm": "shine", "it": [
    {"ty": "el", "p": static([-22, -22]), "s": static([18, 26])},
    fill([1, 1, 1], 45), tr(r=-35)]}
beat = anim([kf(0, [100, 100, 100]), kf(8, [116, 116, 100]), kf(16, [100, 100, 100]), kf(24, [110, 110, 100]), kf(34, [100, 100, 100]), {"t": 60, "s": [100, 100, 100]}])
ripple = lambda ind, d: layer(ind, f"ripple{ind}", [{"ty": "gr", "it": [{"ty": "sh", "ks": static(HEART)}, stroke(hex2('#f59ab5'), 4), tr()]}],
    {"o": anim([kf(d, [70]), kf(d + 30, [0]), {"t": 60, "s": [0]}]), "r": static(0), "p": static([100, 104, 0]), "a": static([0, 0, 0]),
     "s": anim([kf(d, [100, 100, 100]), kf(d + 30, [165, 165, 100]), {"t": 60, "s": [165, 165, 100]}])})
heartbeat = {"v": "5.7.4", "fr": 30, "ip": 0, "op": 60, "w": 200, "h": 200, "nm": "heartbeat", "ddd": 0, "assets": [],
             "layers": [layer(1, "heart", [shine, heart_group], {"o": static(100), "r": static(0), "p": static([100, 104, 0]), "a": static([0, 0, 0]), "s": beat}),
                        ripple(2, 6), ripple(3, 22)]}
json.dump(heartbeat, open(f'{OUT_L}/heartbeat.json', 'w'))

# ---------- sparkles ----------
def star_path(R, r):
    v = []
    for k in range(8):
        a = np.pi / 4 * k - np.pi / 2
        rad = R if k % 2 == 0 else r
        v.append([round(float(np.cos(a) * rad), 2), round(float(np.sin(a) * rad), 2)])
    z = [[0, 0]] * 8
    return {"c": True, "v": v, "i": z, "o": z}

spots = [(50, 60, 0, 1.0, '#f6c86b'), (150, 45, 12, 0.7, '#fff3c4'), (160, 140, 24, 0.9, '#f6c86b'),
         (45, 150, 36, 0.6, '#ffd6e5'), (100, 100, 18, 1.2, '#fff8e1'), (110, 30, 42, 0.5, '#ffd6e5')]
layers = []
for i, (x, y, d, sc, col) in enumerate(spots):
    S = 100 * sc
    scale = anim([kf(d % 60, [0, 0, 100]), kf((d + 12) % 60 if d + 12 < 60 else 59, [S, S, 100]), {"t": min(d + 26, 60), "s": [0, 0, 100]}])
    layers.append(layer(i + 1, f"s{i}", [{"ty": "gr", "it": [{"ty": "sh", "ks": static(star_path(14, 3.5))}, fill(hex2(col)), tr()]}],
                        {"o": static(100), "r": anim([kf(0, [0]), {"t": 60, "s": [90]}]), "p": static([x, y, 0]), "a": static([0, 0, 0]), "s": scale}))
json.dump({"v": "5.7.4", "fr": 30, "ip": 0, "op": 60, "w": 200, "h": 200, "nm": "sparkles", "ddd": 0, "assets": [], "layers": layers},
          open(f'{OUT_L}/sparkles.json', 'w'))

# ---------- audio ----------
SR = 44100
def midi(n): return 440 * 2 ** ((n - 69) / 12)

def tone(freq, dur, amp, decay=1.3, harm=(1, .35, .12, .05)):
    t = np.arange(int(dur * SR)) / SR
    env = np.minimum(t / 0.006, 1) * np.exp(-t / decay)
    w = sum(h * np.sin(2 * np.pi * freq * (k + 1) * t * (1 + 0.0004 * k)) for k, h in enumerate(harm))
    return amp * env * w

def reverb(x, secs=2.2, wet=0.28):
    n = len(x)
    ir = np.random.default_rng(3).standard_normal(int(secs * SR)) * np.exp(-np.arange(int(secs * SR)) / SR / (secs / 5))
    ir /= np.sqrt((ir ** 2).sum())
    pad = np.zeros(n); pad[:len(ir)] = ir
    wetsig = np.real(np.fft.ifft(np.fft.fft(x) * np.fft.fft(pad)))  # circular => seamless loop
    return (1 - wet) * x + wet * wetsig * 3

def write(name, L, R):
    st = np.stack([L, R], 1)
    st = st / np.abs(st).max() * 0.7
    tmp = f'/tmp/{name}.wav'
    with wave.open(tmp, 'w') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((st * 32767).astype(np.int16).tobytes())
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', tmp, '-b:a', '128k', f'{OUT_A}/{name}.mp3'], check=True)

bpm = 66; beat = 60 / bpm
chords = [[62, 66, 69, 73], [61, 64, 69, 76], [59, 62, 66, 69], [55, 59, 62, 66]]  # Dmaj7, A/C#, Bm7, Gmaj7
bass = [38, 37, 35, 43]
total = int(32 * beat * SR)
L = np.zeros(total + SR * 4); R = np.zeros_like(L)
def add(sig, start, pan):
    s = int(start * SR); e = s + len(sig)
    L[s:e] += sig * (1 - pan); R[s:e] += sig * pan
pattern = [0, 1, 2, 3, 2, 1, 2, 3]
melody = {0: 78, 6: 76, 8: 76, 14: 73, 16: 74, 22: 73, 24: 71, 28: 69}
for ci, ch in enumerate(chords):
    for bar in range(2):
        b0 = (ci * 8 + bar * 4) * beat
        add(tone(midi(bass[ci]), 4, .32, 2.5, (1, .2)), b0, .5)
        for k, idx in enumerate(pattern):
            n = ch[idx] + (12 if (bar == 1 and k in (3, 7)) else 0)
            add(tone(midi(n), 2.5, .13, 1.1), b0 + k * beat / 2, .3 + .4 * (k % 2))
        # soft pad
        t = np.arange(int(4 * beat * SR)) / SR
        penv = np.sin(np.pi * t / t[-1]) ** 1.5
        pad = sum(np.sin(2 * np.pi * midi(n - 12) * t) for n in ch[:3]) * .035 * penv * (1 + .15 * np.sin(2 * np.pi * .5 * t))
        add(pad, b0, .5)
for b, n in melody.items():
    add(tone(midi(n), 3, .2, 1.6, (1, .5, .2, .1, .05)), b * beat, .55)
# wrap tail onto start for a seamless loop
L[:len(L) - total] += L[total:]; R[:len(R) - total] += R[total:]
L, R = L[:total], R[:total]
write('background-music', reverb(L), reverb(R))

print('done')
