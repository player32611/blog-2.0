<script setup lang='ts'>
import { useThemeStore } from "@/stores/themeStore";

import Button from "@/components/ui/Button.vue";

const { theme } = useThemeStore();
const hp = ref(92);
</script>

<template>
  <div :class="`uibox ${theme}`">
    <div class="userState">
      <div>
        <div class="userName">
          FRISK
          <div>LV</div>
          <div>19</div>
        </div>
      </div>
      <div>
        <div class="userHp">
          <div>HP</div>
          <div>
            <!-- <UProgress v-model="hp" :max="hp" color="neutral" size="2xl" /> -->
            <!-- <Progress className="userHpProgress" percent={50} railColor="#C00000" showInfo={false} size={{ height: 21 *
              2, width: 92 * 1.25 * 2 }} strokeColor="#FFFF00" strokeLinecap="butt" style={{ display: "flex" ,
              alignItems: "center" , justifyContent: "center" , }}></Progress> -->
          </div>
          <div>KR 92/92</div>
        </div>
      </div>
      <div>
        <div class="userName">
          13:00
        </div>
      </div>
    </div>
    <div class="buttons">
      <Button :text="'blog'" :size="'large'" :icon="'&#xe99c;'" @click="navigateTo('/blogs')"></Button>
      <Button :text="'music'" :size="'large'" :icon="'&#xe99a;'" @click="navigateTo('/musics')"></Button>
      <Button :text="'image'" :size="'large'" :icon="'&#xe997;'" @click="navigateTo('/images')"></Button>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.uibox {
  position: fixed;
  bottom: 0;
  padding: 5px 10%;
  display: flex;
  flex-direction: column;
  width: 80%;
  font-size: 1em;
  text-align: center;

  &.undertale {
    color: #ff7f27;
  }

  .userState {
    margin: 5px;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    justify-items: center;
    align-items: center;
    font-size: 3em;
    font-family: "Mars Needs Cunnilingus";

    .userName {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .userHp {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.7em;
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>