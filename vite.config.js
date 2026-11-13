import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Makes the built site open by double-clicking dist/index.html (no web server needed).
// Browsers block ES-module scripts on file:// pages, so the build is emitted as a classic script.
const openFromFolder = () => ({
  name: 'open-from-folder',
  enforce: 'post',
  transformIndexHtml(html) {
    return html
      .replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/, '')
      .replace(/<link rel="stylesheet" crossorigin /g, '<link rel="stylesheet" ')
      .replace('</body>', (m) => {
        const src = html.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/)?.[1]
        return src ? `<script defer src="${src}"></script>\n  </body>` : m
      })
  },
})

export default defineConfig({
  base: './',
  plugins: [react(), openFromFolder()],
  build: {
    modulePreload: false,
    assetsDir: '',
    rollupOptions: { output: { format: 'iife', inlineDynamicImports: true, entryFileNames: 'app.js', assetFileNames: '[name][extname]' } },
  },
})
