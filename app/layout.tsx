// import RouterProvider from "@/components/provider/RouterProvider";
import ThemeProvider from "@/components/provider/ThemeProvider";
import Loading from "@/components/ui/Loading";
import { marsNeedsCunnilingus, pressStart2P } from "@/lib/fonts";
import "./globals.scss";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="zh-CN" className={`${pressStart2P.variable} ${marsNeedsCunnilingus.variable}`}>
			<body>
				<ThemeProvider>
					{/* <RouterProvider> */}
					<Loading />
					{children}
					{/* </RouterProvider> */}
				</ThemeProvider>
			</body>
		</html>
	);
}
