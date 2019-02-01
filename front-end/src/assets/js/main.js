$(document).ready(function () {

    // Map behaviour
    $('#map').addClass('off');
    $('#map')
        .click(function () {
            $(this).removeClass('off')
        })
        .mouseleave(function () {
            $(this).addClass('off')
        });

    // Smooth Scroll 
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
    
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 600);
    });
    $("#services ul li a").click(function (event) {
        event.preventDefault();
    });

});

