        var videoStream = null;
        var video = document.getElementById("video");

        // Поддержка браузером
        window.navigator = window.navigator || {};
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            null;

        if (navigator.getUserMedia === null) {
            document.getElementById('gum-unsupported').classList.remove('hidden');
            document.getElementById('button-play-gum').setAttribute('disabled', 'disabled');
            document.getElementById('button-stop-gum').setAttribute('disabled', 'disabled');
        } else {
            // Опера <= 12.16 принимает direct stream.
            // Подробнее об этом здесь: http://dev.opera.com/articles/view/playing-with-html5-video-and-getusermedia-support/
            var createSrc = window.URL ? window.URL.createObjectURL : function(stream) {
                return stream;
            };

            // Опера <= 12.16 поддерживает только видео.
            var audioContext = window.AudioContext ||
                window.webkitAudioContext ||
                null;
            if (audioContext === null) {
                document.getElementById('gum-partially-supported').classList.remove('hidden');
            }

            (function() {
                // Захват аудио и видео с устройства пользователя 
                navigator.getUserMedia({
                        video: true,
                        audio: false
                    },
                    function(stream) {
                        videoStream = stream;
                        // Stream the data
                        video.src = createSrc(stream);
                        video.play();
                    },
                    function(error) {
                        console.log("Ошибка захвата видео: ", error.code);
                    });
            })();
        }
