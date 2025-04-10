import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kvcgrnrukivnzauakfoa.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2Y2dybnJ1a2l2bnphdWFrZm9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0NDg5NDYsImV4cCI6MjA1NTAyNDk0Nn0.IB8lXkU9P7nk1bvzrq-zcXaERXYf5zsiGiDeEDTY9ck";

export const supabase = createClient(supabaseUrl, supabaseKey);
 