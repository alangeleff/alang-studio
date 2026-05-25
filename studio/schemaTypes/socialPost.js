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
      hidden: ({document}) => document?.type !== 'embed',
    }),
    defineField({
      name: 'name',
      title: 'Display Name / Label',
      type: 'string',
      description: 'Shown on custom cards. For embeds, use this as an internal label to identify the entry.',
    }),
    defineField({
      name: 'handle',
      title: 'Handle (@username)',
      type: 'string',
      hidden: ({document}) => document?.type !== 'card',
    }),
    defineField({
      name: 'pfp',
      title: 'Profile Picture',
      type: 'image',
      hidden: ({document}) => document?.type !== 'card',
    }),
    defineField({
      name: 'body',
      title: 'Post Body',
      type: 'text',
      description: 'Post text content. Used for custom card type.',
      hidden: ({document}) => document?.type !== 'card',
    }),
    defineField({
      name: 'postUrl',
      title: 'Link to Original Post',
      type: 'url',
      validation: (R) => R.required(),
      hidden: ({document}) => document?.type !== 'card',
    }),
    defineField({
      name: 'date',
      title: 'Post Date',
      type: 'date',
      hidden: ({document}) => document?.type !== 'card',
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
      platform: 'platform',
      type: 'type',
      name: 'name',
      handle: 'handle',
      order: 'order',
    },
    prepare({ platform, type, name, handle, order }) {
      const title = name ? name : platform ? platform.toUpperCase() : 'Post'
      const subtitle = type === 'card' && handle ? handle : type === 'embed' ? 'Embed' : ''
      return {
        title: order != null ? `${order}. ${title}` : title,
        subtitle,
      }
    },
  },
})
