import { defineConfig, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { readFileSync } from "fs";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	const config: UserConfig = {
		plugins: [vue(), eslintPlugin()],
		envPrefix: "ELIXIR_",
		server: {
			https: true
		}
	};

	if (mode === "dev") {
		return {
			...config,
			server: {
				https: {
					cert: readFileSync("./cert.pem"),
					key: readFileSync("./cert-key.pem")
				}
			}
		};
	} else return config;
});
