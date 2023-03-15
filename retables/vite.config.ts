import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import terser from '@rollup/plugin-terser';

const BUILD_UMD = false;

export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true
        })
    ],
    build: {
        minify: true,
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'lib',
            formats: BUILD_UMD ? ['es', 'umd'] : ['es'],
            fileName: format => `lib.${format}.js`
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                }
            }
            /* plugins: [
                terser({
                    mangle: {
                        properties: true
                    }
                })
            ] */
        }
    }
});
