<script setup lang="ts">
import DetailIntroduceCircle from "./DetailIntroduceCircle.vue";
import DetailIntroduceInfo from "./DetailIntroduceInfo.vue";
import DetailIntroduceRole from "./DetailIntroduceRole.vue";
import DetailIntroduceSkill from "./DetailIntroduceSkill.vue";
</script>

<template>
	<div class="detail_introduce">
		<DetailIntroduceInfo />
		<DetailIntroduceRole />
		<DetailIntroduceSkill />
		<DetailIntroduceCircle />
	</div>
</template>

<style scoped lang="scss">
.detail_introduce {
	position: relative;
	height: 200vh;
	width: 100%;
}
</style>
