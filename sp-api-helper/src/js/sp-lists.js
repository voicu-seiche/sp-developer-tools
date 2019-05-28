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
