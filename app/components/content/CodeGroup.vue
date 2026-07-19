<script setup lang="ts">
import gsap from "gsap";

const slots = useSlots();
const activeTabIndex = ref<number>(0);
const tabContainerRef = ref<HTMLDivElement | null>(null);
const tabRefs = ref<HTMLElement[]>([]);
const barRef = ref<HTMLDivElement | null>(null);
const blockRefs = ref<HTMLElement[]>([]);
const blockContainerRef = ref<HTMLDivElement | null>(null);
const changeAnim = ref<GSAPTimeline | null>(null);
const showLeftArrow = ref<boolean>(false);
const showRightArrow = ref<boolean>(false);

const slotChildren = computed(() => slots.default?.() ?? []);
const tabs = computed(() =>
	slotChildren.value.map((vnode: any, index) => ({
		label: vnode.props?.filename ?? vnode.props?.language ?? `Tab ${index + 1}`,
		code: vnode.props?.code ?? "",
		language: vnode.props?.language ?? "",
		filename: vnode.props?.filename ?? "",
	})),
);

let toScrollLeft: gsap.QuickToFunc;
const scrollDistance = 100;
const scrollDuration = 0.5;

const handleClickTab = (index: number) => {
	if (
		index === activeTabIndex.value ||
		changeAnim.value ||
		!tabRefs.value[index] ||
		!tabContainerRef.value
	)
		return;
	const activeBlock = blockRefs.value[activeTabIndex.value];
	const newBlock = blockRefs.value[index];
	const tabWidth = tabRefs.value[index].offsetWidth;
	const tabLeft = tabRefs.value[index].offsetLeft;
	const scrollLeft = tabContainerRef.value.scrollLeft;

	activeTabIndex.value = index;
	gsap.to(barRef.value, {
		left: tabLeft + tabWidth * 0.1 - scrollLeft,
		width: tabWidth * 0.8,
		duration: 0.5,
		ease: "power1.out",
		overwrite: true,
	});
	changeAnim.value = gsap
		.timeline({
			onComplete: () => {
				changeAnim.value?.kill();
				changeAnim.value = null;
			},
		})
		.to(blockContainerRef.value, { height: 0, duration: 0.5, ease: "power1.out" })
		.set(activeBlock || null, { height: 0 })
		.set(newBlock || null, { height: "auto" })
		.to(blockContainerRef.value, { height: "auto", duration: 0.5, ease: "power1.out" });
};

const scrollUpdate = () => {
	const activeTab = tabRefs.value[activeTabIndex.value];
	if (!tabContainerRef.value || !activeTab) return;

	const tabWidth = activeTab.offsetWidth;
	const tabLeft = activeTab.offsetLeft;
	const scrollLeft = tabContainerRef.value.scrollLeft;
	const scrollWidth = tabContainerRef.value.scrollWidth;
	const clientWidth = tabContainerRef.value.clientWidth;

	if (scrollLeft) showLeftArrow.value = true;
	else showLeftArrow.value = false;
	if (scrollLeft + clientWidth >= scrollWidth - 1) showRightArrow.value = false;
	else showRightArrow.value = true;

	gsap.to(barRef.value, {
		left: tabLeft + tabWidth * 0.1 - scrollLeft,
		width: tabWidth * 0.8,
		duration: 0.5,
		ease: "power1.out",
	});
};

const handleClickArrow = (direction: "left" | "right") => {
	if (!tabContainerRef.value) return;
	if (direction === "left") toScrollLeft(tabContainerRef.value.scrollLeft - scrollDistance);
	else toScrollLeft(tabContainerRef.value.scrollLeft + scrollDistance);
};

onMounted(() => {
	toScrollLeft = gsap.quickTo(tabContainerRef.value, "scrollLeft", {
		ease: "power1.out",
		duration: scrollDuration,
		onUpdate: scrollUpdate,
	});
	scrollUpdate();
	const firstTab = tabRefs.value[0];
	const firstBlock = blockRefs.value[0];
	if (firstTab && firstBlock) {
		gsap.set(barRef.value, {
			left: firstTab.offsetLeft + firstTab.offsetWidth * 0.1,
			width: firstTab.offsetWidth * 0.8,
			overwrite: true,
		});
		gsap.set(firstBlock, { height: "auto" });
		gsap.set(blockContainerRef.value, { height: firstBlock.offsetHeight });
	}
	window.addEventListener("resize", scrollUpdate);
});

onUnmounted(() => {
	changeAnim.value?.kill();
	window.removeEventListener("resize", scrollUpdate);
});
</script>

<template>
	<div class="code_group" v-if="slotChildren.length">
		<div class="code_group_head">
			<div class="tabs" ref="tabContainerRef">
				<button
					v-for="(tab, index) in tabs"
					:key="index"
					class="tab"
					:class="{ active: activeTabIndex === index }"
					@click="() => handleClickTab(index)"
					ref="tabRefs"
				>
					{{ tab.label }}
				</button>
			</div>
			<span class="icon arrow_left" v-if="showLeftArrow" @click="handleClickArrow('left')">
				&#xe7a1;
			</span>
			<span class="icon arrow_right" v-if="showRightArrow" @click="handleClickArrow('right')">
				&#xe7a2;
			</span>
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
					:class="{ active: activeTabIndex === index }"
					ref="blockRefs"
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

	.code_group_head {
		position: relative;
		display: flex;
		align-items: center;

		.tabs {
			flex: 1;
			position: relative;
			display: flex;
			align-items: center;
			border-width: 2.5px;
			border-style: solid;
			border-color: var(--theme-color, #ffffff);
			border-radius: 8px;
			overflow-x: hidden;

			&::-webkit-scrollbar {
				display: none;
			}

			.tab {
				padding: 8px 16px;
				font-family: "方正基础像素体";
				font-size: 1rem;
				color: rgba(#ffffff, 0.5);
				background: transparent;
				border: none;
				cursor: pointer;
				white-space: nowrap;
				transition:
					color 0.2s,
					border-color 0.2s;

				&:hover {
					color: rgba(#ffffff, 0.8);
				}

				&.active {
					color: var(--theme-color, #ffffff);
				}
			}
		}

		.icon {
			position: absolute;
			color: rgba(255, 255, 255, 0.5);
			font-size: 1rem;
			transform: translateY(1px);
			transition: color 0.2s ease;
			user-select: none;
			cursor: pointer;

			&:hover {
				color: #ffffff;
			}

			&.arrow_left {
				left: 0;
			}

			&.arrow_right {
				right: 0;
			}
		}
	}

	.bar_container {
		position: relative;
		display: flex;
		align-items: center;
		top: 6px;
		height: 2px;
		width: 100%;
		overflow: hidden;

		.bar {
			position: relative;
			left: 0;
			height: 2px;
			background-color: var(--theme-color, #ffffff);
		}
	}

	.blocks {
		position: relative;
		margin-top: 1rem;
		border-bottom: 2.5px solid var(--theme-color, #ffffff);
		overflow: hidden;

		.block {
			height: 0px;
			width: 100%;

			&.active {
				display: block;
			}

			:deep(.custom_pre_wrapper) {
				margin: 0;
				--code-color: var(--theme-color, #ffffff);
			}
		}
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.6;

	.code_group {
		margin: 20px * $base-size 0;

		.code_group_head {
			.tabs {
				border-width: 2.5px * $base-size;

				.tab {
					padding: 8px * $base-size 16px * $base-size;
					font-size: 1rem * $base-size;
				}
			}
		}

		.bar_container {
			top: 6px * $base-size;
			height: 2px * $base-size;

			.bar {
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

		.code_group_head {
			.tabs {
				border-width: 2.5px * $base-size;

				.tab {
					padding: 8px * $base-size 16px * $base-size;
					font-size: 1rem * $base-size;
				}
			}
		}

		.bar_container {
			top: 6px * $base-size;
			height: 2px * $base-size;

			.bar {
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

		.code_group_head {
			.tabs {
				border-width: 2.5px * $base-size;

				.tab {
					padding: 8px * $base-size 16px * $base-size;
					font-size: 1rem * $base-size;
				}
			}
		}

		.bar_container {
			top: 6px * $base-size;
			height: 2px * $base-size;

			.bar {
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

		.code_group_head {
			.tabs {
				border-width: 2.5px * $base-size;

				.tab {
					padding: 8px * $base-size 16px * $base-size;
					font-size: 1rem * $base-size;
				}
			}
		}

		.bar_container {
			top: 6px * $base-size;
			height: 2px * $base-size;

			.bar {
				height: 2px * $base-size;
			}
		}

		.blocks {
			margin-top: 1rem * $base-size;
		}
	}
}
</style>
