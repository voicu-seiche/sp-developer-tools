This tool intends to help you with calling the SharePoint REST Api endpoints.

### Usage
Download one of the distribution files:

* [sp-api-helper.js](./dist/sp-api-helper.js)
* [sp-api-helper.min.js](./dist/sp-api-helper.min.js)

and add it to your projects.

These are the available namespaces:
```
* SPApi
* SPApi.Lists
* SPApi.ListItems
* SPApi.Utils
```
and these are the available methods
```
SPApi.Lists.getById(listId)
SPApi.Lists.getByTitle(listName)
```
```
SPApi.ListItems.getItems(listName)
SPApi.ListItems.getItemById(listName, id)
SPApi.ListItems.createItem(listName, payload)
SPApi.ListItems.updateItem(listName, id, payload)
SPApi.ListItems.deleteItem(listName, id)
```

These methods are returning a promise that will be resolved by the following object
```
{
    success: boolean,
    error: object,
    data: object,
}
```

There will be more methods to access different SharePoint REST Api endpoints in the future and some other improvements.
