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

const getSpecificOrder = async (id) => {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('orderId', id)
        .single(); // Ensures a single object is returned

    return { data, error }
}

const insertOrder = async (payload) => {
    const {data, error} = await supabase
        .from('orders')
        .insert(payload)

    return { data, error }
}

const updateOrderStatus = async (status, id) => {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('orderId', id);

    return { data, error }
}

module.exports = {
    getAllOrders,
    getSpecificOrder,
    insertOrder,
    updateOrderStatus
}