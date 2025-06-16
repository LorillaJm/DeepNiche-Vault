const { schedule } = require('@netlify/functions');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const handler = async (event, context) => {
  try {
    const now = new Date();
    
    // Get all content scheduled for release
    const { data: scheduledContent, error } = await supabase
      .from('scheduled_content')
      .select('*')
      .eq('status', 'scheduled')
      .lte('release_date', now.toISOString());

    if (error) throw error;

    // Process each piece of content that's ready for release
    for (const content of scheduledContent) {
      // Update content status to released
      await supabase
        .from('scheduled_content')
        .update({ status: 'released', released_at: now.toISOString() })
        .eq('id', content.id);

      // Get users who requested notifications for this content
      const { data: notifications } = await supabase
        .from('content_notifications')
        .select('user_id')
        .eq('content_id', content.id);

      // Send notifications to users
      if (notifications?.length > 0) {
        const userIds = notifications.map(n => n.user_id);
        
        await supabase
          .from('user_notifications')
          .insert(userIds.map(userId => ({
            user_id: userId,
            type: 'content_release',
            title: `${content.title} is now available!`,
            content_id: content.id,
            read: false
          })));
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: `Successfully processed ${scheduledContent.length} content items`,
        processed: scheduledContent 
      })
    };
  } catch (error) {
    console.error('Error processing scheduled content:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process scheduled content' })
    };
  }
};

// Run every hour
exports.handler = schedule('0 * * * *', handler); 