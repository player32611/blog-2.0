<script setup lang="ts">
import gsap from "gsap";
import { ScrambleTextPlugin, TextPlugin } from "gsap/all";

gsap.registerPlugin(ScrambleTextPlugin, TextPlugin);

const containerRef = ref<HTMLDivElement | null>(null);
const line1Ref = ref<HTMLDivElement | null>(null);
const line2Ref = ref<HTMLDivElement | null>(null);
const line3Ref = ref<HTMLDivElement | null>(null);
const appearAnim = ref<GSAPTween | null>(null);
const codingAnim = ref<GSAPTimeline | null>(null);

const appearDelay = 7;
const appearDuration = 1;
const codingLineDelay = 0.5;
const singleCharDuration = 0.1;

const language: string = "html";
const code1: string[] = ["<span class='box'>", "<span class='word'>text</span>", "</span>"];
const code2: string[] = ["<div class='box'>", "<div class='title'>Title</div>", "</div>"];

const createCodingAnim = () => {
	const currentCode = Math.random() > 0.5 ? code1 : code2;
	if (!currentCode[0] || !currentCode[1] || !currentCode[2]) return;
	codingAnim.value = gsap
		.timeline({
			yoyo: true,
			repeat: -1,
			repeatDelay: codingLineDelay,
		})
		.to(line1Ref.value, {
			scrambleText: { text: currentCode[0] },
			ease: "none",
			duration: singleCharDuration * currentCode[0].length,
			delay: codingLineDelay,
		})
		.to(line2Ref.value, {
			scrambleText: { text: currentCode[1] },
			ease: "none",
			duration: singleCharDuration * currentCode[1].length,
			delay: codingLineDelay,
		})
		.to(line3Ref.value, {
			scrambleText: { text: currentCode[2] },
			ease: "none",
			duration: singleCharDuration * currentCode[2].length,
			delay: codingLineDelay,
		});
};

onMounted(() => {
	appearAnim.value = gsap.fromTo(
		containerRef.value,
		{ height: 0 },
		{
			height: "auto",
			ease: "power2.out",
			duration: appearDuration,
			delay: appearDelay,
			onComplete: createCodingAnim,
		},
	);
});

onUnmounted(() => {
	if (appearAnim.value) appearAnim.value.kill();
	if (codingAnim.value) codingAnim.value.kill();
});
</script>

<template>
	<div class="title_code_container" ref="containerRef">
		<div class="custom_pre_wrapper">
			<div class="mac_header">
				<div class="points">
					<span class="red"></span>
					<span class="yellow"></span>
					<span class="green"></span>
				</div>
				<div class="language">
					<span
						class="icon"
						v-html="getLangIcon(language)"
						:style="{ color: getLangIconColor(language) }"
					></span>
					{{ language }}
				</div>
			</div>
			<div class="code_editor">
				<div ref="preRef">
					<div class="line1" ref="line1Ref"></div>
					<div class="line2" ref="line2Ref"></div>
					<div class="line3" ref="line3Ref"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
$base-size: 1;

.title_code_container {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;

	&::after {
		--m-i: linear-gradient(#000, #000);
		--m-o: content-box, padding-box;
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		width: calc(100% - 10px);
		height: calc(100% - 10px);
		padding: 5px;
		border-radius: 5px;
		background-image: conic-gradient(#488cfb, #29dbbc, #ddf505, #ff9f0e, #e440bb, #655adc, #488cfb);
		-webkit-mask-image: var(--m-i), var(--m-i);
		mask-image: var(--m-i), var(--m-i);
		-webkit-mask-origin: var(--m-o);
		mask-origin: var(--m-o);
		-webkit-mask-clip: var(--m-o);
		mask-clip: var(--m-o);
		mask-composite: exclude;
		-webkit-mask-composite: destination-out;
		filter: hue-rotate(0);
		animation: rotate-hue linear 2s infinite;
	}

	.custom_pre_wrapper {
		position: relative;
		width: 300px * $base-size;
		padding: 1rem * $base-size;
		border-radius: 10px;
		background-color: #000;
		overflow: hidden;

		.mac_header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 1rem * $base-size;

			.points,
			.language {
				display: flex;
				align-items: center;
				gap: 0.5rem * $base-size;
				font-size: 1rem;
				font-family: "方正基础像素体";
				color: #ffffff;

				span {
					float: left;
					width: 0.7rem * $base-size;
					height: 0.7rem * $base-size;
					border-radius: 50%;
				}
			}

			.red {
				background-color: #ff5f57;
			}

			.yellow {
				background-color: #ffbd2e;
			}

			.green {
				background-color: #28c941;
			}
		}

		.code_editor {
			padding: 1rem * $base-size;
			color: #dcdcdc;
			font-family:
				system-ui,
				-apple-system,
				BlinkMacSystemFont,
				"Segoe UI",
				Roboto,
				Oxygen,
				Ubuntu,
				Cantarell,
				"Open Sans",
				"Helvetica Neue",
				monospace;
			font-size: 0.9rem * $base-size;
			line-height: 1.5;
			background-color: #0d1117;
			border-width: 0.1rem * $base-size;
			border-style: solid;
			border-color: #333;
			border-radius: 5px;
			overflow: auto;

			&::-webkit-scrollbar {
				height: 4px;
				width: 8px;
			}

			&::-webkit-scrollbar-thumb {
				background: #555;
				border-radius: 4px;
			}

			pre {
				code {
					display: block;
					height: auto;
					width: auto;
					color: #ffffff;
					white-space: pre-wrap;
				}
			}

			.line2 {
				text-indent: 2rem;
			}
		}
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.6;

	.title_code_container {
		&::after {
			width: calc(100% - 10px * $base-size);
			height: calc(100% - 10px * $base-size);
			padding: 5px * $base-size;
			border-radius: 5px * $base-size;
		}

		.custom_pre_wrapper {
			width: 300px * $base-size;
			padding: 1rem * $base-size;
			border-radius: 10px * $base-size;

			.mac_header {
				margin-bottom: 1rem * $base-size;

				.points,
				.language {
					gap: 0.5rem * $base-size;
					font-size: 1rem * $base-size;

					span {
						width: 0.7rem * $base-size;
						height: 0.7rem * $base-size;
					}
				}
			}

			.code_editor {
				padding: 1rem * $base-size;
				font-size: 0.9rem * $base-size;
				border-width: 0.1rem * $base-size;
				border-radius: 5px * $base-size;

				.line2 {
					text-indent: 2rem * $base-size;
				}
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.8;

	.title_code_container {
		&::after {
			width: calc(100% - 10px * $base-size);
			height: calc(100% - 10px * $base-size);
			padding: 5px * $base-size;
			border-radius: 5px * $base-size;
		}

		.custom_pre_wrapper {
			width: 300px * $base-size;
			padding: 1rem * $base-size;
			border-radius: 10px * $base-size;

			.mac_header {
				margin-bottom: 1rem * $base-size;

				.points,
				.language {
					gap: 0.5rem * $base-size;
					font-size: 1rem * $base-size;

					span {
						width: 0.7rem * $base-size;
						height: 0.7rem * $base-size;
					}
				}
			}

			.code_editor {
				padding: 1rem * $base-size;
				font-size: 0.9rem * $base-size;
				border-width: 0.1rem * $base-size;
				border-radius: 5px * $base-size;

				.line2 {
					text-indent: 2rem * $base-size;
				}
			}
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.6;

	.title_code_container {
		&::after {
			width: calc(100% - 10px * $base-size);
			height: calc(100% - 10px * $base-size);
			padding: 5px * $base-size;
			border-radius: 5px * $base-size;
		}

		.custom_pre_wrapper {
			width: 300px * $base-size;
			padding: 1rem * $base-size;
			border-radius: 10px * $base-size;

			.mac_header {
				margin-bottom: 1rem * $base-size;

				.points,
				.language {
					gap: 0.5rem * $base-size;
					font-size: 1rem * $base-size;

					span {
						width: 0.7rem * $base-size;
						height: 0.7rem * $base-size;
					}
				}
			}

			.code_editor {
				padding: 1rem * $base-size;
				font-size: 0.9rem * $base-size;
				border-width: 0.1rem * $base-size;
				border-radius: 5px * $base-size;

				.line2 {
					text-indent: 2rem * $base-size;
				}
			}
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 0.6;

	.title_code_container {
		&::after {
			width: calc(100% - 10px * $base-size);
			height: calc(100% - 10px * $base-size);
			padding: 5px * $base-size;
			border-radius: 5px * $base-size;
		}

		.custom_pre_wrapper {
			width: 300px * $base-size;
			padding: 1rem * $base-size;
			border-radius: 10px * $base-size;

			.mac_header {
				margin-bottom: 1rem * $base-size;

				.points,
				.language {
					gap: 0.5rem * $base-size;
					font-size: 1rem * $base-size;

					span {
						width: 0.7rem * $base-size;
						height: 0.7rem * $base-size;
					}
				}
			}

			.code_editor {
				padding: 1rem * $base-size;
				font-size: 0.9rem * $base-size;
				border-width: 0.1rem * $base-size;
				border-radius: 5px * $base-size;

				.line2 {
					text-indent: 2rem * $base-size;
				}
			}
		}
	}
}

@keyframes rotate-hue {
	to {
		filter: hue-rotate(1turn);
	}
}
</style>
