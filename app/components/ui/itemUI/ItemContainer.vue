<script setup lang="ts">
import Matter, { Engine, Render, World, Bodies, Mouse, MouseConstraint, Runner } from "matter-js";
import type { ItemParams } from "~/types/components";

import ItemPhoneCard from "./ItemPhoneCard.vue";
import ItemSwitchCard from "./ItemSwitchCard.vue";

const containerRef = ref<HTMLDivElement>();
const ItemPhoneCardRef = ref<InstanceType<typeof ItemPhoneCard> | null>(null);
const ItemSwitchCardRef = ref<InstanceType<typeof ItemSwitchCard> | null>(null);
const boxPositions = ref<Map<string, ItemParams> | null>(null);
const boxes = ref<Map<string, Matter.Body> | null>(null);
let engine: Engine;
let render: Render;
let runner: Runner;

const init = () => {
	if (!containerRef.value) return;

	const width = containerRef.value.clientWidth;
	const height = containerRef.value.clientHeight;

	// 创建引擎
	engine = Engine.create();

	// 创建渲染器
	render = Render.create({
		element: containerRef.value,
		engine: engine,
		options: {
			width,
			height,
			background: "#1a1a2e",
			wireframes: false,
			showAngleIndicator: false,
		},
	});

	// 创建地面
	const ground = Bodies.rectangle(width / 2, height + 30, width, 60, {
		isStatic: true,
		render: {
			fillStyle: "#16213e",
		},
	});

	// 创建墙壁
	const leftWall = Bodies.rectangle(-30, height / 2, 60, height, {
		isStatic: true,
		render: {
			fillStyle: "#16213e",
		},
	});

	const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height, {
		isStatic: true,
		render: {
			fillStyle: "#16213e",
		},
	});

	// 添加边界
	World.add(engine.world, [ground, leftWall, rightWall]);
};

const createBoxes = () => {
	if (!containerRef.value) return;

	if (!boxPositions.value) boxPositions.value = new Map();

	const width = containerRef.value.clientWidth;
	const height = containerRef.value.clientHeight;

	if (!boxes.value) boxes.value = new Map();
	boxes.value.clear();

	if (ItemSwitchCardRef.value)
		boxes.value.set(
			"ItemSwitchCard",
			Bodies.rectangle(
				Math.random() * width,
				Math.random() * -100,
				ItemSwitchCardRef.value.$el.offsetWidth,
				ItemSwitchCardRef.value.$el.offsetHeight,
				{
					restitution: 0.6,
					friction: 0.5,
					render: {
						fillStyle: "rgba(0, 0, 0, 0)",
					},
				},
			),
		);

	if (ItemPhoneCardRef.value)
		boxes.value.set(
			"ItemPhoneCard",
			Bodies.rectangle(
				Math.random() * width,
				Math.random() * -100,
				ItemPhoneCardRef.value.$el.offsetWidth,
				ItemPhoneCardRef.value.$el.offsetHeight,
				{
					restitution: 0.6,
					friction: 0.5,
					render: {
						fillStyle: "rgba(0, 0, 0, 0)",
					},
				},
			),
		);

	World.add(engine.world, Array.from(boxes.value.values()));

	// 在更新事件中监听坐标变化
	Matter.Events.on(engine, "afterUpdate", () => {
		if (boxes.value?.get("ItemSwitchCard")) {
			boxPositions.value?.set("ItemSwitchCard", {
				x: boxes.value.get("ItemSwitchCard")?.position.x ?? 0,
				y: boxes.value.get("ItemSwitchCard")?.position.y ?? 0,
				angle: boxes.value.get("ItemSwitchCard")?.angle ?? 0,
			});
		}
		if (boxes.value?.get("ItemPhoneCard")) {
			boxPositions.value?.set("ItemPhoneCard", {
				x: boxes.value.get("ItemPhoneCard")?.position.x ?? 0,
				y: boxes.value.get("ItemPhoneCard")?.position.y ?? 0,
				angle: boxes.value.get("ItemPhoneCard")?.angle ?? 0,
			});
		}
	});
};

onMounted(() => {
	init();
	createBoxes();
	// 添加鼠标交互
	const mouse = Mouse.create(render.canvas);
	const mouseConstraint = MouseConstraint.create(engine, {
		mouse: mouse,
		constraint: {
			stiffness: 0.2,
			render: {
				visible: false,
			},
		},
	});

	World.add(engine.world, mouseConstraint);
	render.mouse = mouse;

	// 启动渲染器和物理引擎
	Render.run(render);
	runner = Runner.create();
	Runner.run(runner, engine);
});

onUnmounted(() => {
	if (runner) Runner.stop(runner);
	if (render) Render.stop(render);
	if (render && render.canvas) render.canvas.remove();
	if (render && render.canvas && render.canvas.parentNode) {
		render.canvas.parentNode.removeChild(render.canvas);
	}
});
</script>

<template>
	<ItemPhoneCard
		:x="boxPositions?.get('ItemPhoneCard')?.x ?? 0"
		:y="boxPositions?.get('ItemPhoneCard')?.y ?? 0"
		:angle="boxPositions?.get('ItemPhoneCard')?.angle ?? 0"
		ref="ItemPhoneCardRef"
	/>
	<ItemSwitchCard
		:x="boxPositions?.get('ItemSwitchCard')?.x ?? 0"
		:y="boxPositions?.get('ItemSwitchCard')?.y ?? 0"
		:angle="boxPositions?.get('ItemSwitchCard')?.angle ?? 0"
		ref="ItemSwitchCardRef"
	/>
	<div ref="containerRef" class="item-container"></div>
</template>

<style scoped lang="scss">
.item-container {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
