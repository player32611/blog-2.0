<script setup lang="ts">
const props = defineProps({
	code: { type: String, default: "" },
	language: { type: String, default: null },
	filename: { type: String, default: null },
	highlights: { type: Array, default: () => [] },
	meta: { type: String, default: null },
	class: { type: String, default: null },
});

const copied = ref(false);

const copyCode = async () => {
	await navigator.clipboard.writeText(props.code);
	copied.value = true;
	setTimeout(() => (copied.value = false), 2000);
};
</script>

<template>
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
			<button class="copy_btn" @click="copyCode">
				<span>
					<svg
						xml:space="preserve"
						style="enable-background: new 0 0 512 512"
						viewBox="0 0 6.35 6.35"
						y="0"
						x="0"
						height="20"
						width="20"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						class="clipboard"
					>
						<g>
							<path
								fill="currentColor"
								d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"
							></path>
						</g>
					</svg>
					<svg
						xml:space="preserve"
						style="enable-background: new 0 0 512 512"
						viewBox="0 0 24 24"
						y="0"
						x="0"
						height="18"
						width="18"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						class="checkmark"
					>
						<g>
							<path
								data-original="#000000"
								fill="currentColor"
								d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
							></path>
						</g>
					</svg>
				</span>
			</button>
			<pre :class="$props.class"><slot /></pre>
		</div>
	</div>
</template>

<style scoped lang="scss">
$base-size: 1;

.custom_pre_wrapper {
	position: relative;
	margin: 1rem * $base-size 0;
	padding: 1rem * $base-size;
	border-width: 0.2rem * $base-size;
	border-style: solid;
	border-color: #ffffff;
	border-radius: 10px;
	background-color: #000;

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
		position: relative;
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
				color: #ffffff;
				white-space: pre-wrap;
			}
		}

		.copy_btn {
			/* button */
			--button-bg: #353434;
			--button-hover-bg: #464646;
			--button-text-color: #cccccc;
			--button-hover-text-color: #8bb9fe;
			--button-border-radius: 10px;
			--button-diameter: 36px;
			--button-outline-width: 1px;
			--button-outline-color: rgb(141, 141, 141);
			/* tooltip */
			--tooltip-bg: #f4f3f3;
			--toolptip-border-radius: 4px;
			--tooltip-font-family: Menlo, Roboto Mono, monospace;
			/* 👆 this field should not be empty */
			--tooltip-font-size: 12px;
			/* 👆 this field should not be empty */
			--tootip-text-color: rgb(50, 50, 50);
			--tooltip-padding-x: 7px;
			--tooltip-padding-y: 7px;
			--tooltip-offset: 8px;
			// --tooltip-transition-duration: 0.3s;
			/* 👆 if you need a transition, 
      just remove the comment,
      but I didn't like the transition :| */

			& {
				position: absolute;
				top: 0.5rem;
				right: 0.5rem;
				box-sizing: border-box;
				width: var(--button-diameter);
				height: var(--button-diameter);
				border-radius: var(--button-border-radius);
				background-color: var(--button-bg);
				color: var(--button-text-color);
				border: none;
				opacity: 0;
				outline: none;
				cursor: pointer;
				transition: opacity 0.2s;
				transform: translateX(0%);
			}

			&:hover {
				background-color: var(--button-hover-bg);

				svg {
					color: var(--button-hover-text-color);
				}
			}

			&:focus {
				background-color: var(--button-hover-bg);
			}

			&:active {
				outline: var(--button-outline-width) solid var(--button-outline-color);
			}

			&:focus:not(:focus-visible) {
				.clipboard {
					display: none;
				}

				.checkmark {
					display: block;
				}
			}

			svg {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}

			.checkmark {
				display: none;
			}
		}
	}

	&:hover {
		.copy_btn {
			opacity: 1;
		}
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.6;

	.custom_pre_wrapper {
		margin: 1rem * $base-size 0;
		padding: 1rem * $base-size;
		border-width: 0.2rem * $base-size;
		border-radius: 10px;

		.mac_header {
			margin-bottom: 1rem * $base-size;

			.points,
			.language {
				gap: 0.5rem * $base-size;
				font-size: 0.9rem * $base-size;
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

			&::-webkit-scrollbar {
				height: 0.3rem * $base-size;
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.8;

	.custom_pre_wrapper {
		margin: 1rem * $base-size 0;
		padding: 1rem * $base-size;
		border-width: 0.2rem * $base-size;
		border-radius: 10px;

		.mac_header {
			margin-bottom: 1rem * $base-size;

			.points,
			.language {
				gap: 0.5rem * $base-size;
				font-size: 0.9rem * $base-size;

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

			&::-webkit-scrollbar {
				height: 0.3rem * $base-size;
			}
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.9;

	.custom_pre_wrapper {
		margin: 1rem * $base-size 0;
		padding: 1rem * $base-size;
		border-width: 0.2rem * $base-size;
		border-radius: 10px;

		.mac_header {
			margin-bottom: 1rem * $base-size;

			.points,
			.language {
				gap: 0.5rem * $base-size;
				font-size: 0.9rem * $base-size;

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

			&::-webkit-scrollbar {
				height: 0.3rem * $base-size;
			}
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 1;

	.custom_pre_wrapper {
		margin: 1rem * $base-size 0;
		padding: 1rem * $base-size;
		border-width: 0.2rem * $base-size;
		border-radius: 10px;

		.mac_header {
			margin-bottom: 1rem * $base-size;

			.points,
			.language {
				gap: 0.5rem * $base-size;
				font-size: 0.9rem * $base-size;

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

			&::-webkit-scrollbar {
				height: 0.3rem * $base-size;
			}
		}
	}
}
</style>
