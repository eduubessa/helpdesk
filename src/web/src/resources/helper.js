'use strict'

module.exports = {
    methods: {
        audioMicrophoneRecording: function () {
            return new Promise(resolve => {
                navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
                    let chunks = [];
                    const mediaRecorder = new MediaRecorder(stream);

                    mediaRecorder.onstop = () => {
                        let blob = new Blob(chunks);
                        let audio = document.createElement("audio");
                        audio.src = URL.createObjectURL(blob);
                        audio.controls = true;
                        audio.play();
                    };

                    mediaRecorder.ondataavailable = (event) => {
                        if(event.data.size > 0){
                            chunks.push(event.data);
                            // eslint-disable-next-line no-console
                            console.log(mediaRecorder.state)
                            setTimeout(() => {
                                mediaRecorder.stop()
                            }, 1000);
                        }
                    }

                    const start = () => {
                        mediaRecorder.start(200);
                        // eslint-disable-next-line no-console
                        console.log(mediaRecorder.state);
                    }

                    const stop = () => {
                        if(mediaRecorder.state !== "inactive") {
                            mediaRecorder.stop();
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
