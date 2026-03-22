<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import Matter, { Engine, Render, World, Bodies, Mouse, MouseConstraint, Runner } from "matter-js";

import ItemSwitchCard from "./ItemSwitchCard.vue";

const containerRef = ref<HTMLDivElement>();
const ItemSwitchCardRef = ref<InstanceType<typeof ItemSwitchCard> | null>(null);
const boxPosition = ref({ x: 0, y: 0, angle: 0 });

let engine: Engine;
let render: Render;
let runner: Runner;
let boxes: Matter.Body[] = [];

// 方法2：获取单个方块的坐标
function getBoxCoordinate(index: number) {
	if (boxes[index]) {
		return {
			x: boxes[index].position.x,
			y: boxes[index].position.y,
			angle: boxes[index].angle,
		};
	}
	return null;
}

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

	const width = containerRef.value.clientWidth;
	const height = containerRef.value.clientHeight;

	// 创建彩色方块
	const colors = ["#e94560", "#0f3460", "#533483", "#e63946", "#f1faee", "#a8dadc"];
	const boxes: Matter.Body[] = [];

	if (ItemSwitchCardRef.value)
		boxes.push(
			Bodies.rectangle(
				width / 2,
				height / 2,
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

	World.add(engine.world, boxes);

	// 在更新事件中监听坐标变化
	Matter.Events.on(engine, "afterUpdate", () => {
		// 更新第一个方块的位置到ref中，供模板使用
		if (boxes[0]) {
			boxPosition.value = {
				x: boxes[0].position.x,
				y: boxes[0].position.y,
				angle: boxes[0].angle,
			};
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
	if (runner) {
		Runner.stop(runner);
	}
	if (render) {
		Render.stop(render);
	}
	if (render && render.canvas) {
		render.canvas.remove();
	}
	if (render && render.canvas && render.canvas.parentNode) {
		render.canvas.parentNode.removeChild(render.canvas);
	}
});
</script>

<template>
	<ItemSwitchCard
		:x="boxPosition.x"
		:y="boxPosition.y"
		:angle="boxPosition.angle"
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
