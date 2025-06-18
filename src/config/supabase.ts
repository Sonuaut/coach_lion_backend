import { createClient } from '@supabase/supabase-js';
import CommonVariables from '.';

if (!CommonVariables.SUPABASE_KEY) {
    throw new Error('Missing SUPABASE_KEY environment variable');
}

if (!CommonVariables.SUPABASE_ANON_KEY) {
    throw new Error('Missing SUPABASE_ANON_KEY environment variable');
}

console.log('variblen :',CommonVariables.SUPABASE_ANON_KEY,CommonVariables.SUPABASE_KEY)
// Create Supabase client
export const supabase = createClient(
    CommonVariables.SUPABASE_KEY,
    CommonVariables.SUPABASE_ANON_KEY,
   
); 