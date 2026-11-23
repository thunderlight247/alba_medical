import asyncio
import os
import subprocess
import edge_tts

VOICE = "en-NG-AbeoNeural"
ASSETS_DIR = "/home/light/Documents/alba-medical-diagnostic-centre/motion-graphics/assets"

SCENES = [
    {
        "id": "scene1",
        "text": "Have you ever had a fever in Ghana and been told you have malaria and typhoid at the exact same time?",
    },
    {
        "id": "scene2",
        "text": "Here is the clinical truth: true co-infection is actually rare. Rapid slide tests often pick up old antibodies from an infection you had years ago, not an active illness today.",
    },
    {
        "id": "scene3",
        "text": "Taking heavy antimalarials and antibiotics together unnecessarily strains your liver and builds dangerous drug-resistant superbugs.",
    },
    {
        "id": "scene4",
        "text": "The rule is simple: always ask for blood film microscopy to confirm live parasites before taking medicines. Test before you treat.",
    }
]

async def generate_scene(scene, idx):
    path = os.path.join(ASSETS_DIR, f"{scene['id']}.mp3")
    comm = edge_tts.Communicate(scene['text'], VOICE, rate="+3%")
    await comm.save(path)
    
    # probe duration
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
        print(f"Scene {idx+1} ({res['id']}): {res['duration']:.2f}s -> {res['text'][:40]}...")

    # Calculate timestamps with 0.3s pause between scenes
    pause = 0.35
    current_time = 0.0
    timeline = []
    
    # Create ffmpeg concat list
    concat_list = os.path.join(ASSETS_DIR, "concat.txt")
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
    
    # Concatenate with ffmpeg
    final_vo = os.path.join(ASSETS_DIR, "voiceover_full.mp3")
    subprocess.run([
        "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_list,
        "-c", "copy", final_vo
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    # probe final duration
    res = subprocess.run(
        ["ffprobe", "-i", final_vo, "-show_entries", "format=duration", "-v", "quiet", "-of", "csv=p=0"],
        capture_output=True, text=True, check=True
    )
    total_dur = float(res.stdout.strip())
    print(f"\nFinal concatenated voiceover: {total_dur:.2f}s")
    print("Scene Timeline (seconds):")
    for t in timeline:
        print(f"  {t['id']}: {t['start']:.2f}s -> {t['end']:.2f}s")

if __name__ == "__main__":
    asyncio.run(main())
