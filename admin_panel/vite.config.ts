import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "node:path"
import {fileURLToPath} from 'node:url'
// https://vite.dev/config/
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.resolve(__filename)
export default defineConfig({
  plugins: [react()],
  resolve:{alias:{
    "@":path.resolve(__dirname,'/src')
  }},
  build:{sourcemap:true}
})
