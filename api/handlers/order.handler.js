'use strict'
/**
 *  the handler files are where any database interactions or any integrations with other
 *  systems would go. 
 *  
 *  This way whenever we want to make a change to such integrations, we would know 
 *  exactly where to look.
 * 
 *  **/

const supabase = require('../../utils/supabase/supabaseClient')

const getAllOrders = async () => {
    const { data, error } = await supabase
        .from('orders')
        .select('*');

    return { data, error }
}

module.exports = {
    getAllOrders
}