<script setup lang="ts">
import DetailIntroduceInfo from "./DetailIntroduceInfo.vue";
import DetailIntroduceRole from "./DetailIntroduceRole.vue";
</script>

<template>
	<div class="introduce_part1">
		<DetailIntroduceInfo />
		<DetailIntroduceRole />
	</div>
</template>

<style scoped lang="scss">
.introduce_part1 {
	display: flex;
	justify-content: space-evenly;
	height: 50%;
	align-items: end;
	width: 100%;
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	.introduce_part1 {
		display: flex;
		flex-direction: column-reverse;
		justify-content: space-evenly;
		align-items: center;
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	.introduce_part1 {
		display: flex;
		flex-direction: column-reverse;
		justify-content: space-evenly;
		align-items: center;
	}
}
</style>
