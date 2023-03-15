import { defineConfig } from 'cypress';

export default defineConfig({
    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite'
        },
        defaultCommandTimeout: 100,
        video: false
    }
});
