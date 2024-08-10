import { defineConfig, presetAttributify, presetIcons, presetUno, presetMini } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetMini(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
        width: '24px',
        height: '24px'
      },
      collections: {
        custom: {
          wechatpay: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 3C6.656 3 2 6.643 2 11.5c0 2.798 1.577 5.223 3.906 6.744c.174.383.143.852.115 1.293c-.01.16-.021.316-.021.463a1 1 0 0 0 1 1c1.25 0 2.071-.411 2.639-.81c.197-.14.357-.272.45-.345q.93.154 1.911.155c5.344 0 10-3.643 10-8.5a7.43 7.43 0 0 0-.96-3.658l-.003.002l-11 7a1 1 0 0 1-1.405-.348l-2-3.5a1 1 0 0 1 1.383-1.353l1.58.947a1 1 0 0 0 .944.046l9.297-4.427C17.974 4.228 15.103 3 12 3"/></g></svg>',
          alipay: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M25.609 2H6.392a4.387 4.387 0 0 0-4.391 4.391v19.217a4.387 4.387 0 0 0 4.391 4.391h19.217A4.398 4.398 0 0 0 30 25.649c-2.873-1.601-6.912-3.771-10.725-5.527c-2.004 2.748-5.258 5.063-9.289 5.063c-4.412 0-5.858-2.831-6.065-4.773c-.248-2.438.93-5.094 6.22-5.094c2.211 0 4.959.641 7.946 1.56c1.033-1.881 1.653-3.771 1.653-3.771H8.603v-1.044h5.755V10.11h-6.84V8.922h6.84V5.771h3.183v3.151h6.84v1.188H17.54v1.953h5.548s-.95 2.914-2.397 5.682c3.058 1.044 6.25 2.252 9.289 3.296V6.39a4.377 4.377 0 0 0-4.371-4.391zM4.955 20.184c.062 1.261.641 3.358 4.371 3.358c3.254 0 5.786-2.48 7.367-4.556c-2.789-1.167-5.28-1.963-6.84-1.963c-4.216 0-4.96 2.066-4.897 3.161z"/></svg>',
          upload: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16zm-5 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/></svg>',
          download: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/></svg>',
        }
      },
      customizations: {
        transform(svg) {
          return svg.replace(/#ffffff/, 'currentColor')
        }
      }
    })
  ],
  safelist: ['setting', 'dashboard', 'notification', 'menu', 'apartment', 'key', 'usergroup-add', 'user', 'info-circle', 'like'].map((icon) => `i-ant-design-${icon}-outlined`),
  theme: {
    colors: {
      default: '#4700FF',
      success: '#67C23A',
      warning: '#E6A23C',
      danger: '#F56C6C',
      info: '#909399'
    }
  },
  shortcuts: [
    ['flex-row', 'flex flex-row'],
    ['flex-col', 'flex flex-col'],
    ['flex-center', 'flex justify-center items-center'],
    ['grid-center', 'grid place-items-center'],
    ['e-auto', 'pointer-events-auto'],
    ['operate', 'm8px c-default cursor-pointer'],
    ['add-btn', 'flex-center bg-#363b64 p8px rd-10px ml-auto']
  ],
  rules: [
    ['absolute-center', { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }],
    ['nowrap', { 'white-space': 'nowrap' }],
    ['pointer-events', { 'white-space': 'nowrap' }],
    [/^pointer-(\w+)$/, ([, w]) => ({ 'pointer-events': w })],
    [/^wh-(\d+)(\w+|%)$/, ([, d, w]) => ({ width: `${d + w}`, height: `${d + w}` })],
    [/^bd-(\d+)-(#\w+)$/, ([, d, w]) => ({ border: `${d}px solid ${w}` })],
    [/^grid-(\d)-(\d)-(\d+)$/, ([, d1, d2, d3]) => ({ display: 'grid', 'grid-template-rows': `repeat(${d1}, 1fr)`, 'grid-template-columns': `repeat(${d2}, 1fr)`, gap: `${d3}px` })]
  ]
})
