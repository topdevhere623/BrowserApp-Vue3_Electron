<template>
  <TabPanel header="Header I">
    <SearchBar :changedUrl="changedUrl" :canGoBack="canGoBack" :canGoForward="canGoForward" @reload-page="reloadPage" @go-back="goBack" @go-forward="goForward" />
    <Divider />
    <WebView ref="webviewRef" :src="tab.url" style="width:100%; height:100vh !important" />
  </TabPanel>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import SearchBar from './SearchBar.vue';
import { useTabsStore } from '../stores/tabs';

const props = defineProps({
  tab: {
    type: Object,
    default: () => {},
  }
});

const store = useTabsStore();

onMounted(() => {
  const webviewElement = webviewRef.value;

  if(webviewElement) {
    webviewElement.addEventListener('did-navigate', (event: any) => {
      handleEventListener(event)
    });
  
    webviewElement.addEventListener('did-navigate-in-page', (event: any) => {
      handleEventListener(event)
    });
  
    webviewElement.addEventListener('dom-ready', () => {
      //
    });
  }
});

const webviewRef = ref(null)
const canGoBack = ref(false)
const canGoForward = ref(false)
const changedUrl = ref()

const reloadPage = () => {
  const webviewElement = webviewRef.value;
  if (webviewElement) {
    webviewElement.reload();
  }
}

const handleEventListener = (event: any) => {
  const webviewElement = webviewRef.value;
  if(webviewElement) {
    changedUrl.value = event.url
    store.tabs.find(t => t.id === props.tab.id)!.url = event.url
    canGoBack.value = webviewElement.canGoBack()
    canGoForward.value = webviewElement.canGoForward()
  }
}

const goBack = () => {
  const webviewElement = webviewRef.value;
  if (webviewElement) {
    webviewElement.goBack();
  }
}

const goForward = () => {
  const webviewElement = webviewRef.value;
  if (webviewElement) {
    webviewElement.goForward();
  }
}

</script>