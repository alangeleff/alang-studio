const { defineConfig } = require('sanity')
const { structureTool } = require('sanity/structure')
const { visionTool } = require('@sanity/vision')
const { schemaTypes } = require('./schemas')

module.exports = defineConfig({
  name: 'default',
  title: 'alang-studio',
  projectId: '5itftb7u',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
