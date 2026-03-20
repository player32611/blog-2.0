<script setup lang='ts'>
const linesTotal = ref<number>(200);
const linesRef = ref<HTMLDivElement[]>([]);
const wavesData = ref<number[][]>([])
const timer = ref<number | null>(null);
const currentWaveIndex = ref<number>(0);
const frame = ref<number>(0.5);

const setLinesRef = (el: Element | ComponentPublicInstance | null) => {
  if (el && el instanceof HTMLDivElement) linesRef.value.push(el);
}

const getWavesData = async (length: number, points: number) => {
  const response = await fetch("/sounds/musics/03.ogg");
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await new AudioContext().decodeAudioData(arrayBuffer);
  const rate = audioBuffer.sampleRate;
  const duration = audioBuffer.duration;
  const channelData = audioBuffer.getChannelData(0);
  const result = [];
  const segments = Math.ceil(duration / length);
  for (let seg = 0; seg < segments; seg++) {
    const startTime = seg * length;
    const endTime = Math.min(startTime + length, duration);
    if (startTime >= duration) break;
    const startSample = Math.floor(startTime * rate);
    const endSample = Math.floor(endTime * rate);
    const pointSamples = Math.floor((endSample - startSample) / points);
    const pointsData = [];
    for (let i = 0; i < points; i++) {
      const startSeg = startSample + pointSamples * i;
      const endSeg = startSeg + pointSamples;
      let sum = 0;
      for (let j = startSeg; j < endSeg; j++)sum += Math.abs(channelData[j] || 0);
      pointsData.push(sum / pointSamples);
    }
    result.push(pointsData);
  }
  return result;
}

const run = () => {
  timer.value = setInterval(() => {
    currentWaveIndex.value = (currentWaveIndex.value + 1) % (wavesData.value.length - 1);
    linesRef.value.forEach((line, i) => {
      const waveValue = wavesData.value[currentWaveIndex.value]?.[i] ?? 0;
      line.style.setProperty("--s", waveValue.toString());
    })
  }, 300)
}

onMounted(async () => {
  wavesData.value = await getWavesData(frame.value, linesTotal.value);
  run();
})

</script>

<template>
  <div class="music_wave">
    <div v-for="i in linesTotal" class="wave_line" :key="i"
      :style="`transform: rotate(${360 / linesTotal * i}deg); --s: 0;`" :ref="(el) => setLinesRef(el)">
    </div>
  </div>
</template>

<style scoped lang='scss'>
.music_wave {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100dvh;

  .wave_line {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: start;
    font-size: 1px;
    width: 50rem;
    height: 50rem;

    &::after {
      content: "";
      position: relative;
      width: 0.2rem;
      height: 8rem;
      background-color: blue;
      transform: scale(var(--s));
      transition: transform 0.5s ease;
    }
  }
}
</style>