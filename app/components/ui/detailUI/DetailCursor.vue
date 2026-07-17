<script setup lang="ts">
import gsap from "gsap";

const cursorRef = ref<HTMLDivElement | null>(null);
const isOut = ref<boolean>(true);

let setX: Function;
let setY: Function;
const outTime = 0.5; // 离开变化时间（s）

const handleMouseDown = () => {
	gsap.to(cursorRef.value, { scale: 0.8, duration: outTime / 2 });
};

const handleMouseUp = () => {
	gsap.to(cursorRef.value, { scale: 1, duration: outTime / 2 });
};

const handleMouseMove = (event: MouseEvent) => {
	if (!cursorRef.value) return;
	if (isOut.value) {
		gsap.to(cursorRef.value, { scale: 1, opacity: 1, duration: outTime });
		isOut.value = false;
	}
	setX(event.clientX);
	setY(event.clientY);
};

const handleMouseOut = (event: MouseEvent) => {
	if (event.relatedTarget === null && cursorRef.value) {
		gsap.to(cursorRef.value, { scale: 0, opacity: 0, duration: outTime });
		isOut.value = true;
	}
};

onMounted(() => {
	setX = gsap.quickSetter(cursorRef.value, "x", "px");
	setY = gsap.quickSetter(cursorRef.value, "y", "px");
	window.addEventListener("mousedown", handleMouseDown);
	window.addEventListener("mouseup", handleMouseUp);
	window.addEventListener("mousemove", handleMouseMove);
	window.addEventListener("mouseout", handleMouseOut);
});

onUnmounted(() => {
	window.removeEventListener("mousedown", handleMouseDown);
	window.removeEventListener("mouseup", handleMouseUp);
	window.removeEventListener("mousemove", handleMouseMove);
	window.removeEventListener("mouseout", handleMouseOut);
});
</script>

<template>
	<div class="detail_cursor" ref="cursorRef">
		<svg id="soul" data-name="soul" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
			<g id="_soul" data-name="soul">
				<g>
					<rect x="10.5" y="1.5" width="4" height="8" style="fill: red" />
					<path d="M14,2v7h-3V2h3M15,1h-5v9h5V1h0Z" style="fill: red" />
				</g>
				<g>
					<rect x="1.5" y="1.5" width="4" height="8" style="fill: red" />
					<path d="M5,2v7h-3V2h3M6,1H1v9h5V1h0Z" style="fill: red" />
				</g>
				<g>
					<rect x=".5" y="2.5" width="6" height="7" style="fill: red" />
					<path d="M6,3v6H1V3h5M7,2H0v8h7V2h0Z" style="fill: red" />
				</g>
				<g>
					<rect x="9.5" y="2.5" width="6" height="7" style="fill: red" />
					<path d="M15,3v6h-5V3h5M16,2h-7v8h7V2h0Z" style="fill: red" />
				</g>
				<g>
					<rect x="6.5" y="4.5" width="3" height="11" style="fill: red" />
					<path d="M9,5v10h-2V5h2M10,4h-4v12h4V4h0Z" style="fill: red" />
				</g>
				<g>
					<rect x="4.5" y="4.5" width="7" height="9" style="fill: red" />
					<path d="M11,5v8h-6V5h6M12,4H4v10h8V4h0Z" style="fill: red" />
				</g>
				<g>
					<rect x="2.5" y="4.5" width="11" height="7" style="fill: red" />
					<path d="M13,5v6H3v-6h10M14,4H2v8h12V4h0Z" style="fill: red" />
				</g>
				<g>
					<rect x=".5" y="4.5" width="15" height="5" style="fill: red" />
					<path d="M15,5v4H1v-4h14M16,4H0v6h16v-6h0Z" style="fill: red" />
				</g>
				<g>
					<rect x=".5" y="2.5" width="6" height="1" style="fill: red" />
					<polygon points="7 2 0 2 0 4 7 4 7 2 7 2" style="fill: red" />
				</g>
				<g>
					<rect x="1" y="1" width="5" height="1" style="fill: red" />
					<polygon points="6 1 1 1 1 2 6 2 6 1 6 1" style="fill: red" />
				</g>
				<g>
					<rect x="2" width="2" height="1" style="fill: red" />
					<polygon points="4 0 2 0 2 1 4 1 4 0 4 0" style="fill: red" />
				</g>
				<g>
					<rect x="9.5" y="2.5" width="6" height="1" style="fill: red" />
					<polygon points="16 2 9 2 9 4 16 4 16 2 16 2" style="fill: red" />
				</g>
				<g>
					<rect x="10" y="1" width="5" height="1" style="fill: red" />
					<polygon points="15 1 10 1 10 2 15 2 15 1 15 1" style="fill: red" />
				</g>
				<g>
					<rect x="12" width="2" height="1" style="fill: red" />
					<polygon points="14 0 12 0 12 1 14 1 14 0 14 0" style="fill: red" />
				</g>
			</g>
		</svg>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss";

.detail_cursor {
	position: fixed;
	top: 0px;
	left: 0px;
	height: 30px;
	width: 30px;
	opacity: 0;
	z-index: variables.$cursor_zIndex;
	pointer-events: none;

	#soul {
		height: 20px;
		width: 20px;
		rotate: 135deg;
	}
}
</style>
