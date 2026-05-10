import type { ItemState, ItemGetter, ItemActions } from "~/types/store";

export const useItemStore = defineStore("item", (): ItemState & ItemGetter & ItemActions => {
	const showingCommandBar = ref<boolean>(false);
	const showingGuide = ref<boolean>(false);

	function toggleShowingCommandBar() {
		showingCommandBar.value = !showingCommandBar.value;
	}

	function toggleShowingGuide() {
		showingGuide.value = !showingGuide.value;
	}

	return { showingCommandBar, showingGuide, toggleShowingCommandBar, toggleShowingGuide };
});
