<script setup lang="ts">
import MusicBackground from "~/components/ui/musicUI/MusicBackground.vue";
import MusicController from "~/components/ui/musicUI/MusicController.vue";
import MusicList from "~/components/ui/musicUI/MusicList.vue";
import MusicRecord from "~/components/ui/musicUI/MusicRecord.vue";
import Button from "~/components/ui/Button.vue";

usePageReady();
</script>

<template>
	<div class="musics">
		<div class="musics_background_container"><MusicBackground /></div>
		<div class="musics_list_container"><MusicList /></div>
		<div class="musics_controller_container"><MusicController /></div>
		<div class="musics_record_container"><MusicRecord /></div>
		<Button
			:text="'back'"
			:icon="'&#xeb06;'"
			:size="'small'"
			@click="navigateTo('/')"
			:style="{ position: 'fixed', left: '20px', top: '20px' }"
		></Button>
	</div>
</template>

<style scoped lang="scss">
.musics {
	display: grid;
	grid-template-columns: 1fr 5fr;
	grid-template-rows: 6fr 1fr;
	height: 100dvh;
	width: 100%;
	overflow: hidden;

	.musics_background_container {
		grid-area: 1 / 1 / 3 / 3;
	}

	.musics_list_container {
		grid-area: 1 / 1 / 3 / 2;
	}

	.musics_controller_container {
		grid-area: 2 / 2 / 3 / 3;
	}

	.musics_record_container {
		grid-area: 1 / 2 / 2 / 3;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	.musics {
		grid-template-columns: auto;
		grid-template-rows: 250px 6fr 1fr;

		.musics_background_container {
			grid-area: 1 / 1 / 4 / 2;
		}

		.musics_list_container {
			grid-area: 1 / 1 / 2 / 2;
		}

		.musics_controller_container {
			grid-area: 3 / 1 / 4 / 2;
		}

		.musics_record_container {
			grid-area: 2 / 1 / 3 / 2;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	.musics {
		grid-template-columns: auto;
		grid-template-rows: 250px 6fr 1fr;

		.musics_background_container {
			grid-area: 1 / 1 / 4 / 2;
		}

		.musics_list_container {
			grid-area: 1 / 1 / 2 / 2;
		}

		.musics_controller_container {
			grid-area: 3 / 1 / 4 / 2;
		}

		.musics_record_container {
			grid-area: 2 / 1 / 3 / 2;
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	.musics {
		grid-template-columns: 2.5fr 5fr;
		grid-template-rows: 6fr 1fr;

		.musics_background_container {
			grid-area: 1 / 1 / 3 / 3;
		}

		.musics_list_container {
			grid-area: 1 / 1 / 3 / 2;
		}

		.musics_controller_container {
			grid-area: 2 / 2 / 3 / 3;
		}

		.musics_record_container {
			grid-area: 1 / 2 / 2 / 3;
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	.musics {
		grid-template-columns: 2fr 5fr;
		grid-template-rows: 5fr 1fr;

		.musics_background_container {
			grid-area: 1 / 1 / 3 / 3;
		}

		.musics_list_container {
			grid-area: 1 / 1 / 3 / 2;
		}

		.musics_controller_container {
			grid-area: 2 / 2 / 3 / 3;
		}

		.musics_record_container {
			grid-area: 1 / 2 / 2 / 3;
		}
	}
}
</style>
