<script setup lang="ts">
import { onMounted } from 'vue';
import Tab from './components/Tab.vue';
import { Tab as TabType } from './types/types';
import { useTabsStore } from './stores/tabs';

const store = useTabsStore();

onMounted(() => {
  if(!store.tabs.length) {
    createNewTab()
  }
})

const tabClicked = (originalEvent: any) => {
  //opening new tab
  if(store.tabs.length === originalEvent.index) {
    createNewTab()
  } else {
    store.activeTab = store.tabs[originalEvent.index]
  }
}

const createNewTab = () => {
  const newTab: TabType = {
    id: Date.now(),
    title: 'New Tab',
    url: 'https://google.com'
  };
  store.tabs.push(newTab)
  store.activeTab = newTab
}

const closeTab = (tabId: number) => {
  const index = store.tabs.findIndex(t => t.id === tabId);
  if (index !== -1 && store.tabs.length > 1) {
    store.tabs.splice(index, 1);
    if (store.activeTab && store.activeTab.id === tabId) {
      store.activeTab = store.tabs.length ? store.tabs[store.activeTabIndex - 1] : null;
      store.activeTabIndex = store.tabs.length - 1
    }
  }
}

</script>

<template>
  <div class="browser-card">
    <TabView v-model:activeIndex="store.activeTabIndex" :scrollable="true" :pt="{ inkbar: { style: 'background: transparent' } }" @tab-click="tabClicked">
      <TabPanel v-for="tab in store.tabs" :key="tab.id" :header="tab.title">
        <template #header>
          <div class="flex align-items-center gap-2">
            <div class="close-icon-content" @click.prevent.stop="closeTab(tab.id)">
              <span class="pi pi-times close-icon"></span>
            </div>
          </div>
        </template>
        <Tab :tab="tab" />
      </TabPanel>
      <TabPanel>
        <template #header>
          <div class="flex align-items-center gap-2">
            <span class="pi pi-plus plus-icon"></span>
          </div>
        </template>
      </TabPanel>
    </TabView>
  </div>
</template>

<style>
.p-tabview-title.add-new {
  font-size: 20px !important;
}
</style>