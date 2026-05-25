<script setup lang="ts">
import Matter, {
	Engine,
	Render,
	World,
	Bodies,
	Body,
	Mouse,
	MouseConstraint,
	Runner,
} from "matter-js";
import { ScrollSmoother } from "gsap/all";
import type { DetailIntroduceSkillContainerInstance, ItemParams } from "~/types/components";

import DetailIntroduceSkillItem from "./DetailIntroduceSkillItem.vue";

const containerRef = ref<HTMLDivElement | null>(null);
const itemRefs = ref<Map<string, InstanceType<typeof DetailIntroduceSkillItem>>>(new Map());
const itemPositions = ref<Map<string, ItemParams>>(new Map());
const itemInstances = ref<Map<string, Matter.Body>>(new Map());

const skills = getDetailSkills();

let engine: Engine;
let render: Render;
let runner: Runner;
let mouse: Mouse;
let mouseConstraint: MouseConstraint | null;

const resize = () => {
	World.clear(engine.world, true);
	Render.stop(render);
	Engine.clear(engine);
	containerRef.value?.removeChild(render.canvas);
	init();
	handleUpdate();
};

const init = () => {
	if (!containerRef.value) return;

	const width = containerRef.value.clientWidth;
	const height = containerRef.value.clientHeight;
	let state = false;
	if (runner && runner.enabled) state = runner.enabled;

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
	render.mouse = mouse;

	runner = Runner.create({
		delta: 1000 / 60, // 保持60fps的更新目标
		maxFrameTime: 50, // 设置一个保护上限，避免你的53ms场景导致物理崩溃
	});
	createBorder();
	createItems();

	World.add(engine.world, Array.from(itemInstances.value.values()));
	World.add(engine.world, mouseConstraint);

	Render.run(render);
	Runner.run(runner, engine);

	if (state) resume();
	else pause();
};

const createBorder = () => {
	if (!containerRef.value) return;

	const width = containerRef.value.clientWidth;
	const height = containerRef.value.clientHeight;

	const cx = width / 2;
	const cy = height / 2;
	const rectWid = 10;
	const segments = 12;
	const lackAngle = 45;

	const outerRadius = width / 2;
	const angleStep =
		(Math.PI * 2 - degreesToRadians(lackAngle) - segments * degreesToRadians(5)) / segments;
	const parts = [];

	// 矩形的宽度（弧长），不重叠的关键：宽度略小于弧长
	const arcLength = outerRadius * angleStep;
	const rectWidth = arcLength * 0.98; // 留 2% 间隙，确保不重叠

	for (let i = 0; i < segments; i++) {
		const angle = i * (angleStep + degreesToRadians(5)) - degreesToRadians(55);
		// 矩形中心在圆周上
		const centerX = cx + outerRadius * Math.cos(angle);
		const centerY = cy + outerRadius * Math.sin(angle);

		// 创建矩形
		const rect = Bodies.rectangle(centerX, centerY, rectWidth, rectWid, {
			isStatic: true,
			restitution: 0.85,
			friction: 0.4,
			angle: angle + Math.PI / 2, // 旋转使矩形指向圆心切线方向
			render: {
				fillStyle: "rgba(0, 0, 0, 0)",
				strokeStyle: "rgba(0, 0, 0, 0)",
				lineWidth: 1,
			},
		});

		parts.push(rect);
	}

	const container = Body.create({
		parts: parts,
		isStatic: true,
		restitution: 0.85,
		friction: 0.4,
	});

	World.add(engine.world, [container]);
};

const createItems = () => {
	if (!containerRef.value) return;
	const width = containerRef.value.clientWidth;

	skills.forEach((skill, index) => {
		const x = itemPositions.value.get(`${skill}Item`)?.x ?? width / 2;
		const y = itemPositions.value.get(`${skill}Item`)?.y ?? (index + 1) * -100;
		const angle = itemPositions.value.get(`${skill}Item`)?.angle ?? 0;
		const itemRef = itemRefs.value.get(`${skill}Item`);
		if (itemRef) {
			const object = itemRef.createItem(x, y, angle);
			if (object) itemInstances.value.set(`${skill}Item`, object);
		}
	});
};

const handleUpdate = () => {
	Matter.Events.on(mouseConstraint, "startdrag", () => {
		if (containerRef.value) {
			containerRef.value.style.cursor = "grabbing";
		}
	});

	Matter.Events.on(mouseConstraint, "enddrag", () => {
		if (containerRef.value) {
			containerRef.value.style.cursor = "pointer";
		}
	});

	Matter.Events.on(engine, "afterUpdate", () => {
		const smoother = ScrollSmoother.get();
		if (smoother && containerRef.value) {
			const width = containerRef.value.clientWidth;
			const height = containerRef.value.clientHeight;
			const speed = smoother.getVelocity() / -500000;

			itemInstances.value.forEach(item => {
				Matter.Body.applyForce(item, item.position, {
					x: 0,
					y: speed * item.mass,
				});
				if (item.position.y > height + 100) {
					Matter.Body.setPosition(item, { x: width / 2, y: -100 });
					Matter.Body.setVelocity(item, { x: 0, y: 0 });
				}
			});
		}
	});

	Matter.Events.on(engine, "afterUpdate", () => {
		itemInstances.value.forEach((item, key) => {
			itemPositions.value?.set(key, {
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

const resume = () => {
	runner.enabled = true;
};

const pause = () => {
	runner.enabled = false;
};

onMounted(() => {
	init();
	handleUpdate();
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

defineExpose<DetailIntroduceSkillContainerInstance>({
	resume,
	pause,
});
</script>

<template>
	<div
		class="skill_container"
		ref="containerRef"
		@mouseleave="handleMouseLeave"
		@touchcancel="handleMouseLeave"
		@touchmove.passive="handleTouchLeave"
	>
		<DetailIntroduceSkillItem
			v-for="skill in skills"
			:x="itemPositions.get(`${skill}Item`)?.x ?? 0"
			:y="itemPositions.get(`${skill}Item`)?.y ?? 0"
			:angle="itemPositions.get(`${skill}Item`)?.angle ?? 0"
			:skill="skill"
			:ref="
				el => {
					if (el)
						itemRefs?.set(`${skill}Item`, el as InstanceType<typeof DetailIntroduceSkillItem>);
				}
			"
		/>
	</div>
</template>

<style scoped lang="scss">
.skill_container {
	position: relative;
	width: 100%;
	height: 100%;
	user-select: none;
	cursor: pointer;
	touch-action: none;
}
</style>
