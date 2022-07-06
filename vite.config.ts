import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { readFileSync } from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

    const config: UserConfig = {
        plugins: [ vue() ],
        envPrefix: "ELIXIR_",
    };

    if (mode === 'dev') {
        return {
            ...config,
            server: {
                https: {
                    cert: readFileSync('./cert.pem'),
                    key: readFileSync('./cert-key.pem'),
                }
            }
        }
    } else return {
        ...config,
        server: {
            https: true
        }
    }

});
