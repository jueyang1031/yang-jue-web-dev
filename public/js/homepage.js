/**
 * Created by yangjue on 5/31/16.
 */
(function () {

    var messages = [
        "Northeastern Student",
        "Full Stack Developer",
        "Minecraft Enthusiast",
        "Nature lover"
    ];

    function nextMsg(i) {
            $('#introMessage').html(messages[i]).fadeIn(550).delay(450);

    };


    function init() {
        var i = 0;
        setInterval(introMessage, 2000);
        function introMessage() {
            if (i === messages.length) i = 0;
            $('#introMessage').hide();
            nextMsg(i);
            ++i;
        }

    }
    $(init);

})();