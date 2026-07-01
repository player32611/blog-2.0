<script setup lang="ts">
import { gsap } from "gsap/gsap-core";

const slots = useSlots();
const activeTab = ref<number>(0);
const tabsRef = ref<Array<HTMLElement>>([]);
const barRef = ref<HTMLDivElement | null>(null);
const blocksRef = ref<Array<HTMLElement>>([]);
const blockContainerRef = ref<HTMLDivElement | null>(null);

const slotChildren = computed(() => slots.default?.() ?? []);
const tabs = computed(() =>
	slotChildren.value.map((vnode: any, index) => ({
		label: vnode.props?.filename ?? vnode.props?.language ?? `Tab ${index + 1}`,
		code: vnode.props?.code ?? "",
		language: vnode.props?.language ?? "",
		filename: vnode.props?.filename ?? "",
	})),
);

const handleClickTab = (index: number) => {
	if (index === activeTab.value) return;
	if (!tabsRef.value[index]) return;
	const activeBlock = blocksRef.value[activeTab.value];
	if (!activeBlock) return;
	const newBlock = blocksRef.value[index];
	if (!newBlock) return;
	activeTab.value = index;
	gsap.to(barRef.value, {
		left: `${tabsRef.value[index].offsetLeft + tabsRef.value[index].offsetWidth * 0.1}`,
		width: `${tabsRef.value[index].offsetWidth * 0.8}px`,
		duration: 0.5,
		ease: "power1.out",
	});
	gsap
		.timeline()
		.to(blockContainerRef.value, { height: 0, duration: 0.5, ease: "power1.out" })
		.set(activeBlock, { height: 0 })
		.set(newBlock, { height: "auto" })
		.to(blockContainerRef.value, { height: "auto", duration: 0.5, ease: "power1.out" });
};

onMounted(() => {
	const firstTab = tabsRef.value[0];
	const firstBlock = blocksRef.value[0];
	if (firstTab && firstBlock) {
		gsap.set(barRef.value, {
			left: `${firstTab.offsetLeft + firstTab.offsetWidth * 0.1}px`,
			width: `${firstTab.offsetWidth * 0.8}px`,
		});
		gsap.set(firstBlock, { height: "auto" });
		gsap.set(blockContainerRef.value, { height: `${firstBlock.offsetHeight}px` });
	}
});
</script>

<template>
	<div class="code_group">
		<div class="tabs">
			<button
				v-for="(tab, index) in tabs"
				:key="index"
				class="tab"
				:class="{ active: activeTab === index }"
				@click="() => handleClickTab(index)"
				ref="tabsRef"
			>
				{{ tab.label }}
			</button>
		</div>
		<div class="bar_container">
			<div class="bar" ref="barRef"></div>
		</div>
		<div class="blocks" ref="blockContainerRef">
			<template v-if="$slots.default">
				<div
					v-for="(vnode, index) in slotChildren"
					:key="index"
					class="block"
					:class="{ active: activeTab === index }"
					:ref="
						el => {
							if (el) blocksRef[index] = el as HTMLElement;
						}
					"
				>
					<component :is="vnode" />
				</div>
			</template>
		</div>
	</div>
</template>

<style scoped lang="scss">
.code_group {
	position: relative;
	margin: 20px 0;
	border-radius: 8px;

	.tabs {
		position: relative;
		display: flex;
		border-width: 2.5px;
		border-style: solid;
		border-color: #ffffff;
		border-radius: 8px;
		overflow-x: hidden;

		&::-webkit-scrollbar {
			display: none;
		}

		.tab {
			padding: 8px 16px;
			font-family: "方正基础像素体";
			font-size: 1rem;
			color: rgba(255, 255, 255, 0.5);
			background: transparent;
			border: none;
			cursor: pointer;
			white-space: nowrap;
			transition:
				color 0.2s,
				border-color 0.2s;

			&:hover {
				color: rgba(255, 255, 255, 0.8);
			}

			&.active {
				color: #ffffff;
			}
		}
	}

	.bar_container {
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;

		.bar {
			position: absolute;
			top: 6px;
			left: 0;
			height: 2px;
			background-color: #ffffff;
		}
	}

	.blocks {
		position: relative;
		margin-top: 1rem;
		border-bottom: 2.5px solid #ffffff;
		overflow: hidden;

		.block {
			height: 0px;
			width: 100%;

			&.active {
				display: block;
			}

			:deep(.custom_pre_wrapper) {
				margin: 0;
			}
		}
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.6;

	.code_group {
		margin: 20px * $base-size 0;

		.tabs {
			border-width: 2.5px * $base-size;

			.tab {
				padding: 8px * $base-size 16px * $base-size;
				font-size: 1rem * $base-size;
			}
		}

		.bar_container {
			.bar {
				top: 6px * $base-size;
				height: 2px * $base-size;
			}
		}

		.blocks {
			margin-top: 1rem * $base-size;
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.7;

	.code_group {
		margin: 20px * $base-size 0;

		.tabs {
			border-width: 2.5px * $base-size;

			.tab {
				padding: 8px * $base-size 16px * $base-size;
				font-size: 1rem * $base-size;
			}
		}

		.bar_container {
			.bar {
				top: 6px * $base-size;
				height: 2px * $base-size;
			}
		}

		.blocks {
			margin-top: 1rem * $base-size;
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.8;

	.code_group {
		margin: 20px * $base-size 0;

		.tabs {
			border-width: 2.5px * $base-size;

			.tab {
				padding: 8px * $base-size 16px * $base-size;
				font-size: 1rem * $base-size;
			}
		}

		.bar_container {
			.bar {
				top: 6px * $base-size;
				height: 2px * $base-size;
			}
		}

		.blocks {
			margin-top: 1rem * $base-size;
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.9;

	.code_group {
		margin: 20px * $base-size 0;

		.tabs {
			border-width: 2.5px * $base-size;

			.tab {
				padding: 8px * $base-size 16px * $base-size;
				font-size: 1rem * $base-size;
			}
		}

		.bar_container {
			.bar {
				top: 6px * $base-size;
				height: 2px * $base-size;
			}
		}

		.blocks {
			margin-top: 1rem * $base-size;
		}
	}
}
</style>
