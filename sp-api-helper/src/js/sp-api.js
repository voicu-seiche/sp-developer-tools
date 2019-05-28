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
