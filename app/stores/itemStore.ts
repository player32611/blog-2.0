import type { ItemState, ItemGetter, ItemActions } from "~/types/store";

export const useItemStore = defineStore("item", (): ItemState & ItemGetter & ItemActions => {
	const showCommandBar = ref<boolean>(false);
	function setShowCommandBar(state: boolean) {
		showCommandBar.value = state;
	}
	return { showCommandBar, setShowCommandBar };
});
