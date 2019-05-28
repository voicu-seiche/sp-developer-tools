var $jq = jQuery.noConflict();

Type.registerNamespace('SPApi');
var SPApi = SPApi || {};

SPApi.HttpMethods = {
    Get: 'GET',
    Post: 'POST',
    Put: 'PUT',
    Delete: 'DELETE',
    Patch: 'PATCH',
};

SPApi.ListItems = SPApi.ListItems || {};

SPApi.ListItems.getItems = function (listName) {
    var queryUrl = _spPageContextInfo.webAbsoluteUrl;
    queryUrl = queryUrl.concat('/_api/web/lists/GetByTitle(\'');
    queryUrl = queryUrl.concat(listName);
    queryUrl = queryUrl.concat('\')/items');

    return $jq.ajax({
            cache: false,
            url: queryUrl,
            type: SPApi.HttpMethods.Get,
            dataType: 'json',
            crossDomain: true,
            beforeSend: function (xhr) {
                xhr.withCredentials = true;
            },
            headers: {
                'Accept': 'application/json;odata=verbose',
                'X-RequestDigest': SPApi.Utils.getFormDigest(),
            },
        })
        .then(function (response) {
            return {
                successful: true,
                error: null,
                data: response.d.results,
            };
        })
        .catch(function (xhr, status, error) {
            return {
                successful: false,
                error: xhr,
                data: null,
            };
        });
};

SPApi.ListItems.getItemById = function (listName, id) {
    var queryUrl = _spPageContextInfo.webAbsoluteUrl;
    queryUrl = queryUrl.concat('/_api/web/lists/GetByTitle(\'');
    queryUrl = queryUrl.concat(listName);
    queryUrl = queryUrl.concat('\')/items(');
    queryUrl = queryUrl.concat(id);
    queryUrl = queryUrl.concat(')');

    return $jq.ajax({
            cache: false,
            url: queryUrl,
            type: SPApi.HttpMethods.Get,
            dataType: 'json',
            crossDomain: true,
            beforeSend: function (xhr) {
                xhr.withCredentials = true;
            },
            headers: {
                'Accept': 'application/json;odata=verbose',
                'X-RequestDigest': SPApi.Utils.getFormDigest(),
            },
        })
        .then(function (response) {
            return {
                successful: true,
                error: null,
                data: response.d,
            };
        })
        .catch(function (xhr, status, error) {
            return {
                successful: false,
                error: xhr,
                data: null,
            };
        });
};

SPApi.ListItems.createItem = function (listName, payload) {
    var queryUrl = _spPageContextInfo.webAbsoluteUrl;
    queryUrl = queryUrl.concat('/_api/web/lists/GetByTitle(\'');
    queryUrl = queryUrl.concat(listName);
    queryUrl = queryUrl.concat('\')/items');

    return SPApi.Lists.getByTitle(listName)
        .then(function (response) {
            if (!response.successful) {
                return response;
            }

            payload.__metadata = {
                type: response.data.ListItemEntityTypeFullName,
            };

            return $jq.ajax({
                    cache: false,
                    url: queryUrl,
                    type: SPApi.HttpMethods.Post,
                    data: JSON.stringify(payload),
                    dataType: 'json',
                    crossDomain: true,
                    beforeSend: function (xhr) {
                        xhr.withCredentials = true;
                    },
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'Content-Type': 'application/json;odata=verbose',
                        'X-RequestDigest': SPApi.Utils.getFormDigest(),
                    },
                })
                .then(function (response) {
                    return {
                        successful: true,
                        error: null,
                        data: response.d,
                    };
                })
                .catch(function (xhr, status, error) {
                    return {
                        successful: false,
                        error: xhr,
                        data: null,
                    };
                });
        });
};

SPApi.ListItems.updateItem = function (listName, id, payload) {
    var queryUrl = _spPageContextInfo.webAbsoluteUrl;
    queryUrl = queryUrl.concat('/_api/web/lists/GetByTitle(\'');
    queryUrl = queryUrl.concat(listName);
    queryUrl = queryUrl.concat('\')/items(');
    queryUrl = queryUrl.concat(id);
    queryUrl = queryUrl.concat(')');

    return SPApi.Lists.getByTitle(listName)
        .then(function (response) {
            if (!response.successful) {
                return response;
            }

            payload.__metadata = {
                type: response.data.ListItemEntityTypeFullName,
            };

            return $jq.ajax({
                    cache: false,
                    url: queryUrl,
                    type: SPApi.HttpMethods.Post,
                    data: JSON.stringify(payload),
                    dataType: 'json',
                    crossDomain: true,
                    beforeSend: function (xhr) {
                        xhr.withCredentials = true;
                    },
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'Content-Type': 'application/json;odata=verbose',
                        'IF-MATCH': '*',
                        'X-HTTP-Method': 'MERGE',
                        'X-RequestDigest': SPApi.Utils.getFormDigest(),
                    },
                })
                .then(function (response) {
                    return {
                        successful: true,
                        error: null,
                        data: response,
                    };
                })
                .catch(function (xhr, status, error) {
                    return {
                        successful: false,
                        error: xhr,
                        data: null,
                    };
                });
        });
};

SPApi.ListItems.deleteItem = function (listName, id) {
    var queryUrl = _spPageContextInfo.webAbsoluteUrl;
    queryUrl = queryUrl.concat('/_api/web/lists/GetByTitle(\'');
    queryUrl = queryUrl.concat(listName);
    queryUrl = queryUrl.concat('\')/items(');
    queryUrl = queryUrl.concat(id);
    queryUrl = queryUrl.concat(')');

    return $jq.ajax({
            cache: false,
            url: queryUrl,
            type: SPApi.HttpMethods.Post,
            dataType: 'json',
            crossDomain: true,
            beforeSend: function (xhr) {
                xhr.withCredentials = true;
            },
            headers: {
                'Accept': 'application/json;odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'IF-MATCH': '*',
                'X-HTTP-Method': 'DELETE',
                'X-RequestDigest': SPApi.Utils.getFormDigest(),
            },
        })
        .then(function (response) {
            return {
                successful: true,
                error: null,
                data: response,
            };
        })
        .catch(function (xhr, status, error) {
            return {
                successful: false,
                error: xhr,
                data: null,
            };
        });
};

SPApi.Lists = SPApi.Lists || {};

SPApi.Lists.getById = function (listId) {
    var queryUrl = _spPageContextInfo.webAbsoluteUrl;
    queryUrl = queryUrl.concat('/_api/web/lists(guid\'');
    queryUrl = queryUrl.concat(listId);
    queryUrl = queryUrl.concat('\')');

    return $jq.ajax({
            cache: false,
            url: queryUrl,
            type: SPApi.HttpMethods.Get,
            dataType: 'json',
            crossDomain: true,
            beforeSend: function (xhr) {
                xhr.withCredentials = true;
            },
            headers: {
                'Accept': 'application/json;odata=verbose',
                'X-RequestDigest': SPApi.Utils.getFormDigest(),
            },
        })
        .then(function (response) {
            return {
                successful: true,
                error: null,
                data: response.d,
            };
        })
        .catch(function (xhr, status, error) {
            return {
                successful: false,
                error: xhr,
                data: null,
            };
        });
};

SPApi.Lists.getByTitle = function (listName) {
    var queryUrl = _spPageContextInfo.webAbsoluteUrl;
    queryUrl = queryUrl.concat('/_api/web/lists/GetByTitle(\'');
    queryUrl = queryUrl.concat(listName);
    queryUrl = queryUrl.concat('\')');

    return $jq.ajax({
            cache: false,
            url: queryUrl,
            type: SPApi.HttpMethods.Get,
            dataType: 'json',
            crossDomain: true,
            beforeSend: function (xhr) {
                xhr.withCredentials = true;
            },
            headers: {
                'Accept': 'application/json;odata=verbose',
                'X-RequestDigest': SPApi.Utils.getFormDigest(),
            },
        })
        .then(function (response) {
            return {
                successful: true,
                error: null,
                data: response.d,
            };
        })
        .catch(function (xhr, status, error) {
            return {
                successful: false,
                error: xhr,
                data: null,
            };
        });
};

SPApi.Utils = SPApi.Utils || {};

SPApi.Utils.getFormDigest = function () {
    return $jq('#__REQUESTDIGEST').val();
};
