'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import { projectId, dataset, apiVersion } from './sanity/env';
import { schemaTypes } from './sanity/schemas';
import { structure } from './sanity/desk/structure';

export default defineConfig({
  name: 'shoot-studio',
  title: 'Shoot Studio CMS',

  projectId,
  dataset,
  apiVersion,

  basePath: '/studio',

  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],

  schema: {
    types: schemaTypes,
  },
});
