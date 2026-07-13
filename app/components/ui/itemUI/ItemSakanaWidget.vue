<script setup lang="ts">
import SakanaWidget from "sakana-widget";

onMounted(() => {
	new SakanaWidget().mount("#sakana-widget");
	SakanaWidget;
});
</script>

<template>
	<div id="sakana-widget" class="item_sakana_widget"></div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

#sakana-widget {
	position: fixed;
	right: 0px;
	bottom: -25px;
	z-index: variables.$float_zIndex;
	filter: drop-shadow(10px 10px 5px rgba(0, 0, 0, 0.337));
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	#sakana-widget {
		right: -50px;
		bottom: -50px;
		scale: 70%;
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	#sakana-widget {
		right: -50px;
		bottom: -40px;
		scale: 80%;
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	#sakana-widget {
		right: -40px;
		bottom: -35px;
		scale: 90%;
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	#sakana-widget {
		right: -40px;
		bottom: -35px;
		scale: 90%;
	}
}
</style>
