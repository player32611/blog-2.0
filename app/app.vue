<template>
	<Loading ref="loadingRef" />
	<MusicCard v-if="soundStore.musicCardVisible" />
	<NuxtPage :page-key="$route.fullPath" />
	<NuxtRouteAnnouncer />
</template>

<script setup lang="ts">
import type { LoadingInstance } from "./types/components";

import MusicCard from "./components/ui/rootUI/MusicCard.vue";
import Loading from "./components/ui/rootUI/Loading.vue";

const loadingStore = useLoadingStore();
const loadingRef = ref<LoadingInstance | null>(null);
const soundStore = useSoundStore();
const router = useRouter();

onMounted(() => {
	if (!loadingRef.value) return;
	loadingStore.initLoadingRef(loadingRef.value);
	router.beforeEach((to, from, next) => {
		loadingStore.loadingIn(next);
	});
});
</script>

<style lang="scss">
@font-face {
	font-family: "iconfont";
	src:
		url("./assets/icons/iconfont.woff2?t=1772024036100") format("woff2"),
		url("./assets/icons/iconfont.woff?t=1772024036100") format("woff"),
		url("./assets/icons/iconfont.ttf?t=1772024036100") format("truetype");
	font-display: swap;
}

.icon {
	font-family: "iconfont" !important;
	font-size: 1em;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

html,
body {
	position: relative;
	margin: 0;
	padding: 0;
	height: 100dvh;
	width: 100%;
	overscroll-behavior: none;

	pre.shiki code .sgsFI,
	code.shiki .sgsFI {
		--shiki-default: #ffffff !important; /* 改为纯黑色 */
	}

	&::-webkit-scrollbar {
		display: none;
	}
}
</style>
