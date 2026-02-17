import { NextResponse } from 'next/server';
import { getGalleryCategories } from '@/lib/queries/gallery';

/**
 * GET /api/categories
 * Returns all gallery categories from Sanity
 */
export async function GET() {
  try {
    const categories = await getGalleryCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
