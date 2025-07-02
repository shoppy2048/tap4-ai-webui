/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/db/supabase/client';

// submit table empty -> stop

// filter status
// isFeature (priority)
// time order

// when crawler is done
// insert web_nav table (tags <- tags[0] or 'other')
// update submit table status

export async function POST(req: NextRequest) {
  try {
    // Get Authorization
    const authHeader = req.headers.get('Authorization');

    // Check Authorization and Verify token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Authorization header is missing or malformed' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const submitKey = process.env.CRON_AUTH_KEY;
    // check key
    const isValid = submitKey === token;
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // get response data
    const { description, detail, name, screenshot_data: screenshotData, screenshot_thumbnail_data: screenshotThumbnailData, tags, title, url } =
      await req.json();

    const supabase = createClient();

    // Check if name already exists
    const { data: existingEntry, error: existingEntryError } = await supabase
      .from('web_navigation')
      .select('id')
      .eq('name', name)
      .single();

    if (existingEntryError && existingEntryError.code !== 'PGRST116') {
      // PGRST116 means no rows found
      throw new Error(existingEntryError.message);
    }

    if (existingEntry) {
      // Update existing entry
      const { error: updateWebNavigationError } = await supabase
        .from('web_navigation')
        .update({
          content: description,
          detail,
          image_url: screenshotData,
          thumbnail_url: screenshotThumbnailData,
          tag_name: tags && tags.length ? tags[0] : 'other',
          category_name: tags && tags.length ? tags[0] : 'other',
          title,
          url,
        })
        .eq('id', existingEntry.id);

      if (updateWebNavigationError) {
        throw new Error(updateWebNavigationError.message);
      }
    } else {
      // Insert new entry
      const { error: insertWebNavigationError } = await supabase.from('web_navigation').insert({
        content: description,
        detail,
        name,
        image_url: screenshotData,
        thumbnail_url: screenshotThumbnailData,
        tag_name: tags && tags.length ? tags[0] : 'other',
        category_name: tags && tags.length ? tags[0] : 'other',
        title,
        url,
      });

      if (insertWebNavigationError) {
        throw new Error(insertWebNavigationError.message);
      }
    }

    // Update submit table
    const { error: updateSubmitError } = await supabase.from('submit').update({ status: 1 }).eq('url', url);

    if (updateSubmitError) {
      throw new Error(updateSubmitError.message);
    }

    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    return NextResponse.json({ error: Error }, { status: 500 });
  }
}
