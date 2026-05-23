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
import { ScrollSmoother } from "gsap/all";
import type { ItemParams } from "~/types/components";

import DetailIntroduceSkillItem from "./DetailIntroduceSkillItem.vue";

const containerRef = ref<HTMLDivElement | null>(null);
const itemRefs = ref<Map<string, InstanceType<typeof DetailIntroduceSkillItem>>>(new Map());
const itemPositions = ref<Map<string, ItemParams>>(new Map());
const itemInstances = ref<Map<string, Matter.Body>>(new Map());
const smootherRef = ref<ScrollSmoother | null>(ScrollSmoother.get() || null);

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

	runner = Runner.create();

	// 创建地面
	const ground = Bodies.rectangle(width / 2, height + 15, width, 30, {
		isStatic: true,
		render: { fillStyle: "rgba(0, 0, 0, 0)" },
	});

	// 创建墙壁
	const leftWall = Bodies.rectangle(-15, height / 2, 30, height, {
		isStatic: true,
		render: { fillStyle: "rgba(0, 0, 0, 0)" },
	});

	const rightWall = Bodies.rectangle(width + 15, height / 2, 30, height, {
		isStatic: true,
		render: { fillStyle: "rgba(0, 0, 0, 0)" },
	});

	createItems();
	World.add(engine.world, [ground, leftWall, rightWall]);
	World.add(engine.world, Array.from(itemInstances.value.values()));
	World.add(engine.world, mouseConstraint);

	Render.run(render);
	Runner.run(runner, engine);
};

const createItems = () => {
	if (!containerRef.value) return;
	const width = containerRef.value.clientWidth;

	skills.forEach((skill, index) => {
		const x = itemPositions.value.get(`${skill}Item`)?.x ?? Math.random() * width;
		const y = itemPositions.value.get(`${skill}Item`)?.y ?? Math.random() * -100;
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

	Matter.Events.on(engine, "beforeUpdate", () => {
		if (!smootherRef.value) return;
		const speed = smootherRef.value.getVelocity() / 2000;
		itemInstances.value.forEach(item => {
			Matter.Body.setVelocity(item, { x: item.velocity.x, y: (item.velocity.y -= speed) });
		});
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
}
</style>
