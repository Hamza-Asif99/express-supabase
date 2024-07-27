// Function to check Supabase connection

const {logger} = require('../logger')
const supabase = require('./supabaseClient')

async function checkSupabaseConnection() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .limit(1);
  
    if (error) {
      logger.error('Supabase connection failed:', error.message);
      return false
    }
  
    logger.info('Supabase connection successful');
    return true
}


module.exports = checkSupabaseConnection