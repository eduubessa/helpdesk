'use strict'

module.exports = {
    methods: {
        audioMicrophoneRecording: function () {
            return new Promise(resolve => {
                navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
                    let chunks = [];
                    const mediaRecorder = new MediaRecorder(stream);

                    const start = () => {
                        mediaRecorder.start(5000);
                        // eslint-disable-next-line no-console
                        console.log("Recorder started!");
                    }

                    const stop = () => {
                        if(mediaRecorder.state === "recording") {
                            // eslint-disable-next-line no-console
                            console.log("Recorder stopped!")
                            mediaRecorder.stop();
                            mediaRecorder.stream.stop();
                        }
                    }

                    // eslint-disable-next-line no-unused-vars
                    mediaRecorder.onstop = (event) => {
                        // eslint-disable-next-line no-console
                        console.log("On Stop!");
                        let audio = document.createElement("audio");
                        let blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus'});

                        chunks = [];

                        let audio_url = window.URL.createObjectURL(blob);
                        audio.src = audio_url;
                        audio.play();
                    };

                    mediaRecorder.ondataavailable = (event) => {
                        chunks.push(event.data);
                        // eslint-disable-next-line no-console
                        console.log(chunks);
                        // eslint-disable-next-line no-console
                        console.log(mediaRecorder.state);

                        if(mediaRecorder.state == "recording") {
                            setTimeout(function () {
                                mediaRecorder.stop();
                            }, 5000);
                        }
                    }


                    resolve({start, stop})
                }).catch((err) => {
                    // eslint-disable-next-line no-console
                    console.error(err);
                })
            });
        }
    }
}
