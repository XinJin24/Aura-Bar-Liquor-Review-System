document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("messageModal");
    const btn = document.getElementById("messageBtn");
    const span = document.getElementsByClassName("close")[0];

    if (btn) {
        btn.onclick = function() {
            modal.style.display = "block";
        }
    }

    if (span) {
        span.onclick = function() {
            modal.style.display = "none";
        }
    }

    const messageForm = document.getElementById("messageForm");
    if (messageForm) {
        messageForm.onsubmit = function(e) {
            e.preventDefault();
            const message = this.message.value;

            $.ajax({
                type: "POST",
                url: "/sendMessage",
                data: { message: message },
                success: function(response) {
                    alert("Message sent successfully.");
                    modal.style.display = "none";
                },
                error: function(error) {
                    alert("Error sending message.");
                }
            });
        }
    }
});
