export default {
  name: 'socialPost',
  title: 'Social Post',
  type: 'document',
  fields: [
    {
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
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Render type',
      type: 'string',
      description: 'Embed = paste the native X/Facebook embed HTML. Card = custom-rendered card built from name/handle/body/etc.',
      options: {
        list: [
          {title: 'Embed (native X / Facebook embed)', value: 'embed'},
          {title: 'Card (custom-rendered)', value: 'card'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'embedCode',
      title: 'Embed code',
      type: 'text',
      description: 'Raw embed HTML pasted from X or Facebook. Only used when Render type = Embed.',
      rows: 6,
      hidden: ({parent}) => parent?.type !== 'embed',
    },
    {
      name: 'name',
      title: 'Poster name',
      type: 'string',
      hidden: ({parent}) => parent?.type !== 'card',
    },
    {
      name: 'handle',
      title: 'Handle',
      type: 'string',
      description: 'With or without the leading @',
      hidden: ({parent}) => parent?.type !== 'card',
    },
    {
      name: 'pfpUrl',
      title: 'Profile picture URL',
      type: 'url',
      hidden: ({parent}) => parent?.type !== 'card',
    },
    {
      name: 'body',
      title: 'Post body',
      type: 'text',
      rows: 4,
      hidden: ({parent}) => parent?.type !== 'card',
    },
    {
      name: 'postUrl',
      title: 'Post URL',
      type: 'url',
      description: 'Link to the original post — used by both embed and card render types.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers show first.',
      initialValue: 0,
    },
  ],
  orderings: [
    {
      title: 'Manual order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Date, newest first',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      name: 'name',
      handle: 'handle',
      platform: 'platform',
      type: 'type',
    },
    prepare({name, handle, platform, type}) {
      const cleanHandle = handle ? `@${String(handle).replace(/^@/, '')}` : ''
      const subtitle = [platform && String(platform).toUpperCase(), type, cleanHandle]
        .filter(Boolean)
        .join('  ·  ')
      return {
        title: name || cleanHandle || '(unnamed post)',
        subtitle,
      }
    },
  },
}
