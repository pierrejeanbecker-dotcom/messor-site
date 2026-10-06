"""Musique originale de la vidéo Messor (70 s), synthétisée entièrement par ce script : libre de droits.

120 BPM (1 temps = 0,5 s) : chaque changement de scène (6, 14, 21, 33, 42, 51, 61 s) tombe sur un temps.
Grille d'accords Am – F – C – G (une mesure de 2 s chacun), résolution finale sur Do majeur.
Usage : python3 video/music.py [sortie.wav]   (nécessite numpy)
"""
import sys
import wave
import numpy as np

SR = 44100
DUR = 70.0
END = 61.0  # début de la conclusion
N = int(SR * DUR)
BEAT = 0.5
BAR = 4 * BEAT
rng = np.random.default_rng(7)


def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


# Accords (MIDI) : voicing médium, basse, notes d'arpège
CHORDS = [
    {'pad': [57, 60, 64, 69], 'bass': 33, 'arp': [69, 72, 76, 72]},  # Am
    {'pad': [53, 57, 60, 65], 'bass': 29, 'arp': [65, 69, 72, 69]},  # F
    {'pad': [55, 60, 64, 67], 'bass': 36, 'arp': [67, 72, 76, 72]},  # C
    {'pad': [55, 59, 62, 67], 'bass': 31, 'arp': [67, 71, 74, 71]},  # G
]
C_MAJ = {'pad': [48, 55, 60, 64, 67], 'bass': 24, 'arp': [72, 76, 79, 84]}


def chord_at(t):
    return CHORDS[int(t // BAR) % 4]


def buf():
    return np.zeros(N)


def place(dst, sig, t0, gain=1.0):
    i = int(t0 * SR)
    if i >= N:
        return
    j = min(N, i + len(sig))
    dst[i:j] += gain * sig[: j - i]


def env(n, a, r, sustain=True):
    """Enveloppe attaque/relâchement (en secondes) sur n échantillons."""
    e = np.ones(n)
    na, nr = int(a * SR), int(r * SR)
    if na:
        e[:na] = np.linspace(0, 1, na)
    if nr:
        e[-nr:] *= np.linspace(1, 0, nr) ** 2
    return e


def saw(f, n, bright):
    """Dent de scie à bande limitée ; bright règle la richesse en harmoniques."""
    t = np.arange(n) / SR
    out = np.zeros(n)
    k = 1
    while k * f < min(9000, SR / 2) and k < 40:
        out += np.sin(2 * np.pi * k * f * t + rng.uniform(0, 6.28)) / k * np.exp(-k / bright)
        k += 1
    return out


def pad_note(f, dur, bright):
    n = int(dur * SR)
    s = sum(saw(f * d, n, bright) for d in (0.996, 1.0, 1.004)) / 3
    return s * env(n, 0.35, 0.6)


def pluck(f, dur=0.32, bright=8):
    n = int(dur * SR)
    t = np.arange(n) / SR
    s = sum(np.sin(2 * np.pi * k * f * t) / k ** 1.6 * np.exp(-k / bright) for k in (1, 2, 3, 4, 5))
    return s * np.exp(-t / 0.11) * env(n, 0.003, 0.02)


def bell(f, dur=2.5):
    n = int(dur * SR)
    t = np.arange(n) / SR
    s = (np.sin(2 * np.pi * f * t) * np.exp(-t / 0.9)
         + 0.45 * np.sin(2 * np.pi * f * 2.76 * t) * np.exp(-t / 0.4)
         + 0.2 * np.sin(2 * np.pi * f * 5.4 * t) * np.exp(-t / 0.18))
    return s * env(n, 0.004, 0.1)


def bass_note(f, dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    s = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * 2 * f * t) + 0.12 * np.sin(2 * np.pi * 3 * f * t)
    return s * env(n, 0.01, min(0.15, dur / 2))


def kick():
    n = int(0.45 * SR)
    t = np.arange(n) / SR
    f = 45 + 110 * np.exp(-t / 0.035)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t / 0.16) + 0.25 * rng.standard_normal(n) * np.exp(-t / 0.004)


def hat():
    n = int(0.08 * SR)
    t = np.arange(n) / SR
    x = np.diff(rng.standard_normal(n + 1))
    x = np.convolve(x, np.ones(3) / 3, 'same')  # aigus adoucis
    return x * np.exp(-t / 0.014) * 0.5


def clap():
    n = int(0.25 * SR)
    t = np.arange(n) / SR
    x = rng.standard_normal(n)
    x = np.convolve(x, np.ones(4) / 4, 'same') - np.convolve(x, np.ones(24) / 24, 'same')  # bande médium
    e = np.exp(-t / 0.07) * (1 + 0.6 * np.sin(2 * np.pi * 90 * t).clip(0))
    return x * e * 0.5


def riser(dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    x = rng.standard_normal(n)
    out = np.zeros(n)
    # bruit de plus en plus brillant (moyenne glissante de moins en moins large)
    for a, b in zip(np.linspace(0, n, 9)[:-1].astype(int), np.linspace(0, n, 9)[1:].astype(int)):
        w = int(np.interp(a, [0, n], [60, 3]))
        out[a:b] = np.convolve(x, np.ones(w) / w, 'same')[a:b]
    sweep = np.sin(2 * np.pi * np.cumsum(200 + 900 * (t / dur) ** 2) / SR) * 0.15
    return (out * 2.2 + sweep) * (t / dur) ** 2.2


def impact():
    n = int(2.0 * SR)
    t = np.arange(n) / SR
    boom = np.sin(2 * np.pi * np.cumsum(38 + 60 * np.exp(-t / 0.08)) / SR) * np.exp(-t / 0.55)
    noise = np.convolve(rng.standard_normal(n), np.ones(30) / 30, 'same') * np.exp(-t / 0.25) * 3
    return boom + noise


def reverb_ir(seconds=2.6, seed=0):
    r = np.random.default_rng(seed)
    n = int(seconds * SR)
    t = np.arange(n) / SR
    ir = r.standard_normal(n) * np.exp(-t / 0.55)
    ir = np.convolve(ir, np.ones(6) / 6, 'same')  # adoucit les aigus
    ir[: int(0.012 * SR)] = 0
    return ir / np.sqrt(np.sum(ir ** 2))


def fft_conv(x, h):
    m = len(x) + len(h) - 1
    size = 1 << (m - 1).bit_length()
    y = np.fft.irfft(np.fft.rfft(x, size) * np.fft.rfft(h, size), size)[: len(x)]
    return y


def section_level(t, points):
    """Interpolation linéaire d'un niveau selon [(temps, valeur), ...]."""
    ts, vs = zip(*points)
    return np.interp(t, ts, vs)


# ── Pistes ──
pad, arp_l, arp_r, bass, drums, fx, bells = (buf() for _ in range(7))

# Nappe : une mesure par accord, de plus en plus brillante
bar_starts = np.arange(0, END, BAR)
for b0 in bar_starts:
    ch = chord_at(b0)
    bright = float(section_level(b0, [(0, 2.5), (14, 4), (21, 5), (42, 6.5), (50, 6.5)]))
    gain = float(section_level(b0, [(0, 0.10), (6, 0.12), (14, 0.11), (42, 0.12)]))
    for m in ch['pad']:
        place(pad, pad_note(hz(m), BAR + 0.6, bright), b0, gain)
# Final : accord de Do majeur tenu
for m in C_MAJ['pad']:
    place(pad, pad_note(hz(m), 9.0, 5.5) * env(int(9.0 * SR), 0.2, 4.0), END, 0.12)

# Cloches : motif d'ouverture et de conclusion
for t0, m in [(0.4, 76), (1.4, 72), (2.4, 69), (3.6, 79), (4.6, 76)]:
    place(bells, bell(hz(m)), t0, 0.16)
for t0, m in [(0.0, 84), (1.0, 79), (2.0, 76), (3.0, 72), (4.5, 79), (5.5, 84)]:
    place(bells, bell(hz(m), 3.0), END + t0, 0.15)

# Basse : croches étouffées pendant le constat, puis noires/blanches
for i in range(int(6 / 0.25), int(14 / 0.25)):
    t0 = i * 0.25
    place(bass, bass_note(hz(chord_at(t0)['bass'] + 12), 0.2), t0, 0.22 if i % 2 == 0 else 0.13)
for i in range(int(14 / BEAT), int(END / BEAT)):
    t0 = i * BEAT
    if 32.5 <= t0 < 33:
        continue
    place(bass, bass_note(hz(chord_at(t0)['bass'] + 12), 0.45), t0, 0.20)
place(bass, bass_note(hz(C_MAJ['bass'] + 12), 5.0) * env(int(5.0 * SR), 0.01, 3.0), END, 0.32)

# Arpège : croches dès la révélation, doubles croches pendant la méthode
t0 = 14.0
while t0 < END - 1e-9:
    step = 0.125 if 33 <= t0 < 42 or 51 <= t0 < END else 0.25
    idx = int(round(t0 / step))
    ch = chord_at(t0)
    m = ch['arp'][idx % 4] + (12 if 42 <= t0 < 51 and idx % 8 >= 4 else 0)
    g = 0.14 if step == 0.25 else 0.10
    place(arp_l if idx % 2 == 0 else arp_r, pluck(hz(m)), t0, g)
    t0 += step

# Batterie
for i in range(int(14 / BEAT), int(END / BEAT)):
    t0 = i * BEAT
    if 32 <= t0 < 33 or END - 1 <= t0 < END:
        continue  # respirations avant les transitions
    beat = i % 4
    if 14 <= t0 < 21:
        if beat in (0, 2):
            place(drums, kick(), t0, 0.42)
    else:
        if beat in (0, 2) or (t0 >= 42 and beat == 3 and i % 8 == 7):
            place(drums, kick(), t0, 0.45)
        if beat in (1, 3):
            place(drums, clap(), t0, 0.16)
        place(drums, hat(), t0 + BEAT / 2, 0.10)
        if t0 >= 33:
            place(drums, hat(), t0, 0.05)

# Transitions : souffle montant + impact
for t_hit, d in [(6, 1.2), (14, 2.0), (21, 1.5), (33, 1.5), (42, 1.5), (51, 1.5), (END, 2.0)]:
    place(fx, riser(d), t_hit - d, 0.06)
for t_hit, g in [(14, 0.45), (END, 0.5), (51, 0.28), (21, 0.22), (33, 0.22), (42, 0.28)]:
    place(fx, impact(), t_hit, g)

# ── Mixage stéréo ──
wet_src = pad * 0.8 + bells + (arp_l + arp_r) * 0.6 + fx * 0.6 + drums * 0.08
L = pad + bells + arp_l * 1.0 + arp_r * 0.45 + bass + drums + fx
R = pad + bells + arp_r * 1.0 + arp_l * 0.45 + bass + drums + fx
L += 0.32 * fft_conv(wet_src, reverb_ir(seed=1))
R += 0.32 * fft_conv(wet_src, reverb_ir(seed=2))

t = np.arange(N) / SR
master = np.clip(np.minimum(t / 0.8, 1.0), 0, 1) * np.clip((DUR - t) / 2.2, 0, 1)  # fondu d'entrée/sortie
L, R = L * master, R * master
peak = max(np.abs(L).max(), np.abs(R).max())
L, R = np.tanh(1.2 * L / peak) / np.tanh(1.2), np.tanh(1.2 * R / peak) / np.tanh(1.2)
stereo = (np.stack([L, R], axis=1) * 0.89 * 32767).astype(np.int16)

out = sys.argv[1] if len(sys.argv) > 1 else 'video/music.wav'
with wave.open(out, 'wb') as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(stereo.tobytes())
print(f'{out} : {DUR:.0f} s, {SR} Hz stéréo')
