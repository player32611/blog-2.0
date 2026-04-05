<script setup lang="ts"></script>

<template>
	<div class="table-wrapper">
		<table class="custom-table">
			<slot />
		</table>
	</div>
</template>

<style scoped lang="scss">
.table-wrapper {
	position: relative;
	margin: 1.5rem 0;
	border-radius: 8px;
	border: 1px solid #e5e7eb;

	.custom-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.875rem;
	}

	:deep(th) {
		font-weight: 600;
		padding: 0.75rem 1rem;
		border-bottom: 2px solid #e5e7eb;
	}

	:deep(td) {
		padding: 0.75rem 1rem;
		border-bottom: 1px solid #f3f4f6;
	}
}
</style>
