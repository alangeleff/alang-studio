const { defineField, defineType } = require('sanity')

const socialPost = defineType({
  name: 'socialPost',
  title: 'Social Post',
  type: 'document',
  fields: [
    defineField({ name: 'platform', title: 'Platform', type: 'string', options: { list: ['x','facebook','instagram','threads','tiktok','linkedin'] }, validation: R => R.required() }),
    defineField({ name: 'type', title: 'Type', type: 'string', options: { list: ['embed','card'] }, validation: R => R.required() }),
    defineField({ name: 'embedCode', title: 'Embed Code', type: 'text' }),
    defineField({ name: 'name', title: 'Display Name', type: 'string' }),
    defineField({ name: 'handle', title: 'Handle', type: 'string' }),
    defineField({ name: 'pfpUrl', title: 'Profile Picture URL', type: 'url' }),
    defineField({ name: 'body', title: 'Post Body', type: 'text' }),
    defineField({ name: 'postUrl', title: 'Post URL', type: 'url', validation: R => R.required() }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
  ],
})

module.exports = { socialPost }
