<script setup lang="ts">
import type { NetworkLoadingState } from "~/types/config.js";

import Ghost from "../exhibit/Ghost.vue";
import ImageLoading from "../exhibit/ImageLoading.vue";
import TextFlipLoading from "../exhibit/TextFlipLoading.vue";

const imgRef = ref<HTMLImageElement | null>(null);
const loadingState = ref<NetworkLoadingState>("loading");

onMounted(() => {
	if (imgRef.value) {
		onImageLoading(imgRef.value)
			.then(() => {
				loadingState.value = "success";
			})
			.catch(() => {
				loadingState.value = "error";
			});
	}
});

defineProps<{
	src?: string;
	alt?: string;
	title?: string;
	width?: number;
}>();
</script>

<template>
	<!-- From Uiverse.io by gharsh11032000 -->
	<div class="prose_image" :style="{ width: `${width}px` }">
		<img :src="`/blog-2.0${src}`" :alt="alt" ref="imgRef" v-show="loadingState === 'success'" />
		<div class="loading_container" v-if="loadingState === 'loading'">
			<ImageLoading />
			<TextFlipLoading />
		</div>
		<div class="error_container" v-if="loadingState === 'error'">
			<span class="icon">&#xe7f3;</span>
			加载失败
		</div>
		<div class="img_content">
			<div v-if="alt || title">
				<p class="content_alt" v-if="alt">{{ alt }}</p>
				<p class="content_title" v-if="title">{{ title }}</p>
			</div>
			<Ghost v-else />
		</div>
	</div>
</template>

<style scoped lang="scss">
/* From Uiverse.io by gharsh11032000 */
.prose_image {
	position: relative;
	margin: 0 auto;
	width: calc(100% - 0.4rem);
	background-color: #f2f2f2;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	perspective: 1000px;
	box-shadow: 0 0 0 5px #ffffff80;
	border-width: 0.2rem;
	border-style: solid;
	border-color: #ffffff;
	transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);

	&:hover {
		transform: scale(1.05);
		box-shadow: 0 8px 16px rgba(255, 255, 255, 0.2);

		.img_content {
			transform: rotateX(0deg);
		}
	}

	img {
		width: 100%;
	}

	.loading_container {
		padding-top: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		font-size: 1rem;
	}

	.error_container {
		padding: 2px 0 5px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		color: #ff0000;

		.icon {
			font-size: 3rem;
		}
	}

	.img_content {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		padding: 20px;
		box-sizing: border-box;
		background-color: #f2f2f2;
		transform: rotateX(-90deg);
		transform-origin: bottom;
		transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);

		.content_alt {
			margin: 0;
			font-size: 1rem;
			text-align: center;
			color: #333;
			font-weight: 700;
		}

		.content_title {
			margin: 10px 0 0;
			font-size: 0.9rem;
			text-align: center;
			color: #777;
			line-height: 1.4;
		}
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.5;

	.prose_image {
		margin: 0 15px * $base-size;
		width: calc(100% - 30px * $base-size - 0.4rem * $base-size);
		border-radius: 10px * $base-size;
		box-shadow: 0 0 0 5px * $base-size #ffffff80;
		border-width: 0.2rem * $base-size;

		&:hover {
			box-shadow: 0 8px * $base-size 16px * $base-size rgba(255, 255, 255, 0.2);
		}

		.loading_container {
			padding-top: 10px * $base-size;
			font-size: 1rem * $base-size;
		}

		.error_container {
			padding: 2px * $base-size 0 5px * $base-size;

			.icon {
				font-size: 3rem * $base-size;
			}
		}

		.img_content {
			padding: 20px * $base-size;

			.content_alt {
				font-size: 1rem * $base-size;
			}

			.content_title {
				margin: 10px * $base-size 0 0;
				font-size: 0.9rem * $base-size;
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.75;

	.prose_image {
		margin: 0 15px * $base-size;
		width: calc(100% - 30px * $base-size - 0.4rem * $base-size);
		border-radius: 10px * $base-size;
		box-shadow: 0 0 0 5px * $base-size #ffffff80;
		border-width: 0.2rem * $base-size;

		&:hover {
			box-shadow: 0 8px * $base-size 16px * $base-size rgba(255, 255, 255, 0.2);
		}

		.loading_container {
			padding-top: 10px * $base-size;
			font-size: 1rem * $base-size;
		}

		.error_container {
			padding: 2px * $base-size 0 5px * $base-size;

			.icon {
				font-size: 3rem * $base-size;
			}
		}

		.img_content {
			padding: 20px * $base-size;

			.content_alt {
				font-size: 1rem * $base-size;
			}

			.content_title {
				margin: 10px * $base-size 0 0;
				font-size: 0.9rem * $base-size;
			}
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.9;

	.prose_image {
		margin: 0 15px * $base-size;
		width: calc(100% - 30px * $base-size - 0.4rem * $base-size);
		border-radius: 10px * $base-size;
		box-shadow: 0 0 0 5px * $base-size #ffffff80;
		border-width: 0.2rem * $base-size;

		&:hover {
			box-shadow: 0 8px * $base-size 16px * $base-size rgba(255, 255, 255, 0.2);
		}

		.loading_container {
			padding-top: 10px * $base-size;
			font-size: 1rem * $base-size;
		}
		.error_container {
			padding: 2px * $base-size 0 5px * $base-size;

			.icon {
				font-size: 3rem * $base-size;
			}
		}

		.img_content {
			padding: 20px * $base-size;

			.content_alt {
				font-size: 1rem * $base-size;
			}

			.content_title {
				margin: 10px * $base-size 0 0;
				font-size: 0.9rem * $base-size;
			}
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 1;

	.prose_image {
		margin: 0 15px * $base-size;
		width: calc(100% - 30px * $base-size - 0.4rem * $base-size);
		border-radius: 10px * $base-size;
		box-shadow: 0 0 0 5px * $base-size #ffffff80;
		border-width: 0.2rem * $base-size;

		&:hover {
			box-shadow: 0 8px * $base-size 16px * $base-size rgba(255, 255, 255, 0.2);
		}

		.loading_container {
			padding-top: 10px * $base-size;
			font-size: 1rem * $base-size;
		}

		.error_container {
			padding: 2px * $base-size 0 5px * $base-size;

			.icon {
				font-size: 3rem * $base-size;
			}
		}

		.img_content {
			padding: 20px * $base-size;

			.content_alt {
				font-size: 1rem * $base-size;
			}

			.content_title {
				margin: 10px * $base-size 0 0;
				font-size: 0.9rem * $base-size;
			}
		}
	}
}
</style>
