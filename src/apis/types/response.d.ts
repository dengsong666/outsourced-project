interface UserInfo {
  avatarUrl: string
  cumulativeHookCount: number
  cumulativeHookedCount: number
  fishTankGross: number
  fishTankSurplusPercent: number
  fishhookSurplus: number
  nickName: string
  contractWeChat: string
  contractPhone: string
  phone: string
  userId: string
}
interface Pages<T> {
  dataList: T[],
  pageIndex: number
  pageSize: number
  totalCount: number
}
interface FishTankPackage {
  fishhookNumber: number,
  id: number,
  name: string,
  tankSize: number
}
interface YuTangItem {
  id: number,
  content: string
  createTime: string
  updateTime: string
  content: string
  content: string
  musicTypeId: number,
  isAuthor: number
  isHook: number
  isVisible: number
  isEvidence: number,
  isLike: number,
  isPlay: boolean,
  isReserved: boolean,
  isFishpond: boolean,
  isRecommend: boolean,
  isMusicStyleTag: number,
  isTimeLimit: number,
  likeCount: number,
  likeCountInRecentDays: number,
  musicStyleTagList: string[],
  musicUrl: string,
  timeLimitEndTime: string,
  name: string,
  serialNumber: number
}
interface Config {
  depositFishHookNum: number,
  draftEndDayLimit: number,
  draftMinAmount: number,
  fishPondTotalCapacity: number,
  limitFishSpeciesCostFishHookNum: number,
  limitFishSpeciesSurvivalDays: number,
  recommendCycle: number,
  recommendCostFishHookNum: number,
  reserveCostFishHookNum: number,
  styleTagNumLimit: number
}
interface BiGaoItem {
  draftTypeTag: '填词' | '作曲' | '收歌',
  draftType: number,
  draftStartTime: string,
  draftEndTime: string,
  id: number,
  isAuthor: number,
  isEvidence: number,
  isShowTodayDraftEnd: number,
  joinDraftCount: number,
  name: string,
  rewardFishHookCount: number,
  serialNumber: number,
  content: string,
  contributeCount: number,
  isDraftEnd: number,
  musicUrl: string,
}

interface ExtraMyDetails {
  contributeCount: number,
  contributeIndex: number,
  id: number,
  isMark: number,
  isRead: number,
  lyric: string,
  musicUrl: string,
  name: string
}

interface ExtraDetails {
  contributeDetailsDataList: {
    contributeCount: number,
    contributeIndex: number,
    id: number,
    lyric: string,
    musicUrl: string,
    name: string
  }[],
  isSubmit: number
}