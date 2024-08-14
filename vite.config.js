import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import filterReplace from 'vite-plugin-filter-replace';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1600,
  },
  server: {
    host: true,
  },
  base: './',
  plugins: [
    preact(),
    // Workaround warning with lottie - https://github.com/airbnb/lottie-web/issues/2927
    filterReplace([
      {
        filter: ['node_modules/lottie-web/build/player/lottie.js'],
        replace: {
          from: "eval('[function _expression_function(){' + val + ';scoped_bm_rt=$bm_rt}]')[0]",
          to: "(new Function('scoped_bm_rt', val + ';return $bm_rt;'))()",
        },
      },
    ]),
  ],
})
