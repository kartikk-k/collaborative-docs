import { createClient } from "@supabase/supabase-js";


const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY!

const supabaseClient = createClient(SUPABASE_URL, process.env.SUPABASE_KEY!);

export default supabaseClient;
