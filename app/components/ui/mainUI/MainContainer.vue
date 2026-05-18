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

import MainColorVial from "./MainColorVial.vue";

const mainStore = useMainStore();
const containerRef = ref<HTMLDivElement | null>(null);
const vialRefs = ref<Map<string, InstanceType<typeof MainColorVial>>>(new Map());
const vialPositions = ref<Map<string, ItemParams>>(new Map());
const vials = ref<Map<string, Matter.Body>>(new Map());

let engine: Engine;
let render: Render;
let runner: Runner;
let mouse: Mouse;
let mouseConstraint: MouseConstraint | null;
const colors = ["red", "purple", "pink", "blue", "cyan", "green", "yellow", "orange"];
const ropeLength = Array.from({ length: colors.length }, () => Math.random() * 100 + 50);

const resize = () => {
	World.clear(engine.world, true);
	Render.stop(render);
	Engine.clear(engine);
	containerRef.value?.removeChild(render.canvas);
	init();
	createVials();
	World.add(engine.world, Array.from(vials.value.values()));

	// 添加鼠标交互
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

	World.add(engine.world, mouseConstraint);
	render.mouse = mouse;

	// 启动渲染器和物理引擎
	Render.run(render);
	runner = Runner.create();
	Runner.run(runner, engine);
};

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
			background: "transparent",
			wireframes: false,
			showAngleIndicator: false,
		},
	});
};

const createVials = () => {
	if (!containerRef.value) return;

	const width = containerRef.value.clientWidth;
	const length = colors.length;

	colors.forEach((color, index) => {
		const x = vialPositions.value.get(`${color}Vial`)?.x ?? (width / (length + 1)) * (index + 1);
		const y = vialPositions.value.get(`${color}Vial`)?.y ?? 100;
		const angle = vialPositions.value.get(`${color}Vial`)?.angle ?? 0;
		const vialInstance = vialRefs.value.get(`${color}Vial`);
		if (vialInstance) {
			const object = vialInstance.createItem(x, y, angle);
			if (object) {
				vials.value.set(`${color}Vial`, object);
				const rope = Constraint.create({
					pointA: { x: (width / (length + 1)) * (index + 1), y: 0 },
					bodyB: object, // 被悬挂的物体
					length: ropeLength[index], // 绳子长度
					stiffness: 0.1, // 刚度（接近1表示更像刚性杆，较低值更像弹性绳）
					render: {
						strokeStyle: "#ffffff", // 绳子颜色
						lineWidth: 2,
					},
				});
				World.add(engine.world, rope);
			}
		}
	});
};

const handleUpdate = () => {
	Matter.Events.on(mouseConstraint, "startdrag", () => {
		if (containerRef.value) {
			mainStore.setIsDragging(true);
			containerRef.value.style.cursor = "grabbing";
		}
	});

	Matter.Events.on(mouseConstraint, "enddrag", () => {
		if (containerRef.value) {
			mainStore.setIsDragging(false);
			containerRef.value.style.cursor = "default";
		}
	});

	Matter.Events.on(engine, "afterUpdate", () => {
		vials.value.forEach((item, key) => {
			vialPositions.value?.set(key, {
				x: item.position.x,
				y: item.position.y,
				angle: item.angle,
			});
		});
	});
};

const handleMouseLeave = () => {
	if (mouseConstraint) {
		const draggedBody = mouseConstraint.body;
		(mouseConstraint as any).body = null;
		mouseConstraint.mouse.button = -1;
		mouseConstraint.constraint.bodyB = null;
		Matter.Events.trigger(mouseConstraint, "enddrag", { body: draggedBody });
	}
};

const handleTouchLeave = (event: TouchEvent) => {
	const touch = event.touches[0];
	if (!containerRef.value || !touch) return;

	const rect = containerRef.value.getBoundingClientRect();
	if (
		touch.clientX < rect.left ||
		touch.clientX > rect.right ||
		touch.clientY < rect.top ||
		touch.clientY > rect.bottom
	) {
		handleMouseLeave();
	}
};

onMounted(() => {
	init();
	createVials();
	World.add(engine.world, Array.from(vials.value.values()));

	// 添加鼠标交互
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

	World.add(engine.world, mouseConstraint);
	render.mouse = mouse;

	// 启动渲染器和物理引擎
	Render.run(render);
	runner = Runner.create();
	Runner.run(runner, engine);

	handleUpdate();
	window.addEventListener("resize", resize);
});

onUnmounted(() => {
	if (runner) Runner.stop(runner);
	if (render) Render.stop(render);
	if (render && render.canvas) render.canvas.remove();
	if (render && render.canvas && render.canvas.parentNode) {
		render.canvas.parentNode.removeChild(render.canvas);
	}
	window.removeEventListener("resize", resize);
});
</script>

<template>
	<div
		class="main_container"
		ref="containerRef"
		@mouseleave="handleMouseLeave"
		@touchcancel="handleMouseLeave"
		@touchmove.passive="handleTouchLeave"
	>
		<MainColorVial
			v-for="item in colors"
			:x="vialPositions.get(`${item}Vial`)?.x ?? 0"
			:y="vialPositions.get(`${item}Vial`)?.y ?? 0"
			:angle="vialPositions.get(`${item}Vial`)?.angle ?? 0"
			:color="item"
			:ref="
				el => {
					if (el) vialRefs?.set(`${item}Vial`, el as InstanceType<typeof MainColorVial>);
				}
			"
		/>
	</div>
</template>

<style scoped lang="scss">
.main_container {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 20%;
	opacity: 0.5;
	user-select: none;
}
</style>
