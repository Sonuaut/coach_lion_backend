import { createClient } from '@supabase/supabase-js';
import CommonVariables from '.';

if (!CommonVariables.SUPABASE_URL) {
    throw new Error('Missing SUPABASE_URL environment variable');
}

if (!CommonVariables.SUPABASE_ANON_KEY) {
    throw new Error('Missing SUPABASE_ANON_KEY environment variable');
}

console.log('variblen :',CommonVariables.SUPABASE_ANON_KEY,CommonVariables.SUPABASE_URL)
// Create Supabase client
export const supabase = createClient(
    CommonVariables.SUPABASE_URL,
    CommonVariables.SUPABASE_ANON_KEY,
   
); 