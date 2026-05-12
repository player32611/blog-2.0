<script setup lang="ts">
import gsap from "gsap";

const itemStore = useItemStore();
const barRef = ref<HTMLDivElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);

const handleKeyboardEvent = (e: KeyboardEvent) => {
	if (e.key === "Enter" && inputRef.value && inputRef.value.value) {
		itemStore.setCurrentCommand(inputRef.value.value);
		inputRef.value.value = "";
	}
};

watch(
	() => itemStore.showingCommandBar,
	newValue => {
		if (newValue) {
			gsap.to(barRef.value, { bottom: "5px", duration: 0.5, ease: "back.out" });
		} else {
			gsap.to(barRef.value, { bottom: "-70px", duration: 0.5, ease: "power1.out" });
			inputRef.value?.blur();
		}
	},
);
</script>

<template>
	<!-- From Uiverse.io by chase2k25 -->
	<div class="item_command_bar" ref="barRef">
		<input
			placeholder=""
			class="command_input"
			type="text"
			ref="inputRef"
			@keyup="handleKeyboardEvent"
		/>
		<label class="hacker-label">命令行</label>
	</div>
</template>

<style scoped lang="scss">
/* From Uiverse.io by chase2k25 */
.item_command_bar {
	position: fixed;
	bottom: -70px;
	margin: 0 10px;
	width: calc(100% - 10px * 2);

	&::after {
		content: "_";
		position: absolute;
		right: 15px;
		top: 50%;
		color: #ff7f27;
		font-size: 20px;
		transform: translateY(-50%);
		animation: blink 0.7s infinite;
	}

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background: rgba(#ff7f27, 0.3);
		animation: scanline 2s infinite linear;
	}

	.command_input {
		padding: 12px 15px;
		width: calc(100% - 2px * 2 - 15px * 2);
		color: #ff7f27;
		font-family: "方正基础像素体";
		font-size: 16px;
		background: rgba(#ff7f27, 0.05);
		border: 2px solid #ff7f27;
		outline: none;
		transition: all 0.3s ease;

		&:focus {
			background: #000000;
			box-shadow: 0 0 10px #ff7f27;
		}

		&::placeholder {
			color: #ff7f27;
			opacity: 0.7;
		}
	}

	.hacker-label {
		position: absolute;
		top: 50%;
		left: 15px;
		color: #ff7f27;
		font-size: 16px;
		font-family: "方正基础像素体";
		text-shadow: 0 0 5px #ff7f27;
		pointer-events: none;
		transform: translateY(-50%);
		transition: all 0.3s ease;
	}

	.command_input:focus + .hacker-label,
	.command_input:not(:placeholder-shown) + .hacker-label {
		top: -10px;
		left: 10px;
		padding: 0 5px;
		font-size: 12px;
		background: #0a0a0a;
	}
}

@keyframes blink {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0;
	}
}

@keyframes scanline {
	0% {
		top: 0;
	}
	50% {
		top: calc(100% - 2px);
	}
	100% {
		top: calc(100% - 2px);
	}
}

@keyframes glitch {
	0% {
		transform: translate(0);
	}
	20% {
		transform: translate(-2px, 2px);
	}
	40% {
		transform: translate(2px, -2px);
	}
	60% {
		transform: translate(-2px, 0);
	}
	80% {
		transform: translate(2px, 0);
	}
	100% {
		transform: translate(0);
	}
}
</style>
