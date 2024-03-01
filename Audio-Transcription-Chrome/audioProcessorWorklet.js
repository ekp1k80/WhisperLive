// audio-converter-worklet.js
class AudioProcessorWorklet extends AudioWorkletProcessor {
  constructor(options) {
    super(options);
    // Inicializa tus variables aquí
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];

    // Maneja el procesamiento del audio aquí

    // Cuando el buffer esté lleno, convierte la frecuencia de muestreo
    if (bufferIsFull(input)) {
      // Realiza la conversión de frecuencia de muestreo
      const convertedAudio = convertSampleRate(input, 44100, 16000);
      
      this.port.postMessage(convertedAudio);

      // Envía el audio convertido al destino de salida
      output.forEach(channel => {
        channel.set(convertedAudio);
      });

      return true; // Indica que hemos procesado el audio
    }

    // Si el buffer no está lleno, simplemente pasa el audio sin modificarlo
    output.forEach(channel => {
      channel.set(input[0]);
    });

    return true; // Indica que hemos procesado el audio
  }
}

registerProcessor('audio-processor-worklet', AudioProcessorWorklet);
