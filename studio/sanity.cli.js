const { defineCliConfig } = require('@sanity/cli')

module.exports = defineCliConfig({
  api: {
    projectId: '5itftb7u',
    dataset: 'production'
  },
  studioHost: 'alang-studio'
})
