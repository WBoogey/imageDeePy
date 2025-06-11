// composables/useCameraCapture.ts
import { ref } from 'vue'

export function useCameraCapture() {
  const videoRef = ref<HTMLVideoElement | null>(null)
  const preview = ref<string | null>(null)
  const selectedFile = ref<File | null>(null)

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.value) {
        videoRef.value.srcObject = stream
      }
    } catch (e) {
      console.error('Erreur accès caméra', e)
    }
  }

  function stopCamera() {
    const stream = videoRef.value?.srcObject as MediaStream
    stream?.getTracks().forEach(track => track.stop())
  }

  function capturePhoto() {
    const video = videoRef.value
    if (!video) return

    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d')?.drawImage(video, 0, 0)

    canvas.toBlob(blob => {
      if (blob) {
        selectedFile.value = new File([blob], 'capture.jpg', { type: 'image/jpeg' })
        preview.value = URL.createObjectURL(blob)
      }
    }, 'image/jpeg')
  }

  return {
    videoRef,
    preview,
    selectedFile,
    startCamera,
    stopCamera,
    capturePhoto,
  }
}
