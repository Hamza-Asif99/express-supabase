const {createClient} = require('@supabase/supabase-js')

const supabaseURL = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

const supabaseClient = createClient(supabaseURL, supabaseKey)

module.exports = supabaseClient