import type { ItemState, ItemGetter, ItemActions } from "~/types/store";

export const useItemStore = defineStore("item", (): ItemState & ItemGetter & ItemActions => {
	const showingCommandBar = ref<boolean>(false);
	const showingGuide = ref<boolean>(false);
	const currentCommand = ref<string>("");

	function setCurrentCommand(command: string) {
		currentCommand.value = command;
	}

	function toggleShowingCommandBar() {
		showingCommandBar.value = !showingCommandBar.value;
	}

	function toggleShowingGuide() {
		showingGuide.value = !showingGuide.value;
	}

	return {
		showingCommandBar,
		showingGuide,
		currentCommand,
		setCurrentCommand,
		toggleShowingCommandBar,
		toggleShowingGuide,
	};
});
