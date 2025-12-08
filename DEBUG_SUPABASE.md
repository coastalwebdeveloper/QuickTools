# Debug Supabase Tool Usage

## Steps to Debug:

### 1. Check Browser Console
Open DevTools (F12) → Console tab and look for:
- ✅ No errors from `useAnalytics.ts`
- ✅ No "Access to storage" errors from YOUR code (ignore extension errors)

### 2. Check Network Tab
Open DevTools (F12) → Network tab:
- Filter by "supabase"
- Visit a tool page
- Look for POST request to: `https://gmutkdowdxslpcgqmfeh.supabase.co/rest/v1/tool_usage`
- Check if it returns 201 (success) or error

### 3. Check Supabase Dashboard
Go to: https://supabase.com/dashboard/project/gmutkdowdxslpcgqmfeh

**Table Editor:**
- Click "Table Editor" → "tool_usage"
- Check if new rows are being added when you visit tools

**Logs:**
- Click "Logs" → "Postgres Logs"
- Look for INSERT statements

### 4. Test RLS Policies
Run this in Supabase SQL Editor:

```sql
-- Check if policies exist
SELECT * FROM pg_policies WHERE tablename = 'tool_usage';

-- Test insert manually
INSERT INTO tool_usage (tool_id, user_ip) 
VALUES ('test-manual', 'test-ip');

-- Check if it worked
SELECT * FROM tool_usage WHERE tool_id = 'test-manual';
```

### 5. Common Issues:

**Issue: "Access to storage is not allowed"**
- This is from browser EXTENSIONS (content.js, ff-content.js)
- NOT from your Supabase code
- Safe to ignore if Network tab shows successful requests

**Issue: 403 Forbidden**
- RLS policies blocking insert
- Fix: Re-run the SQL from `supabase_tables.sql`

**Issue: No network request at all**
- CSP blocking (should be fixed now)
- Check if `trackToolUsage` is being called

**Issue: CORS error**
- Supabase project settings → API → CORS
- Add your domain: `https://www.quicktools.website`

### 6. Quick Test Code

Add this to any tool page temporarily:

```typescript
useEffect(() => {
  console.log('🔍 Testing Supabase...');
  supabase
    .from('tool_usage')
    .insert({ tool_id: 'debug-test', user_ip: 'debug' })
    .then(({ data, error }) => {
      if (error) console.error('❌ Supabase Error:', error);
      else console.log('✅ Supabase Success:', data);
    });
}, []);
```

### 7. Expected Console Output

When visiting a tool page, you should see:
```
(No errors from useAnalytics.ts)
```

If you see errors, check:
- Network tab for failed requests
- Supabase dashboard for RLS policy issues
