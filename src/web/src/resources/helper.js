'use strict'

module.exports = {
    methods: {
        audioMicrophoneRecording: function () {
            return new Promise(resolve => {
                navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
                    const mediaRecorder = new MediaRecorder(stream);

                    const start = () => {
                        mediaRecorder.start();

                        // eslint-disable-next-line no-console
                        console.log(mediaRecorder.state);
                    }

                    const stop = () => {
                        mediaRecorder.stop()
                        // eslint-disable-next-line no-console
                        console.log(mediaRecorder.state);
                    };

                    mediaRecorder.addEventListener("dataavailable", (event) => {
                        let blob = new Blob(event.data);
                        let audio = document.createELement("audio");
                        audio.src = URL.createObjectURL(blob);
                        audio.controls = true;
                        audio.play();
                    });

                    resolve({start, stop})
                });
            });
        }
    }
}
