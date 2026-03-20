<script setup lang="ts">

const { musicCurrentRef,
  musicListCurrentRef, isPlaying, play, toggle, previous, next } = useSoundMusic();

</script>

<template>
  <div class="music_controller">
    <!-- 当前播放信息 -->
    <div class="music_info">
      <div class="music_name">
        {{ musicCurrentRef?.name || "未选择音乐" }}
      </div>
    </div>

    <!-- 播放控制 -->
    <div class="music_controls">
      <button class="control_btn" @click="previous" title="上一首">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
        </svg>
      </button>

      <button class="play_btn" @click="toggle" :title="isPlaying ? '暂停' : '播放'">
        <svg v-if="!isPlaying" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
        <svg v-else width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
      </button>

      <button class="control_btn" @click="next" title="下一首">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
        </svg>
      </button>
    </div>

    <!-- 音乐列表 -->
    <div class="music_list">
      <div v-for="music in musicListCurrentRef" :key="music.path" class="music_item"
        :class="{ active: music === musicCurrentRef }" @click="play(music)">
        <span class="music_item_name">{{ music.name }}</span>
        <span v-if="music === musicCurrentRef && isPlaying" class="playing_indicator">
          ♪
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.music_controller {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.music_info {
  text-align: center;
  padding: 0.5rem;

  .music_name {
    font-size: 1.1rem;
    font-weight: bold;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.music_controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 0.5rem;

  .control_btn,
  .play_btn {
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;

    &:hover {
      border-color: rgba(255, 255, 255, 0.6);
      background: rgba(255, 255, 255, 0.1);
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  .control_btn {
    width: 40px;
    height: 40px;
  }

  .play_btn {
    width: 60px;
    height: 60px;
    border-width: 3px;
  }
}

.music_list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
  }

  .music_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.7);

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      color: #fff;
    }

    &.active {
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
      border-left: 3px solid #ff6b6b;
    }

    .music_item_name {
      flex: 1;
      font-size: 0.95rem;
    }

    .playing_indicator {
      color: #ff6b6b;
      font-size: 1.2rem;
      animation: pulse 1s ease-in-out infinite;
    }
  }
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}
</style>
