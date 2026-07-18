<script setup lang="ts">
import gsap from "gsap";

import RectButton from "~/components/ui/common/RectButton.vue";

const detailStore = useDetailStore();
const progressRef = ref<HTMLDivElement | null>(null);

const style: Record<string, string | number> = { cursor: "none" };
const iconStyle: Record<string, string | number> = { fontSize: "0.7em" };
const changeTime = 1;

const handleClick = () => {
	window.open("https://gamejolt.com/@player32611", "_blank", "noopener,noreferrer");
};

const refreshHp = (hp: number) => {
	gsap.to(progressRef.value, {
		width: `${(hp / MAIN_HP) * 100}%`,
		duration: changeTime,
	});
};

watch(
	() => detailStore.workGameCurrentHp,
	newState => {
		refreshHp(newState);
	},
);

onMounted(() => {
	refreshHp(detailStore.workGameCurrentHp);
});
</script>

<template>
	<div class="game_ui">
		<div class="ui_state">
			<div class="state_name">
				<div>{{ MAIN_NAME }}</div>
				<div>LV {{ MAIN_LV }}</div>
			</div>
			<div class="state_hp">
				<div>HP</div>
				<div class="hp_progress_container">
					<div class="hp_progress" ref="progressRef"></div>
				</div>
				<div>KR {{ detailStore.workGameCurrentHp }}/{{ MAIN_HP }}</div>
			</div>
		</div>
		<div class="ui_button">
			<RectButton
				text="fight"
				icon="&#xe601;"
				size="large"
				@click="handleClick"
				:style
				:iconStyle
			/>
			<RectButton text="act" icon="&#xe63d;" size="large" @click="handleClick" :style :iconStyle />
			<RectButton text="item" icon="&#xe602;" size="large" @click="handleClick" :style :iconStyle />
			<RectButton
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
	width: calc(100% - 4vw);
	z-index: variables.$float_zIndex;

	.ui_state {
		margin: 1vh 1vw;
		display: grid;
		grid-template-columns: 1.5fr 3fr 1fr;
		justify-items: center;
		align-items: center;
		color: #ff7f27;
		font-size: 5vmin;
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
			align-items: center;
			margin-left: 3vw;

			.hp_progress_container {
				margin: 0 1vw;
				display: flex;
				height: 4vmin;
				width: 20vw;
				background-color: red;

				.hp_progress {
					height: 100%;
					background-color: #ffff00;
				}
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
		.ui_state {
			grid-template-columns: 1.5fr 3fr;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.6;

	.game_ui {
		.ui_state {
			grid-template-columns: 1.5fr 3fr;
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.7;

	.game_ui {
		.ui_state {
			font-size: 4vmin;
		}
	}
}
</style>
