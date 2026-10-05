import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://bhsalumni.co.za',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
});
