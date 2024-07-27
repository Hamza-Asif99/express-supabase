// Function to check Supabase connection

const supabase = require('./supabaseClient')

async function checkSupabaseConnection() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .limit(1);
  
    if (error) {
      console.error('Supabase connection failed:', error.message);
      return false
    }
  
    console.log('Supabase connection successful');
    return true
}


module.exports = checkSupabaseConnection