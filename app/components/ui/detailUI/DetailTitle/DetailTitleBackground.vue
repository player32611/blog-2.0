<script setup lang="ts">
import Matter, {
	Bodies,
	Composites,
	Engine,
	Render,
	World,
	Mouse,
	MouseConstraint,
	Runner,
} from "matter-js";

const containerRef = ref<HTMLDivElement | null>(null);

let engine: Engine;
let render: Render;
let runner: Runner;
let mouse: Mouse;
let mouseConstraint: MouseConstraint;

const clothRows = 10;
const clothColumns = 10;
const rowGap = 30;
const columnGap = 30;
const particleRadius = 5; // 粒子半径
const lineWidth = 5;
const stiffness: number = 0.1;

const resize = () => {};

const init = () => {
	if (!containerRef.value) return;

	const width = containerRef.value.clientWidth;
	const height = containerRef.value.clientHeight;

	engine = Engine.create();
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
	mouse = Mouse.create(render.canvas);
	mouseConstraint = MouseConstraint.create(engine, {
		mouse: mouse,
		constraint: {
			stiffness: 0.2,
			render: {
				visible: false,
			},
		},
	});
	render.mouse = mouse;
	runner = Runner.create();

	createCloth();
	World.add(engine.world, mouseConstraint);

	Render.run(render);
	Runner.run(runner, engine);
};

const createCloth = () => {
	const group = Matter.Body.nextGroup(true);

	// 使用 Composites.stack 创建粒子网格
	const particleOptions = {
		inertia: Infinity,
		friction: 0.00001,
		collisionFilter: { group: group },
		render: {
			fillStyle: "#FF5733",
			strokeStyle: "#C70039",
			lineWidth: particleRadius,
			visible: true,
		},
	};

	const constraintOptions = {
		stiffness: stiffness,
		render: {
			strokeStyle: "#FFC300",
			lineWidth: lineWidth,
			type: "line",
			anchors: false,
		},
	};

	// 创建布料复合体
	const cloth = Composites.stack(0, 0, clothColumns, clothRows, columnGap, rowGap, function (x, y) {
		return Bodies.circle(x, y, particleRadius, particleOptions);
	});

	// 使用 Composites.mesh 自动创建约束
	Composites.mesh(cloth, clothColumns, clothRows, true, constraintOptions);

	// 固定顶部边缘的粒子
	for (let i = 0; i < clothColumns; i++) {
		if (cloth.bodies[i]) {
			cloth.bodies[i].isStatic = true;
		}
	}

	World.add(engine.world, cloth);
};

onMounted(() => {
	init();
	window.addEventListener("resize", resize);
});

onUnmounted(() => {
	if (runner) Runner.stop(runner);
	if (render) Render.stop(render);
	if (render && render.canvas) render.canvas.remove();
	if (render && render.canvas && render.canvas.parentNode)
		render.canvas.parentNode.removeChild(render.canvas);
	window.removeEventListener("resize", resize);
});
</script>

<template>
	<div class="title_background" ref="containerRef"></div>
</template>

<style scoped lang="scss">
.title_background {
	position: absolute;
	width: 100%;
	height: 100dvh;
}
</style>
