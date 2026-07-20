<script setup lang="ts">
import Matter from "matter-js";
import type {
	Engine as EngineType,
	Render as RenderType,
	Runner as RunnerType,
	Mouse as MouseType,
	MouseConstraint as MouseConstraintType,
} from "matter-js";
import type { ItemParams } from "~/types/components";

import ItemEarbudCaseCard from "./ItemCard/ItemEarbudCaseCard.vue";
import ItemEarthCard from "./ItemCard/ItemEarthCard.vue";
import ItemPhoneCard from "./ItemCard/ItemPhoneCard.vue";
import ItemSwitchCard from "./ItemCard/ItemSwitchCard.vue";
import ItemUNOChangeColorCard from "./ItemCard/ItemUNOChangeColorCard.vue";

import ItemBookConstraint from "./ItemBookConstraint.vue";
import ItemMagnetConstraint from "./ItemMagnetConstraint.vue";

const { Constraint, Engine, Render, World, Bodies, Mouse, MouseConstraint, Runner } = Matter;

const itemStore = useItemStore();
const containerRef = ref<HTMLDivElement>();
const ItemBookConstraintRef = ref<InstanceType<typeof ItemBookConstraint> | null>(null);
const ItemEarbudCaseCardRef = ref<InstanceType<typeof ItemEarbudCaseCard> | null>(null);
const ItemEarthCardRef = ref<InstanceType<typeof ItemEarthCard> | null>(null);
const ItemMagnetConstraintRef = ref<InstanceType<typeof ItemMagnetConstraint> | null>(null);
const ItemPhoneCardRef = ref<InstanceType<typeof ItemPhoneCard> | null>(null);
const ItemSwitchCardRef = ref<InstanceType<typeof ItemSwitchCard> | null>(null);
const ItemUNOChangeColorCardRef = ref<InstanceType<typeof ItemUNOChangeColorCard> | null>(null);
const itemPositions = ref<Map<string, ItemParams>>(new Map());
const items = ref<Map<string, Matter.Body>>(new Map());

let engine: EngineType;
let render: RenderType;
let runner: RunnerType;
let mouse: MouseType;
let mouseConstraint: MouseConstraintType;

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
	engine = Engine.create({
		enableSleeping: true,
	});

	// 创建渲染器
	render = Render.create({
		element: containerRef.value,
		engine: engine,
		options: {
			width,
			height,
			background: "transparent",
			wireframes: false,
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
	const ground = Bodies.rectangle(width / 2, height + 30, width, 60, { isStatic: true });

	// 创建墙壁
	const leftWall = Bodies.rectangle(-30, height / 2, 60, height, { isStatic: true });
	const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height, { isStatic: true });

	createConstraints();
	createCards();

	World.add(engine.world, [ground, leftWall, rightWall]);
	World.add(engine.world, mouseConstraint);
	World.add(engine.world, Array.from(items.value.values()));

	// 启动渲染器和物理引擎
	Render.run(render);
	Runner.run(runner, engine);
};

const createConstraints = () => {
	if (!containerRef.value) return;

	const width = containerRef.value.clientWidth;

	// 创建悬挂物体）
	let magnetConstraint: Matter.Body | null = null;
	if (ItemMagnetConstraintRef.value) {
		const x = itemPositions.value.get("ItemMagnetConstraint")?.x ?? width / 3;
		const y = itemPositions.value.get("ItemMagnetConstraint")?.y ?? 120;
		const angle = itemPositions.value.get("ItemMagnetConstraint")?.angle ?? 0;
		magnetConstraint = ItemMagnetConstraintRef.value.createItem(x, y, angle);
		if (magnetConstraint) items.value.set("ItemMagnetConstraint", magnetConstraint);
	}
	let bookConstraint: Matter.Body | null = null;
	if (ItemBookConstraintRef.value) {
		const x = itemPositions.value.get("ItemBookConstraint")?.x ?? (width / 3) * 2;
		const y = itemPositions.value.get("ItemBookConstraint")?.y ?? 120;
		const angle = itemPositions.value.get("ItemBookConstraint")?.angle ?? 0;
		bookConstraint = ItemBookConstraintRef.value.createItem(x, y, angle);
		if (bookConstraint) items.value.set("ItemBookConstraint", bookConstraint);
	}

	// 创建绳子约束（连接悬挂点和物体）
	let ropes: Matter.Constraint[] = [];
	if (magnetConstraint) {
		ropes.push(
			Constraint.create({
				pointA: { x: width / 3, y: 0 },
				bodyB: magnetConstraint, // 被悬挂的物体
				length: 120, // 绳子长度
				stiffness: 0.1, // 刚度（接近1表示更像刚性杆，较低值更像弹性绳）
				render: {
					strokeStyle: "#d5ad72", // 绳子颜色
				},
			}),
		);
	}
	if (bookConstraint) {
		ropes.push(
			Constraint.create({
				pointA: { x: (width / 3) * 2, y: 0 },
				bodyB: bookConstraint, // 被悬挂的物体
				length: 120, // 绳子长度
				stiffness: 0.1, // 刚度（接近1表示更像刚性杆，较低值更像弹性绳）
				render: {
					strokeStyle: "#d5ad72", // 绳子颜色
				},
			}),
		);
	}
	// 将物体和约束添加到世界
	World.add(engine.world, ropes);
};

const createCards = () => {
	if (ItemEarbudCaseCardRef.value) {
		const x = itemPositions.value.get("ItemEarbudCaseCard")?.x ?? Math.random() * window.innerWidth;
		const y = itemPositions.value.get("ItemEarbudCaseCard")?.y ?? Math.random() * -100;
		const angle = itemPositions.value.get("ItemEarbudCaseCard")?.angle ?? Math.random() * 360;
		const item = ItemEarbudCaseCardRef.value.createItem(x, y, angle);
		if (item) items.value.set("ItemEarbudCaseCard", item);
	}
	if (ItemEarthCardRef.value) {
		const x = itemPositions.value.get("ItemEarthCard")?.x ?? Math.random() * window.innerWidth;
		const y = itemPositions.value.get("ItemEarthCard")?.y ?? Math.random() * -100;
		const angle = itemPositions.value.get("ItemEarthCard")?.angle ?? Math.random() * 360;
		const item = ItemEarthCardRef.value.createItem(x, y, angle);
		if (item) items.value.set("ItemEarthCard", item);
	}
	if (ItemSwitchCardRef.value) {
		const x = itemPositions.value.get("ItemSwitchCard")?.x ?? Math.random() * window.innerWidth;
		const y = itemPositions.value.get("ItemSwitchCard")?.y ?? Math.random() * -100;
		const angle = itemPositions.value.get("ItemSwitchCard")?.angle ?? Math.random() * 360;
		const item = ItemSwitchCardRef.value.createItem(x, y, angle);
		if (item) items.value.set("ItemSwitchCard", item);
	}
	if (ItemPhoneCardRef.value) {
		const x = itemPositions.value.get("ItemPhoneCard")?.x ?? Math.random() * window.innerWidth;
		const y = itemPositions.value.get("ItemPhoneCard")?.y ?? Math.random() * -100;
		const angle = itemPositions.value.get("ItemPhoneCard")?.angle ?? Math.random() * 360;
		const item = ItemPhoneCardRef.value.createItem(x, y, angle);
		if (item) items.value.set("ItemPhoneCard", item);
	}
	if (ItemUNOChangeColorCardRef.value) {
		const x =
			itemPositions.value.get("ItemUNOChangeColorCard")?.x ?? Math.random() * window.innerWidth;
		const y = itemPositions.value.get("ItemUNOChangeColorCard")?.y ?? Math.random() * -100;
		const angle = itemPositions.value.get("ItemUNOChangeColorCard")?.angle ?? Math.random() * 360;
		const item = ItemUNOChangeColorCardRef.value.createItem(x, y, angle);
		if (item) items.value.set("ItemUNOChangeColorCard", item);
	}
};

const handleUpdate = () => {
	Matter.Events.on(mouseConstraint, "startdrag", () => {
		if (containerRef.value) containerRef.value.style.cursor = "grabbing";
	});

	Matter.Events.on(mouseConstraint, "enddrag", () => {
		if (containerRef.value) containerRef.value.style.cursor = "pointer";
	});

	Matter.Events.on(engine, "afterUpdate", () => {
		if (!containerRef.value) return;
		const width = containerRef.value.clientWidth;
		const height = containerRef.value.clientHeight;

		items.value.forEach((item, key) => {
			itemPositions.value?.set(key, {
				x: item.position.x,
				y: item.position.y,
				angle: item.angle,
			});
			if (item.position.y > height + 100) {
				Matter.Body.setPosition(item, { x: width / 2, y: -100 });
				Matter.Body.setVelocity(item, { x: 0, y: 0 });
			}
			if (key === "ItemMagnetConstraint" && item.velocity.y < -10)
				itemStore.toggleShowingCommandBar();
			else if (key === "ItemBookConstraint" && item.velocity.y < -10)
				itemStore.toggleShowingGuide();
		});
	});
};

watch(
	() => itemStore.currentCommand,
	command => {
		if (!command.length) return;
		const char = command.split(" ");
		switch (char[0]?.toLowerCase()) {
			case "add":
				const addItemName = char[1] || "";
				if (items.value.has(addItemName)) return;
				let item: Matter.Body | null = null;
				switch (addItemName) {
					case "ItemEarbudCaseCard":
						if (ItemEarbudCaseCardRef.value)
							item = ItemEarbudCaseCardRef.value.createItem(
								Math.random() * window.innerWidth,
								Math.random() * -100,
								Math.random() * 360,
							);
						break;
					case "ItemEarthCard":
						if (ItemEarthCardRef.value)
							item = ItemEarthCardRef.value.createItem(
								Math.random() * window.innerWidth,
								Math.random() * -100,
								Math.random() * 360,
							);
						break;
					case "ItemSwitchCard":
						if (ItemSwitchCardRef.value)
							item = ItemSwitchCardRef.value.createItem(
								Math.random() * window.innerWidth,
								Math.random() * -100,
								Math.random() * 360,
							);
						break;
					case "ItemPhoneCard":
						if (ItemPhoneCardRef.value)
							item = ItemPhoneCardRef.value.createItem(
								Math.random() * window.innerWidth,
								Math.random() * -100,
								Math.random() * 360,
							);
						break;
					case "ItemUNOChangeColorCard":
						if (ItemUNOChangeColorCardRef.value)
							item = ItemUNOChangeColorCardRef.value.createItem(
								Math.random() * window.innerWidth,
								Math.random() * -100,
								Math.random() * 360,
							);
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
	<div ref="containerRef" class="item_container"></div>

	<ItemEarbudCaseCard
		:x="itemPositions.get('ItemEarbudCaseCard')?.x ?? 0"
		:y="itemPositions.get('ItemEarbudCaseCard')?.y ?? 0"
		:angle="itemPositions.get('ItemEarbudCaseCard')?.angle ?? 0"
		:visible="itemPositions.has('ItemEarbudCaseCard')"
		ref="ItemEarbudCaseCardRef"
	/>
	<ItemEarthCard
		:x="itemPositions.get('ItemEarthCard')?.x ?? 0"
		:y="itemPositions.get('ItemEarthCard')?.y ?? 0"
		:angle="itemPositions.get('ItemEarthCard')?.angle ?? 0"
		:visible="itemPositions.has('ItemEarthCard')"
		ref="ItemEarthCardRef"
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
	<ItemUNOChangeColorCard
		:x="itemPositions.get('ItemUNOChangeColorCard')?.x ?? 0"
		:y="itemPositions.get('ItemUNOChangeColorCard')?.y ?? 0"
		:angle="itemPositions.get('ItemUNOChangeColorCard')?.angle ?? 0"
		:visible="itemPositions.has('ItemUNOChangeColorCard')"
		ref="ItemUNOChangeColorCardRef"
	/>

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
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.item_container {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	z-index: variables.$float_zIndex;
	cursor: pointer;
}
</style>
