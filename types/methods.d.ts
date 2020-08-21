import Vue from 'vue';

export interface $h5 {
    /**
     * 谷歌统计事件
     */
    $ga(ec: string, ea:string, el:string): void,
    $ga(action: string, eventType: string, ec: string, ea: string, el: string, description: string, count: number): void,
    /**
     * 千分符转换
     */
    $thousands(str: string): string
}

declare module 'vue/types/vue' {
  interface Vue {
    $h5: $h5
  }
}

// export const Notify: Notify;
