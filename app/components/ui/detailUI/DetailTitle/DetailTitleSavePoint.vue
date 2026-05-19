<script setup lang="ts"></script>

<template>
	<div class="title_save_point"></div>
</template>

<style scoped lang="scss">
.title_save_point {
	height: 200px;
	width: 100%;
	background-color: yellow;
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	.title_save_point {
		height: 200px;
		width: 100%;
		background-color: yellow;
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	.title_save_point {
		height: 200px;
		width: 100%;
		background-color: yellow;
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	.title_save_point {
		height: 200px;
		width: 100%;
		background-color: yellow;
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	.title_save_point {
		height: 200px;
		width: 100%;
		background-color: yellow;
	}
}
</style>
