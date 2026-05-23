<script setup lang="ts">
import DetailIntroduceInfo from "./DetailIntroduceInfo.vue";
import DetailIntroduceSkill from "./DetailIntroduceSkill.vue";
</script>

<template>
	<div class="detail_introduce">
		<DetailIntroduceInfo />
		<DetailIntroduceSkill />
	</div>
</template>

<style scoped lang="scss">
.detail_introduce {
	position: relative;
	height: 200vh;
	width: 100%;
	// background-color: #000000;
	// background-color: rgba($color: #ffffff, $alpha: 0.5);
}
</style>
