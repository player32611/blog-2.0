"use client";

import { useThemeStore } from "@/stores/themeStore";
import type { ConfigProviderParams } from "@/types/components";
import { ConfigProvider } from "antd";

export default function ConfigProviderWrapper({ children }: ConfigProviderParams) {
	const { theme } = useThemeStore();
	const getAvailableTheme = () => {
		switch (theme) {
			case "undertale":
				return {
					token: {
						colorBgContainer: "#C00000",
						colorText: "#ff7f27",
						colorTextHeading: "#ff7f27",
						fontFamily: "var(--font-mars-needs-cunnilingus)",
						fontSize: 40,
					},
				};
			case "touhou":
				return {};
		}
	};

	return <ConfigProvider theme={getAvailableTheme()}>{children}</ConfigProvider>;
}
