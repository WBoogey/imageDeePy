<script setup lang="ts">
import { useCameraCapture } from '@/composables/useCameraCapture'
const {
  videoRef,
  preview,
  selectedFile,
  startCamera,
  stopCamera,
  capturePhoto
} = useCameraCapture()

onMounted(() => startCamera())
onUnmounted(() => stopCamera())
</script>
