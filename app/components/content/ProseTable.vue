<script setup lang="ts"></script>

<template>
	<div class="table-wrapper">
		<table class="custom-table">
			<slot />
		</table>
	</div>
</template>

<style scoped lang="scss">
$base-size: 1;

.table-wrapper {
	position: relative;
	margin: 1.5rem * $base-size 0;
	border-radius: 8px;
	border-width: 0.2rem * $base-size;
	border-style: solid;
	border-color: #e5e7eb;
	overflow: auto;

	.custom-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.875rem * $base-size;
	}

	:deep(tr) {
		padding: 0.75rem * $base-size 1rem * $base-size;
		border-bottom-width: 0.1rem * $base-size;
		border-bottom-style: dashed;
		border-bottom-color: #f3f4f6;

		&:last-child {
			border-bottom: none;
		}

		th {
			padding: 0.75rem * $base-size 1rem * $base-size;
			font-weight: 600;
			border-bottom-width: 0.2rem * $base-size;
			border-bottom-style: solid;
			border-bottom-color: #e5e7eb;
		}

		td {
			padding: 0.75rem * $base-size 1rem * $base-size;
		}
	}
}

/* ========== 超小屏（< 576px）========== */
@media screen and (max-width: 576px) {
	$base-size: 0.5;

	.table-wrapper {
		margin: 1.5rem * $base-size 0;
		border-width: 0.2rem * $base-size;

		.custom-table {
			font-size: 0.875rem * $base-size;
		}

		:deep(tr) {
			padding: 0.75rem * $base-size 1rem * $base-size;
			border-bottom-width: 0.1rem * $base-size;

			th {
				padding: 0.75rem * $base-size 1rem * $base-size;
				border-bottom-width: 0.2rem * $base-size;
			}

			td {
				padding: 0.75rem * $base-size 1rem * $base-size;
			}
		}
	}
}

/* ========== 小屏（576px - 768px）========== */
@media screen and (min-width: 576px) and (max-width: 768px) {
	$base-size: 0.8;

	.table-wrapper {
		margin: 1.5rem * $base-size 0;
		border-width: 0.2rem * $base-size;

		.custom-table {
			font-size: 0.875rem * $base-size;
		}

		:deep(tr) {
			padding: 0.75rem * $base-size 1rem * $base-size;
			border-bottom-width: 0.1rem * $base-size;

			th {
				padding: 0.75rem * $base-size 1rem * $base-size;
				border-bottom-width: 0.2rem * $base-size;
			}

			td {
				padding: 0.75rem * $base-size 1rem * $base-size;
			}
		}
	}
}

/* ========== 中等屏（768px - 991px）========== */
@media screen and (min-width: 768px) and (max-width: 991px) {
	$base-size: 0.9;

	.table-wrapper {
		margin: 1.5rem * $base-size 0;
		border-width: 0.2rem * $base-size;

		.custom-table {
			font-size: 0.875rem * $base-size;
		}

		:deep(tr) {
			padding: 0.75rem * $base-size 1rem * $base-size;
			border-bottom-width: 0.1rem * $base-size;

			th {
				padding: 0.75rem * $base-size 1rem * $base-size;
				border-bottom-width: 0.2rem * $base-size;
			}

			td {
				padding: 0.75rem * $base-size 1rem * $base-size;
			}
		}
	}
}

/* ========== 大屏（991px - 1199px）========== */
@media screen and (min-width: 991px) and (max-width: 1199px) {
	$base-size: 1;

	.table-wrapper {
		margin: 1.5rem * $base-size 0;
		border-width: 0.2rem * $base-size;

		.custom-table {
			font-size: 0.875rem * $base-size;
		}

		:deep(tr) {
			padding: 0.75rem * $base-size 1rem * $base-size;
			border-bottom-width: 0.1rem * $base-size;

			th {
				padding: 0.75rem * $base-size 1rem * $base-size;
				border-bottom-width: 0.2rem * $base-size;
			}

			td {
				padding: 0.75rem * $base-size 1rem * $base-size;
			}
		}
	}
}
</style>
