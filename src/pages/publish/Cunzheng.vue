<script lang='ts' setup>
import { getCopyRight, getUserPrivacy } from '@/apis'
import { useCommon } from '@/store'
import { showMsg, px2vw } from '@/utils'

const props = defineProps<{
  cunzhengShow: boolean,
  type: number
}>()
const { topbarH } = useCommon()
const emit = defineEmits(['submit'])
const copyright = reactive({
  list: [] as any[],
  show: false,
  showAuth: false,
  keyboardH: 0
})
// 获取填写人信息
onMounted(async () => {
  copyright.list = []
  const { idCard: rightHolderIdCard, realName: rightHolderName } = await getUserPrivacy()
  copyright.list.unshift({ rightHolderRoleId: (props.type - 1) || 1, rightHolderIdCard, rightHolderName, new: true })
})
watch(() => props.type, val => val == 1 && copyright.list.push({ rightHolderRoleId: 2, new: true }))
/**
 * 输入确认查询身份证/uid对应著作权人
 */
async function onConfirmInput() {
  for (let idx in copyright.list) {
    // 排除第一项
    if (+idx) {
      const { rightHolderIdCard, rightHolderUid, rightHolderRoleId } = copyright.list[idx]
      if (rightHolderRoleId) {
        if (rightHolderIdCard || rightHolderUid) {
          const { cardNo, realName, error, success } = await getCopyRight({ cardNo: rightHolderIdCard, userId: rightHolderUid })
          if (success) {
            +idx == 1 && (copyright.list[0].new = false) // 当填写完填写者之外的第1个著作权后，则填写者角色不再可更改
            copyright.list[idx].rightHolderIdCard = cardNo
            copyright.list[idx].rightHolderName = realName
            copyright.list[idx].new = false
          } else copyright.list[idx].error = error
        }
      } else showMsg('请选择著作权人角色')
    }
  }
}
/**
 * 提交所有著作权人
 */
async function onSubmit() {
  if (copyright.list.every(item => item.rightHolderName)) {
    copyright.show = false
    emit('submit', copyright.list)
  } else showMsg('著作权人姓名不能为空')
}
watchEffect(() => props.cunzhengShow && (copyright.show = true))
</script>

<script lang='ts'>
export default {
  options: {
    styleIsolation: 'shared'
  }
}
</script>

<template>
  <tn-popup :model-value="copyright.show" width="90%" height="95%">
    <div class="m16px">
      <template v-for="(item, idx) in copyright.list" :key="item.rightHolderName + idx">
        <div class="flex-row items-center justify-between" v-if="item.new || idx == 0">
          <h3 v-if="idx == 1" class="c-#333 font-500 my8px">
            请填写作{{ item.rightHolderRoleId == 1 ? '词' : '曲' }}人信息
          </h3>
          <h3 v-else class="c-#333 font-500 my8px">请添加著作权人</h3>
          <text v-show="idx" class="iconfont icon-delete" @click="copyright.list.splice(idx, 1)"></text>
        </div>
        <div class="p16px bd-1-default rd-8px my16px bg-#F5F8FF text-14px">
          <tn-radio-group v-if="item.new && idx != 1" v-model="item.rightHolderRoleId" :disabled="type != 1 && !idx"
            @change="idx || (copyright.list[1].rightHolderRoleId = ($event == 1 ? 2 : 1))">
            <div class="flex-row">
              <tn-radio :label="1">{{ idx ? 'ta' : '我' }}是作词人</tn-radio>
              <tn-radio :label="2">{{ idx ? 'ta' : '我' }}是作曲人</tn-radio>
            </div>
          </tn-radio-group>
          <text v-if="!item.new">{{ idx ? 'ta' : '我' }}是作{{ item.rightHolderRoleId == 1 ? '词' : '曲' }}人</text>
          <div class="py4px" border="b-1 b-solid b-#E0E9FF">
            姓名： <text v-if="item.rightHolderName">{{ item.rightHolderName }}</text>
            <template v-else-if="item.error">
              <text class="c-#EE3535">{{ item.error }}</text>
              <!-- <text class="c-#EE3535">该用户尚未完成实名认证</text> -->
            </template>
          </div>
          <text v-if="item.new && idx" class="c-#EE3535">以下两项输入其中一项即可</text>
          <tn-form label-width="84px" label-position="left">
            <tn-form-item label="身份证号码：" prop="idCard">
              <tn-input v-model="item.rightHolderIdCard" placeholder="请输入身份证号码" :border="false"
                :disabled="!item.new || !idx" @confirm="onConfirmInput">
                <template #suffix>
                  <text v-if="item.new && idx" class="iconfont icon-edit c-default"></text>
                </template>
              </tn-input>
            </tn-form-item>
            <tn-form-item v-if="item.new && idx" label="uid：" prop="idCard">
              <tn-input v-model="item.rightHolderUid" placeholder="请输入uid" :border="false" :disabled="!item.new || !idx"
                @confirm="onConfirmInput">
                <template #suffix>
                  <text v-if="item.new && idx" class="iconfont icon-edit c-default"></text>
                </template>
              </tn-input>
            </tn-form-item>
          </tn-form>
        </div>
      </template>
      <div class="center rd-8px font-500 b-1 b-dashed b-default py10px c-default" @click="copyright.list.push({ new: true })">
        <text class="iconfont icon-add">添加著作权人</text>
      </div>
      <div class="flex-row px16px gap-16px justify-between mt16px">
        <text class="flex-1 text-center bg-#F4F4F4 p8px rd-8px" @click="copyright.show = false">取消</text>
        <text class="flex-1 text-center bg-default p8px rd-8px c-#fff" @click="onSubmit">确定</text>
      </div>
    </div>
  </tn-popup>
  <tn-popup v-model="copyright.showAuth" width="80%">
    <div class="my16px">
      您尚未填写实名认证信息，请到【我的】-【实名认证】中进行实名认证。
    </div>
    <text class="center bg-default w116px p8px c-#fff rd-8px mxauto my16px" @click="onSubmit"> 去认证 </text>
  </tn-popup>
</template>

<style scoped lang='scss'>
:deep(.tn-popup) {
  top: v-bind(px2vw(topbarH)) !important;

  .tn-popup__content {
    overflow-y: auto !important;

    .tn-form-item {
      font-size: 14px;
      padding: 4px 0 !important;
      margin-bottom: 0;
      border-color: #E0E9FF;

      &__label {
        padding-right: 0 !important;
      }

      .tn-input {
        padding: 0 1px;

        &--disabled {
          background-color: unset !important;
        }
      }
    }

    .tn-radio {
      padding-left: 0 !important;
    }
  }

}
</style>