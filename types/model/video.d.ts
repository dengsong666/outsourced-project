interface Video {
  coverUrl: string
  price: number
  status: number
  updateTime: string
  videoName: string
  videoTimeLength: number
  videoUrl: string
}
interface Lang {
  id: number
  language: string,
  zhLanguage: string
}
interface Dub {
  audioUrl: string,
  demoText: string,
  gender: number
  id: number
  isAdvanced: number
  language: string,
  locale: string,
  name: string,
  price: number
  zhLanguage: string
}
interface VideoGenerate {
  sourceLanguageInfos: Lang[],
  targetLanguageInfos: Lang[],
  timbreInfosGroupedByLanguage: Record<string, Dub[]>
}