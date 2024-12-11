/**
* Rule the words! KKuTu Online
* Copyright (C) 2024~ Studio Moremi(op@kkutu.store)
**/
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: "../public", // 빌드된 파일을 Express의 정적 폴더로 이동
  },
});
