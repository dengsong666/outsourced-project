import { addLatelyPlay } from "@/apis"
import { showMsg, storage } from "./common"

let audioCtx: UniApp.InnerAudioContext
const player = reactive({
  music: {} as any,
  currentTime: 0,
  duration: 0,
  paused: true,
  list: new Set(),
})

const bgAudioCtx = uni.createInnerAudioContext()
bgAudioCtx.src = "https://youyu-music.oss-cn-beijing.aliyuncs.com/audioWatermarking/%E6%9C%89%E9%B1%BC%E9%9F%B3%E4%B9%90%E6%B0%B4%E5%8D%B0.mp3"
bgAudioCtx.loop = true
export function usePlayer() {
  if (!audioCtx) {
    audioCtx = uni.createInnerAudioContext()
    audioCtx.onCanplay((res: any) => {
      console.log('onCanplay')
      console.log(audioCtx.src) // 不要删，触发进度监听
    })
    audioCtx.onTimeUpdate((res: any) => {
      player.currentTime = audioCtx.currentTime
      player.duration = audioCtx.duration
    })
    audioCtx.onPlay(async () => {
      if (!player.list.has(player.music?.id) && storage.get('token')) {
        player.list.add(player.music?.id)
        const { success } = await addLatelyPlay({ worksId: player.music.id })
      }
      bgAudioCtx.play()
    })
    audioCtx.onStop(bgAudioCtx.stop)
    audioCtx.onPause(bgAudioCtx.pause)
    audioCtx.onError(console.error)
  }
  const onPlay = (music = player.music, repeat = false) => {
    console.log(player.music,music,player.paused)
    if (music?.musicUrl && music?.id) {
      audioCtx.src = music?.musicUrl
      player.paused = (player.music?.id == music?.id && !repeat) ? !player.paused : false // 相等状态反转，不等状态播放
      player.paused ? (player.music?.id == music?.id ? audioCtx.pause() : audioCtx.stop()) : audioCtx.play()
      player.music = music
    } else showMsg('请选择有效音乐')
  }
  return { player, onPlay, audioCtx }
} 