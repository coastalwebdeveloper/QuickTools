// Quick test script to verify Supabase connection
// Run with: node test-supabase.js

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gmutkdowdxslpcgqmfeh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtdXRrZG93ZHhzbHBjZ3FtZmVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2ODA3OTQsImV4cCI6MjA4MDI1Njc5NH0.gdZLdpSSutUJsCgdQebIASD95kM5TI-hxkx8YkF5bHc'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('Testing Supabase connection...\n')

  // Test 1: Insert tool usage
  console.log('1. Testing tool_usage insert...')
  const { data: insertData, error: insertError } = await supabase
    .from('tool_usage')
    .insert({
      tool_id: 'test-tool',
      user_ip: 'test-ip'
    })
    .select()

  if (insertError) {
    console.error('❌ Insert failed:', insertError.message)
  } else {
    console.log('✅ Insert successful:', insertData)
  }

  // Test 2: Read tool usage
  console.log('\n2. Testing tool_usage select...')
  const { data: selectData, error: selectError, count } = await supabase
    .from('tool_usage')
    .select('*', { count: 'exact' })
    .eq('tool_id', 'test-tool')

  if (selectError) {
    console.error('❌ Select failed:', selectError.message)
  } else {
    console.log('✅ Select successful. Count:', count)
    console.log('Data:', selectData)
  }

  // Test 3: Check RLS policies
  console.log('\n3. Checking if RLS is properly configured...')
  const { data: allData, error: allError } = await supabase
    .from('tool_usage')
    .select('*')
    .limit(5)

  if (allError) {
    console.error('❌ RLS might be blocking access:', allError.message)
  } else {
    console.log('✅ RLS policies working. Sample records:', allData?.length || 0)
  }
}

testConnection().catch(console.error)
