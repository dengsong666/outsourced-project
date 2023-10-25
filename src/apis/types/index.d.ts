interface Works {
  collectionId?: number,
  competitionAutoEndTime?: string,
  competitionContact?: string,
  competitionRewardAmount?: number,
  content: string,
  isBlockChain: number,
  isCompetition: number,
  isPond: number,
  musicId?: number,
  musicStyleIdList?: number[],
  musicTypeId: number,
  name: string,
  rightHolderDataList?: any[]
}

interface Page {
  pageNum: number;
  pageSize: number
}

type Item = YuTangItem & BiGaoItem