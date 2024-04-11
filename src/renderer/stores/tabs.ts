import { defineStore } from 'pinia';
import { Tab as TabType } from '../types/types';

export const useTabsStore = defineStore('tabs', {
    state: () => ({
        tabs: [] as TabType[],
        activeTab: null as TabType | null,
        activeTabIndex: 0
    }),
    actions: {
        // increment(option) {
        //     this.options[option]++;
        // },
    },
    getters: {
        // totalClicks() {
        //     return Object.values(this.options).reduce((total, current) => {
        //         return total + current;
        //     }, 0);
        // },
    },
});