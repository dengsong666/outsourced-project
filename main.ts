export { }
const audioPlayer = new Audio("https://ds-blog.s3.bitiful.net/static/倒带.mp3")
const lyricsContainer = document.getElementById('lyrics');
const cover = document.getElementById('cover');
document.onclick = () => audioPlayer.play()
// 加载 LRC 歌词文件
cover && lyricsContainer && fetch("https://ds-blog.s3.bitiful.net/static/倒带.lrc")
  .then(response => response.text())
  .then(data => {
    const lines = data.split('\r');
    const lyrics: string[] = [];
    // 解析时间戳
    const timestamps: number[] = [];
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
    // audioPlayer.play();
    audioPlayer.onplay = () => {
      cover.classList.add('cover-playing')
    };
    audioPlayer.ontimeupdate = function () {
      const currentLine = timestamps.findIndex(timestamp => timestamp >= audioPlayer.currentTime)
      currentLine >= 2 && (lyricBox[currentLine - 2].style.fontSize = '1em')
      currentLine >= 1 && (lyricBox[currentLine - 1].style.fontSize = '1.3em')
      currentLine >= 3 && (lyricsContainer.scrollTop = lyricBox[currentLine - 3].offsetTop)
    }
    audioPlayer.onpause = () => {
      cover.classList.remove('cover-playing')
    };
  });
