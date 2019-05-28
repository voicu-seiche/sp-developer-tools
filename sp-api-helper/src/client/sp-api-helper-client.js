var $jq = jQuery.noConflict();

Type.registerNamespace('SPApiClient');
var SPApiClient = SPApiClient || {};

$jq(document).ready(function () {
    $jq('#testButton').on('click', function () {
        try {
            SPApi.Lists.getById('265e3b05-3e10-4696-b55f-9ff86b42436d')
                .then(function (response) {
                    $jq('#resultArea').css('color', 'black');
                    var message = 'No response received.';
                    if (response.successful) {
                        if (response.data) {
                            message = JSON.stringify(response.data, undefined, 4);
                        }
                    } else {
                        message = JSON.stringify(response.error, undefined, 4);
                        $jq('#resultArea').css('color', 'red');
                    }
                    $jq('#resultArea').html(message);
                });
        } catch (error) {
            $jq('#resultArea').html(error.stack);
            $jq('#resultArea').css('color', 'red');
        }
    });

    $jq('#clearButton').on('click', function () {
        $jq('#resultArea').html('');
        $jq('#resultArea').css('color', 'black');
    })
})
