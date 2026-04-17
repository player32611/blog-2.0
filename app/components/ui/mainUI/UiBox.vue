<script setup lang="ts">
import Button from "@/components/ui/Button.vue";

const hp = ref(92);

const { loadingNavigate } = useLoadingStore();
</script>

<template>
	<div class="uibox">
		<div class="userState">
			<div>
				<div class="userName">
					FRISK
					<div>LV</div>
					<div>19</div>
				</div>
			</div>
			<div>
				<div class="userHp">
					<div>HP</div>
					<div class="hp_progress"></div>
					<div>KR 92/92</div>
				</div>
			</div>
			<div>
				<div class="userName">13:00</div>
			</div>
		</div>
		<div class="buttons">
			<Button
				:text="'blog'"
				:size="'large'"
				:icon="'&#xe99c;'"
				@click="loadingNavigate('/blogs')"
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

.uibox {
	position: fixed;
	bottom: 0;
	padding: 5px 5%;
	display: flex;
	flex-direction: column;
	width: 90%;
	color: #ff7f27;
	font-size: 1rem * $base-size;
	text-align: center;

	.userState {
		margin: 0.3rem * $base-size;
		display: grid;
		grid-template-columns: 1fr 3fr 1fr;
		justify-items: center;
		align-items: center;
		font-size: 3rem * $base-size;
		font-family: "Mars Needs Cunnilingus";

		.userName {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.userHp {
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

	.uibox {
		font-size: 1rem * $base-size;

		.userState {
			font-size: 2.7rem * $base-size;

			.userHp {
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

	.uibox {
		font-size: 1rem * $base-size;

		.userState {
			font-size: 2.4rem * $base-size;

			.userHp {
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

	.uibox {
		font-size: 1rem * $base-size;

		.userState {
			font-size: 2.5rem * $base-size;

			.userHp {
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

	.uibox {
		font-size: 1rem * $base-size;

		.userState {
			font-size: 2.5rem * $base-size;

			.userHp {
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
