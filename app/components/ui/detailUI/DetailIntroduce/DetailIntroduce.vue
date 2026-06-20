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
	height: 100vh;
	width: 100%;
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	.detail_introduce {
		height: 150vh;
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	.detail_introduce {
		height: 150vh;
	}
}
</style>
