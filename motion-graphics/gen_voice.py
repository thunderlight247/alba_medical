import asyncio
import edge_tts

TEXT = (
    "Have you ever had a fever in Ghana and been told you have malaria and typhoid at the exact same time? "
    "Here is the clinical truth: true co-infection is actually rare. "
    "Rapid slide tests often pick up old antibodies from an infection you had years ago, not an active illness today. "
    "Taking heavy antimalarials and antibiotics together unnecessarily strains your liver and builds dangerous drug resistance. "
    "Always ask for blood film microscopy to confirm live parasites before taking medicines. "
    "Test before you treat."
)

VOICE = "en-NG-AbeoNeural"
OUTPUT_AUDIO = "/home/light/Documents/alba-medical-diagnostic-centre/motion-graphics/assets/voiceover.mp3"
OUTPUT_VTT = "/home/light/Documents/alba-medical-diagnostic-centre/motion-graphics/assets/subtitles.vtt"

async def main():
    communicate = edge_tts.Communicate(TEXT, VOICE, rate="+3%")
    submaker = edge_tts.SubMaker()
    with open(OUTPUT_AUDIO, "wb") as file:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                file.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                submaker.feed(chunk)

    with open(OUTPUT_VTT, "w", encoding="utf-8") as file:
        file.write(submaker.get_srt())
    print("Voiceover and timing generated successfully!")

if __name__ == "__main__":
    asyncio.run(main())
