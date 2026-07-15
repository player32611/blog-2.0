<script setup lang="ts">
const props = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(
	() =>
		props.id &&
		((typeof headings?.anchorLinks === "boolean" && headings?.anchorLinks === true) ||
			(typeof headings?.anchorLinks === "object" && headings?.anchorLinks?.h4)),
);
</script>

<template>
	<h4 :id="props.id">
		<a v-if="props.id && generate" :href="`#${props.id}`">
			<slot />
		</a>
		<slot v-else />
	</h4>
</template>
