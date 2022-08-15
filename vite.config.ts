import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'i',
        }),
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep', 'logos', 'simple-icons'],
        }),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		}
	},
  css:{
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
})
