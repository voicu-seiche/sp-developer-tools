SPApi.Utils = SPApi.Utils || {};

SPApi.Utils.getFormDigest = function () {
    return $jq('#__REQUESTDIGEST').val();
};
