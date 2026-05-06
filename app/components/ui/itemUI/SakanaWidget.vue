<script setup lang="ts">
import SakanaWidget from "sakana-widget";

onMounted(() => {
	new SakanaWidget().mount("#sakana-widget");
	SakanaWidget;
});
</script>

<template>
	<div id="sakana-widget"></div>
</template>

<style scoped lang="scss">
#sakana-widget {
	position: fixed;
	right: 20px;
	bottom: 20px;
}
</style>
