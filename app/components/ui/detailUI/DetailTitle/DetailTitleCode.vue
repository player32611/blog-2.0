<script setup lang="ts">
import gsap from "gsap";
import { ScrambleTextPlugin, TextPlugin } from "gsap/all";

gsap.registerPlugin(ScrambleTextPlugin, TextPlugin);

const preRef = ref<HTMLDivElement | null>(null);

const codingDuration: number = 3;
const codingInterval: number = 1;
const language: string = "html";
const code1: string = `
<div class="container">
  <div class="box">
    <div class="box-content">
    </div>
  </div>
`;
const code2: string = `
<div class="box">
  <div class="box-title">Title</div>
</div>
`;

onMounted(() => {
	gsap
		.timeline({ repeat: -1 })
		.to(preRef.value, {
			scrambleText: { text: code2 },
			ease: "none",
			duration: codingDuration,
			delay: codingInterval,
		})
		.to(preRef.value, {
			text: "",
			ease: "none",
			duration: codingDuration,
			delay: codingInterval,
		});
});
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
			<div ref="preRef"></div>
		</div>
	</div>
</template>

<style scoped lang="scss">
$base-size: 1;

.custom_pre_wrapper {
	position: absolute;
	top: 50%;
	margin: 1rem * $base-size 0;
	height: auto;
	width: 20rem * $base-size;
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
			color: #ffffff;
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
