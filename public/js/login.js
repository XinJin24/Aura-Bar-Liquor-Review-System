$(document).ready(function() {
    $('#login_form').on('submit', function(e) {
        e.preventDefault();

        $('#error').empty().addClass('hidden-div');

        const emailAddress = $('#emailAddressInput').val();
        const password = $('#passwordInput').val();

        $.ajax({
            type: "POST",
            url: "/checkLogin",
            data: {
                userEmail:emailAddress,
                password: password
            },
            success: function(response) {
                $('#login_form').unbind('submit').submit();
            },
            error: function(error) {
                $('#error').text("Password or email address is incorrect!").removeClass('hidden-div');
            }
        });
    });
});
