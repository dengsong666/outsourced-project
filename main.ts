export { }
const audioPlayer = new Audio("https://ds-blog.s3.bitiful.net/倒带.mp3")
console.log(navigator.mediaDevices)
navigator.mediaDevices.getDisplayMedia({
  video: {
    width: { ideal: 1920, max: 1920 },
    height: { ideal: 1080, max: 1080 }
  }, audio: true
}).then(stream => {
  const recoder = new MediaRecorder(stream);
  const lyricsContainer = document.getElementById('lyricsContainer');
  const cover = document.getElementById('cover');
  // 加载 LRC 歌词文件
  lyricsContainer && fetch("https://ds-blog.s3.bitiful.net/倒带.lrc")
    .then(response => response.text())
    .then(data => {
      const lines = data.split('\r');
      const lyrics: string[] = [];
      // 解析时间戳
      const timestamps: number[] = [];
      let recordedChunks: Blob[] = [];
      lines.forEach(line => {
        const match = line.match(/\[(\d+):(\d+)\.(\d+)\] (.*)/);
        if (match) {
          const [_, minute, second, millisecond, lyric] = match;
          const time = parseInt(minute) * 60 + parseFloat(second) + parseFloat(millisecond) / 1000;
          timestamps.push(time);
          lyrics.push(`<div>${lyric}</div>`);
        }
      });
      // 同步歌词显示
      lyricsContainer.innerHTML = lyrics.join('');
      const lyricBox = lyricsContainer.querySelectorAll('div');
      audioPlayer.play();
      audioPlayer.onplay = () => {
        cover.classList.add('cover-playing')
        recoder.start();
      };
      audioPlayer.ontimeupdate = function () {
        const currentLine = timestamps.findIndex(timestamp => timestamp >= audioPlayer.currentTime)
        lyricsContainer.scrollTop = lyricBox[currentLine - 1].offsetTop;
      }
      audioPlayer.onpause = () => {
        cover.classList.remove('cover-playing')
        recoder.stop();
      };
      recoder.ondataavailable = (event) => event.data.size > 0 && recordedChunks.push(event.data);
      recoder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/mp4' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = "test.mp4";
        link.click();
        URL.revokeObjectURL(link.href);
      }
    });
}).catch(error => console.error(error));
