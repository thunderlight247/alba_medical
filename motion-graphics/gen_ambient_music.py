import math
import struct
import wave

# Audio parameters
SAMPLE_RATE = 44100
DURATION = 35.0  # seconds

# Warm, calm, modern medical ambient chords:
# Key: D major / B minor ambient pads (D - F# - A, G - B - D, A - C# - E, B - D - F#)
# Frequencies in Hz:
# D3=146.83, F#3=185.0, A3=220.0, D4=293.66, E4=329.63, F#4=369.99, G3=196.0, B3=246.94
CHORD_PROGRESSION = [
    [146.83, 220.00, 293.66, 369.99],  # Dmaj9 pad (8s)
    [196.00, 246.94, 293.66, 369.99],  # Gmaj7 pad (8s)
    [110.00, 220.00, 277.18, 329.63],  # Aadd9 pad (8s)
    [123.47, 185.00, 246.94, 293.66],  # Bm7 pad (11s)
]

num_samples = int(SAMPLE_RATE * DURATION)
audio_samples = [0.0] * num_samples

chord_duration = DURATION / len(CHORD_PROGRESSION)

for i, chord in enumerate(CHORD_PROGRESSION):
    t_start = i * chord_duration
    t_end = min((i + 1) * chord_duration, DURATION)
    
    start_idx = int(t_start * SAMPLE_RATE)
    end_idx = int(t_end * SAMPLE_RATE)
    
    # Overlap fade for lush ambient continuity
    fade_len = int(1.5 * SAMPLE_RATE)
    
    for idx in range(start_idx, end_idx):
        t = (idx - start_idx) / SAMPLE_RATE
        cur_t = idx / SAMPLE_RATE
        
        # Envelope: soft attack and gentle release
        seg_dur = t_end - t_start
        env = 1.0
        if t < 1.0:
            env = t  # attack
        elif (seg_dur - t) < 1.5:
            env = max(0.0, (seg_dur - t) / 1.5)
            
        sample_val = 0.0
        for freq in chord:
            # Fundamental sine + soft overtone for warm Rhodes/pad warmth
            s = math.sin(2 * math.pi * freq * cur_t) * 0.6
            s += math.sin(2 * math.pi * (freq * 2) * cur_t) * 0.15
            s += math.sin(2 * math.pi * (freq * 0.5) * cur_t) * 0.25  # sub-bass warmth
            sample_val += s
            
        # Subtle slow stereo-like shimmer / LFO
        lfo = 0.85 + 0.15 * math.sin(2 * math.pi * 0.3 * cur_t)
        audio_samples[idx] += sample_val * env * lfo * 0.18

# Master fade out at the end
fade_out_start = int((DURATION - 2.5) * SAMPLE_RATE)
for idx in range(fade_out_start, num_samples):
    factor = (num_samples - idx) / (num_samples - fade_out_start)
    audio_samples[idx] *= factor

# Write to 16-bit WAV
wav_path = "/home/light/Documents/alba-medical-diagnostic-centre/motion-graphics/assets/ambient_bg.wav"
with wave.open(wav_path, "w") as wav_file:
    wav_file.setnchannels(1)
    wav_file.setsampwidth(2)
    wav_file.setframerate(SAMPLE_RATE)
    
    raw_data = bytearray()
    for s in audio_samples:
        clamped = max(-1.0, min(1.0, s))
        int_val = int(clamped * 32767)
        raw_data.extend(struct.pack("<h", int_val))
    wav_file.writeframes(raw_data)

print(f"Generated warm ambient soundtrack: {wav_path}")
