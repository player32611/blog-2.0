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

let renderer: WebGLRenderer;
let scene: Scene;
let camera: OrthographicCamera;
let material: ShaderMaterial;
let animationId = 0;

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

	if (material.uniforms.uTime) material.uniforms.uTime.value = performance.now() / 1000;

	renderer.render(scene, camera);
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

watch(
	() => detailStore.shaderType,
	newState => {
		if (material) material.dispose();
		if (renderer) renderer.dispose();
		switch (newState) {
			case "VCR distortion":
				createShader();
				animate();
				break;
			default:
				cancelAnimationFrame(animationId);
				break;
		}
	},
);

onMounted(() => {
	window.addEventListener("resize", resize);
});

onUnmounted(() => {
	cancelAnimationFrame(animationId);
	window.removeEventListener("resize", resize);
	if (material) material.dispose();
	if (renderer) renderer.dispose();
});
</script>

<template>
	<canvas class="detail_shader" ref="canvasRef"></canvas>
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
