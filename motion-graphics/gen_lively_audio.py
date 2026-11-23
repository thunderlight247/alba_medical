import asyncio
import os
import subprocess
import edge_tts

VOICE = "en-NG-EzinneNeural"  # Lively, warm, friendly African English
ASSETS_DIR = "/home/light/Documents/alba-medical-diagnostic-centre/motion-graphics/assets"

SCENES = [
    {
        "id": "scene1",
        "text": "Have you ever had a fever in Ghana and been told you have malaria and typhoid at the exact same time?",
    },
    {
        "id": "scene2",
        "text": "Here is the clinical truth: true co-infection is actually rare! Rapid slide tests often pick up old antibodies from an infection you had years ago, not an active illness today.",
    },
    {
        "id": "scene3",
        "text": "Taking heavy antimalarials and antibiotics together unnecessarily strains your liver and builds dangerous drug resistance.",
    },
    {
        "id": "scene4",
        "text": "The rule is simple: always ask for blood film microscopy to confirm live parasites before taking medicines. Test before you treat!",
    }
]

async def generate_scene(scene, idx):
    path = os.path.join(ASSETS_DIR, f"v2_{scene['id']}.mp3")
    # Rate +8% for lively, engaging, conversational energy
    comm = edge_tts.Communicate(scene['text'], VOICE, rate="+8%", pitch="+2Hz")
    await comm.save(path)
    
    res = subprocess.run(
        ["ffprobe", "-i", path, "-show_entries", "format=duration", "-v", "quiet", "-of", "csv=p=0"],
        capture_output=True, text=True, check=True
    )
    duration = float(res.stdout.strip())
    return {**scene, "file": path, "duration": duration}

async def main():
    results = []
    for idx, scene in enumerate(SCENES):
        res = await generate_scene(scene, idx)
        results.append(res)
        print(f"Scene {idx+1}: {res['duration']:.2f}s")

    pause = 0.25
    current_time = 0.0
    timeline = []
    
    concat_list = os.path.join(ASSETS_DIR, "concat_v2.txt")
    with open(concat_list, "w") as f:
        for r in results:
            timeline.append({
                "id": r["id"],
                "start": current_time,
                "end": current_time + r["duration"],
                "duration": r["duration"]
            })
            current_time += r["duration"] + pause
            f.write(f"file '{r['file']}'\n")
    
    final_vo = os.path.join(ASSETS_DIR, "v2_voiceover.mp3")
    subprocess.run([
        "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_list,
        "-c", "copy", final_vo
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    # Process voice with EQ (brightness, treble presence, compression & normalization)
    enhanced_vo = os.path.join(ASSETS_DIR, "v2_voiceover_enhanced.wav")
    subprocess.run([
        "ffmpeg", "-y", "-i", final_vo,
        "-af", "highpass=f=85,equalizer=f=3200:t=q:w=1.2:g=4,equalizer=f=250:t=q:w=1:g=-2,acompressor=threshold=-15dB:ratio=3:attack=5:release=50,loudnorm=I=-14:TP=-1.5:LRA=7",
        enhanced_vo
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    res = subprocess.run(
        ["ffprobe", "-i", enhanced_vo, "-show_entries", "format=duration", "-v", "quiet", "-of", "csv=p=0"],
        capture_output=True, text=True, check=True
    )
    total_dur = float(res.stdout.strip())
    print(f"\nTotal Enhanced Voice Duration: {total_dur:.2f}s")
    for t in timeline:
        print(f"  {t['id']}: {t['start']:.2f}s -> {t['end']:.2f}s")

if __name__ == "__main__":
    asyncio.run(main())
