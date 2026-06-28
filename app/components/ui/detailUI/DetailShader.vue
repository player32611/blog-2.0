<script setup lang="ts">
import {
	Scene,
	OrthographicCamera,
	WebGLRenderer,
	ShaderMaterial,
	Vector2,
	Mesh,
	PlaneGeometry,
} from "three";

import vertexShader from "@/assets/shaders/VCR_distortion.vert?raw";
import fragmentShader from "@/assets/shaders/VCR_distortion.frag?raw";

const detailStore = useDetailStore();
const canvasRef = ref<HTMLCanvasElement | null>(null);

let renderer: WebGLRenderer | null = null;
let scene: Scene | null = null;
let camera: OrthographicCamera | null = null;
let material: ShaderMaterial | null = null;
let animationId: number | null = 0;

const resize = () => {
	if (!renderer || !material) return;

	const width = window.innerWidth;
	const height = window.innerHeight;

	renderer.setSize(width, height);

	if (material.uniforms.uResolution) material.uniforms.uResolution.value.set(width, height);
};

const animate = () => {
	console.log("anim");
	animationId = requestAnimationFrame(animate);

	if (material && material.uniforms.uTime) material.uniforms.uTime.value = performance.now() / 1000;
	if (renderer && scene && camera) renderer.render(scene, camera);
};

const createShader = () => {
	if (!canvasRef.value) return;

	renderer = new WebGLRenderer({
		canvas: canvasRef.value,
		alpha: true,
		antialias: true,
	});
	renderer.setClearColor(0x000000, 0);
	renderer.setSize(window.innerWidth, window.innerHeight);

	scene = new Scene();

	camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

	material = new ShaderMaterial({
		transparent: true,
		depthWrite: false,
		depthTest: false,
		uniforms: {
			uTime: {
				value: 0,
			},
			uResolution: {
				value: new Vector2(),
			},
			uIntensity: {
				value: 1.0,
			},
		},
		vertexShader,
		fragmentShader,
	});

	scene.add(new Mesh(new PlaneGeometry(2, 2), material));
};

const clearShader = () => {
	if (animationId) {
		cancelAnimationFrame(animationId);
		animationId = null;
	}

	if (material) {
		material.dispose();
		material = null;
	}

	if (renderer) {
		renderer.dispose();
		renderer = null;
	}
};

watch(
	() => detailStore.shaderType,
	newState => {
		clearShader();
		switch (newState) {
			case "VCR distortion":
				createShader();
				animate();
				break;
			default:
				break;
		}
	},
);

onMounted(() => {
	window.addEventListener("resize", resize);
});

onUnmounted(() => {
	clearShader();
	window.removeEventListener("resize", resize);
});
</script>

<template>
	<canvas class="detail_shader" ref="canvasRef" v-show="detailStore.shaderType !== 'none'"></canvas>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.detail_shader {
	position: fixed;
	height: 100vh;
	width: 100vw;
	z-index: variables.$loading_zIndex - 10;
	pointer-events: none;
}
</style>
