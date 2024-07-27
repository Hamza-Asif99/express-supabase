//this module holds messages to be included in reponse bodies
// it is better to include them here and import them where required than to have hardcoded
// strings in our code

module.exports = {
    failureFetchingOrders: 'Could not fetch order(s)',
    successfullyFetchedOrders: 'Order(s) fetched successfully',

    failureInsertingOrder: 'Could not insert new order',
    successInsertingOrder: 'Order inserted successfully',

    failureUpdatingOrder: 'Could not update order',
    successUpdatingOrder: 'Updated order successfully'
}