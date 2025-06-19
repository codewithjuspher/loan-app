import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, type createRouter } from "@tanstack/react-router";
import type { FunctionComponent } from "./common/types";
// import { TanStackRouterDevelopmentTools } from "./components/utils/development-tools/TanStackRouterDevelopmentTools";
import { ConfigProvider, App as AntdApp, theme as antdTheme, theme } from "antd";
import { useUIStore } from "./stores/uiStore";
import { motion } from "framer-motion";
import { useAutoDarkMode } from "./hooks/useAutoDarkMode";

const queryClient = new QueryClient();

type AppProps = { router: ReturnType<typeof createRouter> };

const AppLayout = ({ router }: AppProps) => {
	const { token } = theme.useToken();

	return (
		<motion.div
			initial={false}
			animate={{
				backgroundColor: token.colorBgBase,
				color: token.colorText,
			}}
			transition={{ duration: 1, ease: "easeInOut" }}

		>
			<AntdApp>
				<RouterProvider router={router} />
				{/* <TanStackRouterDevelopmentTools
					router={router}
					initialIsOpen={false}
					position="bottom-left"
				/>
				<ReactQueryDevtools initialIsOpen={false} /> */}
			</AntdApp>
		</motion.div>
	);
};

const App = ({ router }: AppProps): FunctionComponent => {
	const { darkMode } = useUIStore();
	useAutoDarkMode();

	return (
		<QueryClientProvider client={queryClient}>
			<ConfigProvider
				theme={{
					algorithm: darkMode
						? antdTheme.darkAlgorithm
						: antdTheme.defaultAlgorithm,
					token: {
						colorPrimary: "#1A73E8",
						borderRadius: 12,
						fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
					},
				}}
			>
				<AppLayout router={router} />
			</ConfigProvider>
		</QueryClientProvider>
	);
};

export default App;
