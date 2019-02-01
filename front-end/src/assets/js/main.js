$(document).ready(function () {
    $("#services ul li a").click(function (event) {
        event.preventDefault();
    });

    // Map behaviour
    $('#map').addClass('off');
    $('#map')
        .click(function () {
            $(this).removeClass('off')
        })
        .mouseleave(function () {
            $(this).addClass('off')
        });
});