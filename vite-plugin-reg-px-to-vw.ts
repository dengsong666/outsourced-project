import { Plugin } from 'vite';
const defaultOptions = {
  unitPrecision: 5, // 转换后的精度，即小数点位数
  viewportWidth: 375, // UI设计稿的宽度
  minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
}
export default (options: Partial<typeof defaultOptions> = defaultOptions): Plugin => {
  const { viewportWidth, unitPrecision, minPixelValue } = options
  return {
    name: 'reg-px-to-vw',
    transformIndexHtml(html) {
      const matchs = html.match(/-?\d*\.?\d+px/g) ?? []
      const pxTovw = (px: string) => {
        const num = parseFloat(px)
        return num < minPixelValue! ? px : `${(num / viewportWidth! * 100).toFixed(unitPrecision)}vw`
      }
      matchs.forEach(match => html = html.replace(match, pxTovw(match)))
      return html;
    },
  };
};