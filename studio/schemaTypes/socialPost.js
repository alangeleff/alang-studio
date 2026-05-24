import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'socialPost',
  title: 'Social Post',
  type: 'document',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          {title: 'X (Twitter)', value: 'x'},
          {title: 'Facebook', value: 'facebook'},
          {title: 'Instagram', value: 'instagram'},
          {title: 'Threads', value: 'threads'},
          {title: 'TikTok', value: 'tiktok'},
          {title: 'LinkedIn', value: 'linkedin'},
        ],
        layout: 'radio',
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'type',
      title: 'Post Type',
      type: 'string',
      options: {
        list: [
          {title: 'Native embed (X or Facebook)', value: 'embed'},
          {title: 'Custom card (Instagram, Threads, etc.)', value: 'card'},
        ],
        layout: 'radio',
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'embedCode',
      title: 'Embed Code',
      type: 'text',
      description: 'Paste the raw embed HTML from X or Facebook. Only used when type = embed.',
    }),
    defineField({
      name: 'name',
      title: 'Display Name',
      type: 'string',
    }),
    defineField({
      name: 'handle',
      title: 'Handle (@username)',
      type: 'string',
    }),
    defineField({
      name: 'pfpUrl',
      title: 'Profile Picture URL',
      type: 'url',
    }),
    defineField({
      name: 'body',
      title: 'Post Body',
      type: 'text',
      description: 'Post text content. Used for custom card type.',
    }),
    defineField({
      name: 'postUrl',
      title: 'Link to Original Post',
      type: 'url',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'date',
      title: 'Post Date',
      type: 'date',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'handle',
    },
  },
})
