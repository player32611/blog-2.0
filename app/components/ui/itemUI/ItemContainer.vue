<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import Matter, { Engine, Render, World, Bodies, Mouse, MouseConstraint, Runner } from "matter-js";

import ItemSwitchCard from "./ItemSwitchCard.vue";

const containerRef = ref<HTMLDivElement>();

let engine: Engine;
let render: Render;
let runner: Runner;

onMounted(() => {
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

	// 创建彩色方块
	const colors = ["#e94560", "#0f3460", "#533483", "#e63946", "#f1faee", "#a8dadc"];
	const boxes: Matter.Body[] = [];

	for (let i = 0; i < 15; i++) {
		const size = 30 + Math.random() * 40;
		const box = Bodies.rectangle(50 + Math.random() * (width - 100), -100 - i * 80, size, size, {
			restitution: 0.6,
			friction: 0.5,
			render: {
				fillStyle: colors[Math.floor(Math.random() * colors.length)],
			},
		});
		boxes.push(box);
	}

	World.add(engine.world, boxes);

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
	<ItemSwitchCard />
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
