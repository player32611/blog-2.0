<script setup lang="ts">
import Button from "~/components/ui/common/Button.vue";

const style: Record<string, string | number> = { cursor: "none" };
const iconStyle: Record<string, string | number> = { fontSize: "0.7em" };

const handleClick = () => {
	window.open("https://gamejolt.com/@player32611", "_blank", "noopener,noreferrer");
};
</script>

<template>
	<div class="game_ui">
		<div class="ui_state">
			<div class="state_name">
				<div>FRISK</div>
				<div>LV 19</div>
			</div>
			<div class="state_hp">
				<div>HP</div>
				<div class="hp_progress"></div>
				<div>KR 92/92</div>
			</div>
		</div>
		<div class="ui_button">
			<Button
				class-list="hoverable"
				text="fight"
				icon="&#xe601;"
				size="large"
				@click="handleClick"
				:style
				:iconStyle
			/>
			<Button
				class-list="hoverable"
				text="act"
				icon="&#xe63d;"
				size="large"
				@click="handleClick"
				:style
				:iconStyle
			/>
			<Button
				class-list="hoverable"
				text="item"
				icon="&#xe602;"
				size="large"
				@click="handleClick"
				:style
				:iconStyle
			/>
			<Button
				class-list="hoverable"
				text="mercy"
				icon="&#xe62f;"
				size="large"
				@click="handleClick"
				:style
				:iconStyle
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

$base-size: 1;

.game_ui {
	position: absolute;
	margin: 0 50px;
	bottom: 20px;
	width: calc(100% - 100px);
	z-index: variables.$float_zIndex;

	.ui_state {
		margin: 0.3rem * $base-size;
		display: grid;
		grid-template-columns: 1.5fr 3fr 1fr;
		justify-items: center;
		align-items: center;
		color: #ff7f27;
		font-size: 2.5rem * $base-size;
		font-family: "Mars Needs Cunnilingus";

		.state_name {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
		}

		.state_name {
			justify-self: start;
		}

		.state_hp {
			display: flex;
			margin-left: 2.5rem;
			font-size: 2.5rem * $base-size;

			.hp_progress {
				margin: 0 0.5rem * $base-size;
				height: 2rem * $base-size;
				width: 15rem * $base-size;
				background-color: #ffff00;
			}
		}
	}

	.ui_button {
		display: flex;
		justify-content: space-between;
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.35;

	.game_ui {
		margin: 0 50px * $base-size;
		bottom: 20px * $base-size;
		width: calc(100% - 100px * $base-size);

		.ui_state {
			margin: 0.3rem * $base-size;
			grid-template-columns: 1.5fr 3fr;
			font-size: 2.5rem * $base-size;

			.state_hp {
				margin-left: 2rem * $base-size;
				font-size: 2.5rem * $base-size;

				.hp_progress {
					margin: 0 0.5rem * $base-size;
					height: 2rem * $base-size;
					width: 15rem * $base-size;
				}
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.6;

	.game_ui {
		margin: 0 50px * $base-size;
		bottom: 20px * $base-size;
		width: calc(100% - 100px * $base-size);

		.ui_state {
			margin: 0.3rem * $base-size;
			grid-template-columns: 1.5fr 3fr;
			font-size: 2.5rem * $base-size;

			.state_hp {
				margin-left: 2rem * $base-size;
				font-size: 2.5rem * $base-size;

				.hp_progress {
					margin: 0 0.5rem * $base-size;
					height: 2rem * $base-size;
					width: 15rem * $base-size;
				}
			}
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.7;

	.game_ui {
		margin: 0 50px * $base-size;
		bottom: 20px * $base-size;
		width: calc(100% - 100px * $base-size);

		.ui_state {
			margin: 0.3rem * $base-size;
			font-size: 2.5rem * $base-size;

			.state_hp {
				margin-left: 2rem * $base-size;
				font-size: 2.5rem * $base-size;

				.hp_progress {
					margin: 0 0.5rem * $base-size;
					height: 2rem * $base-size;
					width: 15rem * $base-size;
				}
			}
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.9;

	.game_ui {
		margin: 0 50px * $base-size;
		bottom: 20px * $base-size;
		width: calc(100% - 100px * $base-size);

		.ui_state {
			margin: 0.3rem * $base-size;
			font-size: 2.5rem * $base-size;

			.state_hp {
				margin-left: 2rem * $base-size;
				font-size: 2.5rem * $base-size;

				.hp_progress {
					margin: 0 0.5rem * $base-size;
					height: 2rem * $base-size;
					width: 15rem * $base-size;
				}
			}
		}
	}
}
</style>
