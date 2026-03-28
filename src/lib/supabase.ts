import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hompqifankcwzxlefodj.supabase.co';
const supabaseKey = 'sb_publishable_K5-fPCekB_SwMYp15cI8og_eOggNJJR';

export const supabase = createClient(supabaseUrl, supabaseKey);
