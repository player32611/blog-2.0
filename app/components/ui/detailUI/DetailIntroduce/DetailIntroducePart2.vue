<script setup lang="ts">
import DetailIntroduceCircle from "./DetailIntroduceCircle.vue";
import DetailIntroduceSkill from "./DetailIntroduceSkill.vue";
</script>

<template>
	<div class="introduce_part2">
		<DetailIntroduceCircle />
		<DetailIntroduceSkill />
	</div>
</template>

<style scoped lang="scss">
.introduce_part2 {
	display: flex;
	justify-content: space-evenly;
	height: 50%;
	align-items: end;
	width: 100%;
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	.introduce_part2 {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	.introduce_part2 {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
	}
}
</style>
