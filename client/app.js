function onPageLoad() {
    console.log('doc loaded');
    const url = 'http://127.0.0.1:3000/get_loc_names';

    $.get(url, function(data, status) {
        console.log('got locations');

        if (data) {
            const locations = data.locations;
            const locationSelect = $('#locationSelect');
            locationSelect.empty();

            locations.forEach(function(location) {
                const opt = new Option(location);
                locationSelect.append(opt);
            });
        }
    });
}

$(document).ready(function() {
    onPageLoad();
});
