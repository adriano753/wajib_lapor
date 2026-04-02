import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import obfuscator from 'rollup-plugin-obfuscator';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/css/login.css',
                'resources/js/app.js',
                'resources/js/templatemo-graph-script.js', 
                'resources/js/dashboard-klasifikasi.js',   
                'resources/js/dashboard-pp-pkb.js',
                'resources/js/download-data.js',
                'resources/js/ketenagakerjaan.js',    
                'resources/js/loader.js', 
                'resources/js/download-data-full.js', 
                      
            ],
            refresh: true,
        }),
        tailwindcss(),
        obfuscator({
            global: true, // Terapkan ke semua file
            options: {
                compact: true,
                controlFlowFlattening: true, // Mengubah alur logika jadi membingungkan
                controlFlowFlatteningThreshold: 1,
                numbersToExpressions: true, // Mengubah angka 123 jadi rumus ((0x1 + 0x2) ...)
                simplify: true,
                stringArrayShuffle: true, // Mengacak string
                splitStrings: true,
                stringArrayThreshold: 1,
                deadCodeInjection: true, // Menambah kode palsu jebakan
                deadCodeInjectionThreshold: 0.4,
            }
        }),
    ],
    build: {
        sourcemap: false, // Ini yang menyembunyikan struktur asli file di tab "Sources"
        // minify: 'terser', // Menggunakan minifier yang kuat
    },
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
