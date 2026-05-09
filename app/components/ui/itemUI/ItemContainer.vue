<script setup lang="ts">
import Matter, {
	Constraint,
	Engine,
	Render,
	World,
	Bodies,
	Mouse,
	MouseConstraint,
	Runner,
} from "matter-js";
import type { ItemParams } from "~/types/components";

import ItemMagnetCard from "./ItemMagnetCard.vue";
import ItemPhoneCard from "./ItemPhoneCard.vue";
import ItemSwitchCard from "./ItemSwitchCard.vue";

const containerRef = ref<HTMLDivElement>();
const ItemMagnetCardRef = ref<InstanceType<typeof ItemMagnetCard> | null>(null);
const ItemPhoneCardRef = ref<InstanceType<typeof ItemPhoneCard> | null>(null);
const ItemSwitchCardRef = ref<InstanceType<typeof ItemSwitchCard> | null>(null);
const itemPositions = ref<Map<string, ItemParams>>(new Map());
const items = ref<Map<string, Matter.Body>>(new Map());
let engine: Engine;
let render: Render;
let runner: Runner;
let mouseConstraint: MouseConstraint;

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

const createConstraints = () => {
	if (!containerRef.value) return;

	const width = containerRef.value.clientWidth;
	const height = containerRef.value.clientHeight;
	// 创建悬挂点（固定点）
	const anchorPoint = Bodies.circle(width / 2, 0, 5, {
		isStatic: true,
		render: {
			fillStyle: "transparent", // 隐藏悬挂点
		},
	});

	// 创建悬挂物体）
	let magnetCardBody: Matter.Body | null = null;
	if (ItemMagnetCardRef.value) {
		magnetCardBody = Bodies.rectangle(
			width / 2,
			120,
			ItemMagnetCardRef.value.$el.offsetHeight,
			ItemMagnetCardRef.value.$el.offsetWidth * 5,
			{
				restitution: 0.6,
				friction: 0.5,
				render: {
					fillStyle: "rgba(0, 0, 0, 0)",
				},
			},
		);
		// 创建绳子约束（连接悬挂点和物体）
		const ropeConstraint = Constraint.create({
			bodyA: anchorPoint, // 悬挂点位置
			bodyB: magnetCardBody, // 被悬挂的物体
			length: 120, // 绳子长度
			stiffness: 0.1, // 刚度（接近1表示更像刚性杆，较低值更像弹性绳）
			render: {
				visible: true, // 可视化绳子（调试时可开启）
				strokeStyle: "#ffffff", // 绳子颜色
				lineWidth: 2,
			},
		});

		// 将物体和约束添加到世界
		items.value.set("ItemMagnetCard", magnetCardBody);
		World.add(engine.world, [anchorPoint, ropeConstraint]);
	}
};

const createCards = () => {
	if (!containerRef.value) return;

	const width = containerRef.value.clientWidth;
	const height = containerRef.value.clientHeight;

	if (ItemSwitchCardRef.value)
		items.value.set(
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
		items.value.set(
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
};

const handleUpdate = () => {
	Matter.Events.on(mouseConstraint, "startdrag", () => {
		if (containerRef.value) {
			containerRef.value.style.cursor = "grabbing";
		}
	});

	Matter.Events.on(mouseConstraint, "enddrag", () => {
		if (containerRef.value) {
			containerRef.value.style.cursor = "default";
		}
	});

	Matter.Events.on(engine, "afterUpdate", () => {
		items.value.forEach((item, key) => {
			itemPositions.value?.set(key, {
				x: item.position.x,
				y: item.position.y,
				angle: item.angle,
			});
			if (key === "ItemMagnetCard" && item.velocity.y < -10) {
				console.log("666");
			}
		});
	});
};

onMounted(() => {
	init();
	createConstraints();
	createCards();
	World.add(engine.world, Array.from(items.value.values()));

	// 添加鼠标交互
	const mouse = Mouse.create(render.canvas);
	mouseConstraint = MouseConstraint.create(engine, {
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

	handleUpdate();
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
		:x="itemPositions?.get('ItemPhoneCard')?.x ?? 0"
		:y="itemPositions?.get('ItemPhoneCard')?.y ?? 0"
		:angle="itemPositions?.get('ItemPhoneCard')?.angle ?? 0"
		ref="ItemPhoneCardRef"
	/>
	<ItemSwitchCard
		:x="itemPositions?.get('ItemSwitchCard')?.x ?? 0"
		:y="itemPositions?.get('ItemSwitchCard')?.y ?? 0"
		:angle="itemPositions?.get('ItemSwitchCard')?.angle ?? 0"
		ref="ItemSwitchCardRef"
	/>
	<ItemMagnetCard
		:x="itemPositions?.get('ItemMagnetCard')?.x ?? 0"
		:y="itemPositions?.get('ItemMagnetCard')?.y ?? 0"
		:angle="itemPositions?.get('ItemMagnetCard')?.angle ?? 0"
		ref="ItemMagnetCardRef"
	/>
	<div ref="containerRef" class="item-container"></div>
</template>

<style scoped lang="scss">
.item-container {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
}
</style>
