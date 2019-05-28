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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwLWFwaS5qcyIsInNwLWxpc3QtaXRlbXMuanMiLCJzcC1saXN0cy5qcyIsInNwLXV0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNwLWFwaS1oZWxwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgJGpxID0galF1ZXJ5Lm5vQ29uZmxpY3QoKTtcclxuXHJcblR5cGUucmVnaXN0ZXJOYW1lc3BhY2UoJ1NQQXBpJyk7XHJcbnZhciBTUEFwaSA9IFNQQXBpIHx8IHt9O1xyXG5cclxuU1BBcGkuSHR0cE1ldGhvZHMgPSB7XHJcbiAgICBHZXQ6ICdHRVQnLFxyXG4gICAgUG9zdDogJ1BPU1QnLFxyXG4gICAgUHV0OiAnUFVUJyxcclxuICAgIERlbGV0ZTogJ0RFTEVURScsXHJcbiAgICBQYXRjaDogJ1BBVENIJyxcclxufTtcclxuIiwiU1BBcGkuTGlzdEl0ZW1zID0gU1BBcGkuTGlzdEl0ZW1zIHx8IHt9O1xyXG5cclxuU1BBcGkuTGlzdEl0ZW1zLmdldEl0ZW1zID0gZnVuY3Rpb24gKGxpc3ROYW1lKSB7XHJcbiAgICB2YXIgcXVlcnlVcmwgPSBfc3BQYWdlQ29udGV4dEluZm8ud2ViQWJzb2x1dGVVcmw7XHJcbiAgICBxdWVyeVVybCA9IHF1ZXJ5VXJsLmNvbmNhdCgnL19hcGkvd2ViL2xpc3RzL0dldEJ5VGl0bGUoXFwnJyk7XHJcbiAgICBxdWVyeVVybCA9IHF1ZXJ5VXJsLmNvbmNhdChsaXN0TmFtZSk7XHJcbiAgICBxdWVyeVVybCA9IHF1ZXJ5VXJsLmNvbmNhdCgnXFwnKS9pdGVtcycpO1xyXG5cclxuICAgIHJldHVybiAkanEuYWpheCh7XHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgdXJsOiBxdWVyeVVybCxcclxuICAgICAgICAgICAgdHlwZTogU1BBcGkuSHR0cE1ldGhvZHMuR2V0LFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjcm9zc0RvbWFpbjogdHJ1ZSxcclxuICAgICAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbjtvZGF0YT12ZXJib3NlJyxcclxuICAgICAgICAgICAgICAgICdYLVJlcXVlc3REaWdlc3QnOiBTUEFwaS5VdGlscy5nZXRGb3JtRGlnZXN0KCksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NmdWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogbnVsbCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHJlc3BvbnNlLmQucmVzdWx0cyxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzZnVsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiB4aHIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBudWxsLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG59O1xyXG5cclxuU1BBcGkuTGlzdEl0ZW1zLmdldEl0ZW1CeUlkID0gZnVuY3Rpb24gKGxpc3ROYW1lLCBpZCkge1xyXG4gICAgdmFyIHF1ZXJ5VXJsID0gX3NwUGFnZUNvbnRleHRJbmZvLndlYkFic29sdXRlVXJsO1xyXG4gICAgcXVlcnlVcmwgPSBxdWVyeVVybC5jb25jYXQoJy9fYXBpL3dlYi9saXN0cy9HZXRCeVRpdGxlKFxcJycpO1xyXG4gICAgcXVlcnlVcmwgPSBxdWVyeVVybC5jb25jYXQobGlzdE5hbWUpO1xyXG4gICAgcXVlcnlVcmwgPSBxdWVyeVVybC5jb25jYXQoJ1xcJykvaXRlbXMoJyk7XHJcbiAgICBxdWVyeVVybCA9IHF1ZXJ5VXJsLmNvbmNhdChpZCk7XHJcbiAgICBxdWVyeVVybCA9IHF1ZXJ5VXJsLmNvbmNhdCgnKScpO1xyXG5cclxuICAgIHJldHVybiAkanEuYWpheCh7XHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgdXJsOiBxdWVyeVVybCxcclxuICAgICAgICAgICAgdHlwZTogU1BBcGkuSHR0cE1ldGhvZHMuR2V0LFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjcm9zc0RvbWFpbjogdHJ1ZSxcclxuICAgICAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbjtvZGF0YT12ZXJib3NlJyxcclxuICAgICAgICAgICAgICAgICdYLVJlcXVlc3REaWdlc3QnOiBTUEFwaS5VdGlscy5nZXRGb3JtRGlnZXN0KCksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NmdWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogbnVsbCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHJlc3BvbnNlLmQsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnJvcikge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3VjY2Vzc2Z1bDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogeGhyLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogbnVsbCxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxufTtcclxuXHJcblNQQXBpLkxpc3RJdGVtcy5jcmVhdGVJdGVtID0gZnVuY3Rpb24gKGxpc3ROYW1lLCBwYXlsb2FkKSB7XHJcbiAgICB2YXIgcXVlcnlVcmwgPSBfc3BQYWdlQ29udGV4dEluZm8ud2ViQWJzb2x1dGVVcmw7XHJcbiAgICBxdWVyeVVybCA9IHF1ZXJ5VXJsLmNvbmNhdCgnL19hcGkvd2ViL2xpc3RzL0dldEJ5VGl0bGUoXFwnJyk7XHJcbiAgICBxdWVyeVVybCA9IHF1ZXJ5VXJsLmNvbmNhdChsaXN0TmFtZSk7XHJcbiAgICBxdWVyeVVybCA9IHF1ZXJ5VXJsLmNvbmNhdCgnXFwnKS9pdGVtcycpO1xyXG5cclxuICAgIHJldHVybiBTUEFwaS5MaXN0cy5nZXRCeVRpdGxlKGxpc3ROYW1lKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLnN1Y2Nlc3NmdWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGF5bG9hZC5fX21ldGFkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogcmVzcG9uc2UuZGF0YS5MaXN0SXRlbUVudGl0eVR5cGVGdWxsTmFtZSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAkanEuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogcXVlcnlVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogU1BBcGkuSHR0cE1ldGhvZHMuUG9zdCxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgIGNyb3NzRG9tYWluOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbjtvZGF0YT12ZXJib3NlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uO29kYXRhPXZlcmJvc2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0RGlnZXN0JzogU1BBcGkuVXRpbHMuZ2V0Rm9ybURpZ2VzdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc2Z1bDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHJlc3BvbnNlLmQsXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NmdWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogeGhyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxufTtcclxuXHJcblNQQXBpLkxpc3RJdGVtcy51cGRhdGVJdGVtID0gZnVuY3Rpb24gKGxpc3ROYW1lLCBpZCwgcGF5bG9hZCkge1xyXG4gICAgdmFyIHF1ZXJ5VXJsID0gX3NwUGFnZUNvbnRleHRJbmZvLndlYkFic29sdXRlVXJsO1xyXG4gICAgcXVlcnlVcmwgPSBxdWVyeVVybC5jb25jYXQoJy9fYXBpL3dlYi9saXN0cy9HZXRCeVRpdGxlKFxcJycpO1xyXG4gICAgcXVlcnlVcmwgPSBxdWVyeVVybC5jb25jYXQobGlzdE5hbWUpO1xyXG4gICAgcXVlcnlVcmwgPSBxdWVyeVVybC5jb25jYXQoJ1xcJykvaXRlbXMoJyk7XHJcbiAgICBxdWVyeVVybCA9IHF1ZXJ5VXJsLmNvbmNhdChpZCk7XHJcbiAgICBxdWVyeVVybCA9IHF1ZXJ5VXJsLmNvbmNhdCgnKScpO1xyXG5cclxuICAgIHJldHVybiBTUEFwaS5MaXN0cy5nZXRCeVRpdGxlKGxpc3ROYW1lKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLnN1Y2Nlc3NmdWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGF5bG9hZC5fX21ldGFkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogcmVzcG9uc2UuZGF0YS5MaXN0SXRlbUVudGl0eVR5cGVGdWxsTmFtZSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAkanEuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogcXVlcnlVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogU1BBcGkuSHR0cE1ldGhvZHMuUG9zdCxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgIGNyb3NzRG9tYWluOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbjtvZGF0YT12ZXJib3NlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uO29kYXRhPXZlcmJvc2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnSUYtTUFUQ0gnOiAnKicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdYLUhUVFAtTWV0aG9kJzogJ01FUkdFJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1gtUmVxdWVzdERpZ2VzdCc6IFNQQXBpLlV0aWxzLmdldEZvcm1EaWdlc3QoKSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NmdWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiByZXNwb25zZSxcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc2Z1bDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiB4aHIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG59O1xyXG5cclxuU1BBcGkuTGlzdEl0ZW1zLmRlbGV0ZUl0ZW0gPSBmdW5jdGlvbiAobGlzdE5hbWUsIGlkKSB7XHJcbiAgICB2YXIgcXVlcnlVcmwgPSBfc3BQYWdlQ29udGV4dEluZm8ud2ViQWJzb2x1dGVVcmw7XHJcbiAgICBxdWVyeVVybCA9IHF1ZXJ5VXJsLmNvbmNhdCgnL19hcGkvd2ViL2xpc3RzL0dldEJ5VGl0bGUoXFwnJyk7XHJcbiAgICBxdWVyeVVybCA9IHF1ZXJ5VXJsLmNvbmNhdChsaXN0TmFtZSk7XHJcbiAgICBxdWVyeVVybCA9IHF1ZXJ5VXJsLmNvbmNhdCgnXFwnKS9pdGVtcygnKTtcclxuICAgIHF1ZXJ5VXJsID0gcXVlcnlVcmwuY29uY2F0KGlkKTtcclxuICAgIHF1ZXJ5VXJsID0gcXVlcnlVcmwuY29uY2F0KCcpJyk7XHJcblxyXG4gICAgcmV0dXJuICRqcS5hamF4KHtcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB1cmw6IHF1ZXJ5VXJsLFxyXG4gICAgICAgICAgICB0eXBlOiBTUEFwaS5IdHRwTWV0aG9kcy5Qb3N0LFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjcm9zc0RvbWFpbjogdHJ1ZSxcclxuICAgICAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbjtvZGF0YT12ZXJib3NlJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjtvZGF0YT12ZXJib3NlJyxcclxuICAgICAgICAgICAgICAgICdJRi1NQVRDSCc6ICcqJyxcclxuICAgICAgICAgICAgICAgICdYLUhUVFAtTWV0aG9kJzogJ0RFTEVURScsXHJcbiAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0RGlnZXN0JzogU1BBcGkuVXRpbHMuZ2V0Rm9ybURpZ2VzdCgpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzZnVsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiByZXNwb25zZSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzZnVsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiB4aHIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBudWxsLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG59O1xyXG4iLCJTUEFwaS5MaXN0cyA9IFNQQXBpLkxpc3RzIHx8IHt9O1xyXG5cclxuU1BBcGkuTGlzdHMuZ2V0QnlJZCA9IGZ1bmN0aW9uIChsaXN0SWQpIHtcclxuICAgIHZhciBxdWVyeVVybCA9IF9zcFBhZ2VDb250ZXh0SW5mby53ZWJBYnNvbHV0ZVVybDtcclxuICAgIHF1ZXJ5VXJsID0gcXVlcnlVcmwuY29uY2F0KCcvX2FwaS93ZWIvbGlzdHMoZ3VpZFxcJycpO1xyXG4gICAgcXVlcnlVcmwgPSBxdWVyeVVybC5jb25jYXQobGlzdElkKTtcclxuICAgIHF1ZXJ5VXJsID0gcXVlcnlVcmwuY29uY2F0KCdcXCcpJyk7XHJcblxyXG4gICAgcmV0dXJuICRqcS5hamF4KHtcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB1cmw6IHF1ZXJ5VXJsLFxyXG4gICAgICAgICAgICB0eXBlOiBTUEFwaS5IdHRwTWV0aG9kcy5HZXQsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNyb3NzRG9tYWluOiB0cnVlLFxyXG4gICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uO29kYXRhPXZlcmJvc2UnLFxyXG4gICAgICAgICAgICAgICAgJ1gtUmVxdWVzdERpZ2VzdCc6IFNQQXBpLlV0aWxzLmdldEZvcm1EaWdlc3QoKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3VjY2Vzc2Z1bDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogcmVzcG9uc2UuZCxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzZnVsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiB4aHIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBudWxsLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG59O1xyXG5cclxuU1BBcGkuTGlzdHMuZ2V0QnlUaXRsZSA9IGZ1bmN0aW9uIChsaXN0TmFtZSkge1xyXG4gICAgdmFyIHF1ZXJ5VXJsID0gX3NwUGFnZUNvbnRleHRJbmZvLndlYkFic29sdXRlVXJsO1xyXG4gICAgcXVlcnlVcmwgPSBxdWVyeVVybC5jb25jYXQoJy9fYXBpL3dlYi9saXN0cy9HZXRCeVRpdGxlKFxcJycpO1xyXG4gICAgcXVlcnlVcmwgPSBxdWVyeVVybC5jb25jYXQobGlzdE5hbWUpO1xyXG4gICAgcXVlcnlVcmwgPSBxdWVyeVVybC5jb25jYXQoJ1xcJyknKTtcclxuXHJcbiAgICByZXR1cm4gJGpxLmFqYXgoe1xyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHVybDogcXVlcnlVcmwsXHJcbiAgICAgICAgICAgIHR5cGU6IFNQQXBpLkh0dHBNZXRob2RzLkdldCxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY3Jvc3NEb21haW46IHRydWUsXHJcbiAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb247b2RhdGE9dmVyYm9zZScsXHJcbiAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0RGlnZXN0JzogU1BBcGkuVXRpbHMuZ2V0Rm9ybURpZ2VzdCgpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzZnVsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiByZXNwb25zZS5kLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NmdWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IHhocixcclxuICAgICAgICAgICAgICAgIGRhdGE6IG51bGwsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbn07XHJcbiIsIlNQQXBpLlV0aWxzID0gU1BBcGkuVXRpbHMgfHwge307XHJcblxyXG5TUEFwaS5VdGlscy5nZXRGb3JtRGlnZXN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuICRqcSgnI19fUkVRVUVTVERJR0VTVCcpLnZhbCgpO1xyXG59O1xyXG4iXX0=
