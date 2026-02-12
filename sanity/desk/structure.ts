import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // ─── Gallery ──────────────────────────────────────
      S.listItem()
        .title('Gallery')
        .schemaType('galleryImage')
        .child(
          S.documentTypeList('galleryImage')
            .title('Gallery Images')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      // ─── Blog ─────────────────────────────────────────
      S.listItem()
        .title('Blog')
        .schemaType('blogPost')
        .child(
          S.documentTypeList('blogPost')
            .title('Blog Posts')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),

      S.divider(),

      // ─── Categories ───────────────────────────────────
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),

      S.divider(),

      // ─── Contact Submissions ────────────────────────────
      S.listItem()
        .title('Contact Submissions')
        .schemaType('contactSubmission')
        .child(
          S.documentTypeList('contactSubmission')
            .title('Contact Submissions')
            .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
        ),
    ]);
