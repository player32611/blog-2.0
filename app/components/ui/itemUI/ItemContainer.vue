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

import ItemBookConstraint from "./ItemBookConstraint.vue";
import ItemMagnetConstraint from "./ItemMagnetConstraint.vue";
import ItemPhoneCard from "./ItemPhoneCard.vue";
import ItemSwitchCard from "./ItemSwitchCard.vue";

const itemStore = useItemStore();
const containerRef = ref<HTMLDivElement>();
const ItemBookConstraintRef = ref<InstanceType<typeof ItemBookConstraint> | null>(null);
const ItemMagnetConstraintRef = ref<InstanceType<typeof ItemMagnetConstraint> | null>(null);
const ItemPhoneCardRef = ref<InstanceType<typeof ItemPhoneCard> | null>(null);
const ItemSwitchCardRef = ref<InstanceType<typeof ItemSwitchCard> | null>(null);
const itemPositions = ref<Map<string, ItemParams>>(new Map());
const items = ref<Map<string, Matter.Body>>(new Map());
let engine: Engine;
let render: Render;
let runner: Runner;
let mouse: Mouse;
let mouseConstraint: MouseConstraint;

const resize = () => {
	World.clear(engine.world, true);
	Render.stop(render);
	Engine.clear(engine);
	containerRef.value?.removeChild(render.canvas);
	init();
	createConstraints();
	createCards();
	World.add(engine.world, Array.from(items.value.values()));

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

	// 创建悬挂物体）
	let magnetConstraint: Matter.Body | null = null;
	if (ItemMagnetConstraintRef.value) {
		magnetConstraint = Bodies.rectangle(
			width / 3,
			120,
			ItemMagnetConstraintRef.value.$el.offsetHeight,
			ItemMagnetConstraintRef.value.$el.offsetWidth * 5,
			{
				restitution: 0.6,
				friction: 0.5,
				render: {
					fillStyle: "rgba(0, 0, 0, 0)",
				},
			},
		);
		items.value.set("ItemMagnetConstraint", magnetConstraint);
	}
	let bookConstraint: Matter.Body | null = null;
	if (ItemBookConstraintRef.value) {
		bookConstraint = Bodies.rectangle(
			(width / 3) * 2,
			120,
			ItemBookConstraintRef.value.$el.offsetWidth,
			ItemBookConstraintRef.value.$el.offsetHeight,
			{
				restitution: 0.6,
				friction: 0.5,
				render: {
					fillStyle: "rgba(0, 0, 0, 0)",
				},
			},
		);
		items.value.set("ItemBookConstraint", bookConstraint);
	}

	// 创建绳子约束（连接悬挂点和物体）
	let ropes: Matter.Constraint[] = [];
	if (magnetConstraint) {
		ropes.push(
			Constraint.create({
				pointA: {
					x: width / 3,
					y: 0,
				},
				bodyB: magnetConstraint, // 被悬挂的物体
				length: 120, // 绳子长度
				stiffness: 0.1, // 刚度（接近1表示更像刚性杆，较低值更像弹性绳）
				render: {
					visible: true, // 可视化绳子（调试时可开启）
					strokeStyle: "#ffffff", // 绳子颜色
					lineWidth: 2,
				},
			}),
		);
	}
	if (bookConstraint) {
		ropes.push(
			Constraint.create({
				pointA: {
					x: (width / 3) * 2,
					y: 0,
				},
				bodyB: bookConstraint, // 被悬挂的物体
				length: 120, // 绳子长度
				stiffness: 0.1, // 刚度（接近1表示更像刚性杆，较低值更像弹性绳）
				render: {
					visible: true, // 可视化绳子（调试时可开启）
					strokeStyle: "#ffffff", // 绳子颜色
					lineWidth: 2,
				},
			}),
		);
	}
	// 将物体和约束添加到世界
	World.add(engine.world, ropes);
};

const createCards = () => {
	if (ItemSwitchCardRef.value) {
		const item = ItemSwitchCardRef.value.createItem();
		if (item) items.value.set("ItemSwitchCard", item);
	}

	if (ItemPhoneCardRef.value) {
		const item = ItemPhoneCardRef.value.createItem();
		if (item) items.value.set("ItemPhoneCard", item);
	}
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
			if (key === "ItemMagnetConstraint" && item.velocity.y < -10) {
				itemStore.toggleShowingCommandBar();
			} else if (key === "ItemBookConstraint" && item.velocity.y < -10) {
				itemStore.toggleShowingGuide();
			}
		});
	});
};

watch(
	() => itemStore.currentCommand,
	command => {
		if (!command.length) return;
		const char = command.split(" ");
		console.log(char[0]?.toLowerCase());
		switch (char[0]?.toLowerCase()) {
			case "add":
				const addItemName = char[1] || "";
				if (items.value.has(addItemName)) return;
				let item: Matter.Body | null = null;
				switch (addItemName) {
					case "ItemSwitchCard":
						if (ItemSwitchCardRef.value) item = ItemSwitchCardRef.value.createItem();
						break;
					case "ItemPhoneCard":
						if (ItemPhoneCardRef.value) item = ItemPhoneCardRef.value.createItem();
						break;
				}
				if (item) {
					items.value.set(addItemName, item);
					World.add(engine.world, item);
				}
				break;
			case "delete":
				const delItemName = char[1] || "";
				const delItem = items.value.get(delItemName);
				if (!delItem) return;
				World.remove(engine.world, delItem);
				items.value.delete(delItemName);
				itemPositions.value.delete(delItemName);
				break;
		}
	},
);

onMounted(() => {
	init();
	createConstraints();
	createCards();
	World.add(engine.world, Array.from(items.value.values()));

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
	<ItemBookConstraint
		:x="itemPositions.get('ItemBookConstraint')?.x ?? 0"
		:y="itemPositions.get('ItemBookConstraint')?.y ?? 0"
		:angle="itemPositions.get('ItemBookConstraint')?.angle ?? 0"
		ref="ItemBookConstraintRef"
	/>
	<ItemMagnetConstraint
		:x="itemPositions.get('ItemMagnetConstraint')?.x ?? 0"
		:y="itemPositions.get('ItemMagnetConstraint')?.y ?? 0"
		:angle="itemPositions.get('ItemMagnetConstraint')?.angle ?? 0"
		ref="ItemMagnetConstraintRef"
	/>
	<ItemPhoneCard
		:x="itemPositions.get('ItemPhoneCard')?.x ?? 0"
		:y="itemPositions.get('ItemPhoneCard')?.y ?? 0"
		:angle="itemPositions.get('ItemPhoneCard')?.angle ?? 0"
		:visible="itemPositions.has('ItemPhoneCard')"
		ref="ItemPhoneCardRef"
	/>
	<ItemSwitchCard
		:x="itemPositions.get('ItemSwitchCard')?.x ?? 0"
		:y="itemPositions.get('ItemSwitchCard')?.y ?? 0"
		:angle="itemPositions.get('ItemSwitchCard')?.angle ?? 0"
		:visible="itemPositions.has('ItemSwitchCard')"
		ref="ItemSwitchCardRef"
	/>
	<div ref="containerRef" class="item_container"></div>
</template>

<style scoped lang="scss">
.item_container {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
}
</style>
