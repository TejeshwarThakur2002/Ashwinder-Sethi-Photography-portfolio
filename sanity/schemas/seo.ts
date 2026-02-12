import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Override the default page title for search engines (50–60 chars ideal).',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Short description shown in search results (120–160 chars ideal).',
      validation: (rule) => rule.max(260),
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      description:
        'Image displayed when shared on social media. Defaults to the main image if left empty.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Set a canonical URL if this content is duplicated elsewhere.',
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      description: 'If enabled, search engines will be asked not to index this page.',
      initialValue: false,
    }),
  ],
});
