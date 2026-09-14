import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { jobSchema } from './src/lib/sanity/job';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your_project_id';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'JobBase CMS',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: [jobSchema],
  },
});
