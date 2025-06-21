import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

export const useSpeechRecognition = () => {
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef(null);

    const startListening = () => {
        return new Promise((resolve, reject) => {
            if (!('webkitSpeechRecognition' in window)) {
                toast.error('Speech recognition not supported');
                return reject('Speech recognition not supported');
            }

            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onresult = (event) => {
                const result = event.results[0][0].transcript;
                setTranscript(result);
                resolve(result);
            };

            recognition.onerror = (event) => {
                console.error('Speech error:', event.error);
                toast.error(event.error);
                reject(event.error);
            };

            recognitionRef.current = recognition;
            recognition.start();
        });
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    const resetTranscript = () => setTranscript('');

    return { transcript, startListening, stopListening, resetTranscript };
};
