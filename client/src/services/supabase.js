import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://levtozcwxamsnighgjbp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxldnRvemN3eGFtc25pZ2hnamJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA2NzYyMjUsImV4cCI6MjAyNjI1MjIyNX0.CkpyM2rK3qkUUJETfIWgEqCTDBCx0P_7Wu0dctK2PZs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
