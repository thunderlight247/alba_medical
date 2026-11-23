import math
import struct
import wave

SAMPLE_RATE = 44100
DURATION = 35.0  # seconds
BPM = 112
BEAT_DUR = 60.0 / BPM  # ~0.535s

num_samples = int(SAMPLE_RATE * DURATION)
audio_samples = [0.0] * num_samples

# Uplifting, warm chord progression: Gmaj7 -> Cmaj7 -> Dadd9 -> Em9
# Bright, pleasant frequencies (Hz)
NOTES = {
    "G2": 98.0, "D3": 146.83, "G3": 196.0, "B3": 246.94, "D4": 293.66, "F#4": 369.99, "G4": 392.00,
    "C3": 130.81, "E3": 164.81, "G3": 196.0, "C4": 261.63, "E4": 329.63, "B4": 493.88,
    "D3": 146.83, "A3": 220.00, "F#3": 185.0, "A4": 440.00, "E4": 329.63,
    "E2": 82.41, "E3": 164.81, "B3": 246.94, "G4": 392.00, "D5": 587.33
}

BARS = [
    {"bass": 98.0, "arps": [196.0, 246.94, 293.66, 369.99, 392.0, 293.66, 246.94, 196.0]},    # G
    {"bass": 130.81, "arps": [196.0, 261.63, 329.63, 392.0, 493.88, 392.0, 329.63, 261.63]},  # C
    {"bass": 146.83, "arps": [220.0, 293.66, 369.99, 440.0, 369.99, 293.66, 220.0, 293.66]},  # D
    {"bass": 82.41, "arps": [164.81, 196.0, 246.94, 329.63, 392.0, 329.63, 246.94, 196.0]},   # Em
]

total_bars = int(DURATION / (4 * BEAT_DUR)) + 1

for b in range(total_bars):
    bar_info = BARS[b % len(BARS)]
    bar_start_t = b * 4 * BEAT_DUR
    
    # 1. Warm pluck bass on beat 1 and beat 3
    for beat_offset in [0.0, 2.0]:
        t_bass = bar_start_t + beat_offset * BEAT_DUR
        idx_bass = int(t_bass * SAMPLE_RATE)
        bass_freq = bar_info["bass"]
        
        for k in range(int(1.2 * SAMPLE_RATE)):
            sample_idx = idx_bass + k
            if sample_idx >= num_samples: break
            t_rel = k / SAMPLE_RATE
            env = math.exp(-t_rel * 4.0)
            val = math.sin(2 * math.pi * bass_freq * t_rel) * env * 0.28
            audio_samples[sample_idx] += val

    # 2. Sparkling Marimba / Acoustic Kalimba 8th-note pattern
    step_dur = BEAT_DUR / 2.0
    for s_idx, note_freq in enumerate(bar_info["arps"]):
        t_step = bar_start_t + s_idx * step_dur
        idx_step = int(t_step * SAMPLE_RATE)
        
        for k in range(int(0.6 * SAMPLE_RATE)):
            sample_idx = idx_step + k
            if sample_idx >= num_samples: break
            t_rel = k / SAMPLE_RATE
            env = math.exp(-t_rel * 7.0)  # crisp marimba pluck
            val = (math.sin(2 * math.pi * note_freq * t_rel) + 
                   0.25 * math.sin(2 * math.pi * (note_freq * 2) * t_rel) +
                   0.1 * math.sin(2 * math.pi * (note_freq * 3) * t_rel)) * env * 0.12
            audio_samples[sample_idx] += val

    # 3. Soft organic click / snap on beats 2 and 4
    for beat_offset in [1.0, 3.0]:
        t_snap = bar_start_t + beat_offset * BEAT_DUR
        idx_snap = int(t_snap * SAMPLE_RATE)
        for k in range(int(0.08 * SAMPLE_RATE)):
            sample_idx = idx_snap + k
            if sample_idx >= num_samples: break
            t_rel = k / SAMPLE_RATE
            # Noise burst
            noise = ((k * 1103515245 + 12345) % 65536) / 32768.0 - 1.0
            env = math.exp(-t_rel * 60.0)
            audio_samples[sample_idx] += noise * env * 0.04

# Smooth master fade out
fade_start = int((DURATION - 2.5) * SAMPLE_RATE)
for idx in range(fade_start, num_samples):
    factor = (num_samples - idx) / (num_samples - fade_start)
    audio_samples[idx] *= factor

wav_path = "/home/light/Documents/alba-medical-diagnostic-centre/motion-graphics/assets/uplifting_bg.wav"
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

print(f"Generated encouraging acoustic music: {wav_path}")
