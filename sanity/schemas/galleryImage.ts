import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title and optional display title.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description: 'URL-friendly identifier for direct linking.',
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility and SEO.',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Short overlay text displayed on the gallery.',
    }),
    defineField({
      name: 'description',
      title: 'Description / Story',
      type: 'text',
      rows: 4,
      description: 'Longer description or backstory (optional).',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'shotDate',
      title: 'Shot Date',
      type: 'date',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City, country, or free-text location.',
    }),
    defineField({
      name: 'orientation',
      title: 'Orientation',
      type: 'string',
      options: {
        list: [
          { title: 'Landscape', value: 'landscape' },
          { title: 'Portrait', value: 'portrait' },
          { title: 'Square', value: 'square' },
        ],
        layout: 'radio',
      },
    }),

    // Camera settings group
    defineField({
      name: 'aperture',
      title: 'Aperture',
      type: 'string',
      description: 'e.g. f/2.8',
      group: 'cameraSettings',
    }),
    defineField({
      name: 'shutterSpeed',
      title: 'Shutter Speed',
      type: 'string',
      description: 'e.g. 1/500s',
      group: 'cameraSettings',
    }),
    defineField({
      name: 'iso',
      title: 'ISO',
      type: 'string',
      description: 'e.g. 200',
      group: 'cameraSettings',
    }),
    defineField({
      name: 'focalLength',
      title: 'Focal Length',
      type: 'string',
      description: 'e.g. 85mm',
      group: 'cameraSettings',
    }),

    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Highlight this image in featured sections.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Sort Order / Priority',
      type: 'number',
      description: 'Lower numbers appear first. Use for manual ordering.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  groups: [{ name: 'cameraSettings', title: 'Camera Settings' }],
  orderings: [
    {
      title: 'Sort Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Shot Date (Newest)',
      name: 'shotDateDesc',
      by: [{ field: 'shotDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'image',
    },
  },
});
