<script setup lang="ts">
import MusicBackground from "~/components/ui/musicUI/MusicBackground.vue";
import MusicController from "~/components/ui/musicUI/MusicController.vue";
import MusicList from "~/components/ui/musicUI/MusicList.vue";
import Button from "~/components/ui/Button.vue";
</script>

<template>
	<div class="musics">
		<MusicBackground />
		<MusicList />
		<MusicController />
		<Button
			:text="'back'"
			:icon="'&#xeb06;'"
			:size="'small'"
			@click="navigateTo('/')"
			:style="{ position: 'fixed', left: '20px', top: '20px' }"
		></Button>
	</div>
</template>

<style scoped lang="scss"></style>
