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

import vertexShader from "@/assets/shaders/Snowy.vert?raw";
import fragmentShader from "@/assets/shaders/Snowy.frag?raw";

const canvasRef = ref<HTMLCanvasElement | null>(null);

let scene: Scene;
let camera: OrthographicCamera;
let renderer: WebGLRenderer;
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
	animationId = requestAnimationFrame(animate);

	if (material.uniforms.uTime) material.uniforms.uTime.value = performance.now() / 1000;

	renderer.render(scene, camera);
};

onMounted(() => {
	if (canvasRef.value) {
		scene = new Scene();

		camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

		renderer = new WebGLRenderer({
			canvas: canvasRef.value!,
			antialias: true,
			alpha: true,
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(window.innerWidth, window.innerHeight);

		material = new ShaderMaterial({
			uniforms: {
				uTime: { value: 0 },
				uResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
				uMirror: { value: 1 },
			},
			vertexShader,
			fragmentShader,
		});

		const geometry = new PlaneGeometry(2, 2);
		const mesh = new Mesh(geometry, material);

		scene.add(mesh);
	}

	window.addEventListener("resize", resize);

	animate();
});

onUnmounted(() => {
	cancelAnimationFrame(animationId);

	window.removeEventListener("resize", resize);

	material.dispose();
	renderer.dispose();
});
</script>

<template>
	<canvas class="game_shader" ref="canvasRef"></canvas>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.game_shader {
	position: absolute;
	height: 100%;
	width: 100%;
	z-index: variables.$background_zIndex;
}
</style>
