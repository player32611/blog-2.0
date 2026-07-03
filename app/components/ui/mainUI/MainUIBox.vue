<script setup lang="ts">
import Button from "~/components/ui/common/Button.vue";
import FaultText from "../common/FaultText.vue";
import type { DayTime } from "~/types/common";

const { loadingNavigate } = useLoadingStore();
const currentTime = ref<DayTime>(formatDateTime(Date.now()));
const timeInterval = ref<number>(1000);

onMounted(() => {
	timeInterval.value = setInterval(() => {
		currentTime.value = formatDateTime(Date.now());
	}, 1000);
});

onUnmounted(() => {
	clearInterval(timeInterval.value);
});
</script>

<template>
	<div class="main_ui_box">
		<div class="ui_state">
			<div class="ui_name">
				<div @click="loadingNavigate('/details')">
					<FaultText text="FRISK" style="color: #ff7f27; cursor: pointer" />
				</div>
				<div>LV 19</div>
			</div>
			<div class="ui_hp">
				<div>HP</div>
				<div class="hp_progress"></div>
				<div>KR 92/92</div>
			</div>
			<div class="ui_time">
				{{ currentTime.hour + ":" + currentTime.minute + ":" + currentTime.second }}
			</div>
		</div>
		<div class="buttons">
			<Button
				:text="'blog'"
				:size="'large'"
				:icon="'&#xe99c;'"
				@click="loadingNavigate('/blogs/html')"
			></Button>
			<Button
				:text="'music'"
				:size="'large'"
				:icon="'&#xe99a;'"
				@click="loadingNavigate('/musics')"
			></Button>
			<Button
				:text="'items'"
				:size="'large'"
				:icon="'&#xe994;'"
				@click="loadingNavigate('/items')"
			></Button>
			<Button
				:text="'image'"
				:size="'large'"
				:icon="'&#xe997;'"
				@click="loadingNavigate('/images')"
			></Button>
		</div>
	</div>
</template>

<style scoped lang="scss">
$base-size: 1;

.main_ui_box {
	position: fixed;
	left: 0;
	bottom: 0;
	padding: 5px 5%;
	display: flex;
	flex-direction: column;
	width: 90%;
	color: #ff7f27;
	font-size: 1em * $base-size;
	text-align: center;

	.ui_state {
		margin: 0.3rem * $base-size;
		display: grid;
		grid-template-columns: 1.5fr 3fr 1fr;
		justify-items: center;
		align-items: center;
		font-size: 3rem * $base-size;
		font-family: "Mars Needs Cunnilingus";

		.ui_name,
		.ui_time {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
		}

		.ui_name {
			justify-self: start;

			:first-child {
				font-size: 1em * $base-size;
			}
		}

		.ui_hp {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 2.5rem * $base-size;

			.hp_progress {
				margin: 0 0.5rem * $base-size;
				height: 2rem * $base-size;
				width: 15rem * $base-size;
				background-color: #ffff00;
			}
		}
	}

	.buttons {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.3;

	.main_ui_box {
		font-size: 1rem * $base-size;

		.ui_state {
			font-size: 2.7rem * $base-size;

			.ui_hp {
				font-size: 2rem * $base-size;

				.hp_progress {
					margin: 0 0.5rem;
					height: 1rem;
					width: 5rem;
					background-color: #ffff00;
				}
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.6;

	.main_ui_box {
		font-size: 1rem * $base-size;

		.ui_state {
			font-size: 2.3rem * $base-size;

			.ui_hp {
				font-size: 2rem * $base-size;

				.hp_progress {
					margin: 0 0.5rem * $base-size;
					height: 2rem * $base-size;
					width: 9rem * $base-size;
					background-color: #ffff00;
				}
			}
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.8;

	.main_ui_box {
		font-size: 1rem * $base-size;

		.ui_state {
			font-size: 2.3rem * $base-size;

			.ui_hp {
				font-size: 2rem * $base-size;

				.hp_progress {
					margin: 0 0.5rem * $base-size;
					height: 2rem * $base-size;
					width: 9rem * $base-size;
					background-color: #ffff00;
				}
			}
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 1;

	.main_ui_box {
		font-size: 1rem * $base-size;

		.ui_state {
			font-size: 2.4rem * $base-size;

			.ui_hp {
				font-size: 2rem * $base-size;

				.hp_progress {
					margin: 0 0.5rem * $base-size;
					height: 2rem * $base-size;
					width: 9rem * $base-size;
					background-color: #ffff00;
				}
			}
		}
	}
}
</style>
