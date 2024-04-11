<template>
  <div class="search-bar">
    <div class="toolbar">
      <Button icon="pi pi-arrow-left" severity="secondary" text rounded aria-label="Back" :disabled="!canGoBack" @click="$emit('go-back')" />
      <Button icon="pi pi-arrow-right" severity="secondary" text rounded aria-label="Forward" :disabled="!canGoForward" @click="$emit('go-forward')" />
      <Button icon="pi pi-refresh" severity="secondary" text rounded aria-label="Refresh" @click="$emit('reload-page')" />
    </div>
    <IconField class="p-icon-field p-icon-field-left" style="width: 100%;">
      <InputIcon class="pi pi-search p-input-icon" style="color: white;"/>
      <InputText v-model="url" placeholder="Search Google or Type URL" class="p-inputtext p-component custom-input" style="background-color: #212121;" @keyup.enter="navigate"/>
    </IconField>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useTabsStore } from '../stores/tabs';

const props = defineProps({
  canGoBack: {
    type: Boolean,
    default: false,
  },
  canGoForward: {
    type: Boolean,
    default: false,
  },
  changedUrl: {
    type: String,
    default: '',
  }
}); 

const emit = defineEmits(['reload-page', 'go-back', 'go-forward'])
const store = useTabsStore();

const url = ref()

const navigate = () => {
  if (url.value.trim() !== '') {
    const trimmedUrl = url.value.trim();
    const isUrl = /^https?:\/\//i.test(trimmedUrl);

    if (isUrl) {
        store.activeTab!.url = trimmedUrl;
        store.activeTab!.title = trimmedUrl;
    } else {
        store.activeTab!.url = `https://www.google.com/search?q=${url.value}`;
        store.activeTab!.title = `Search: ${trimmedUrl}`;
    }
  }
}

watch(
  () => store.activeTab,
  () => {
    url.value = store.activeTab!.url
  }
);

watch(
  () => props.changedUrl,
  () => {
    url.value = props.changedUrl
  }
);

</script>

<style scoped>
input {
  width: 100%;
}

.p-inputtext {
  border-radius: 30px;
  border-color: #212121;
  color: white;
}

.p-button.p-button-secondary.p-button-text {
  color: white;
}

.p-button.p-button-secondary.p-button-text:not(:disabled):hover {
  background: #212121
}

.p-inputtext::placeholder {
  color: white;
}

.p-inputtext:enabled:focus {
  outline: none
}

.toolbar {
  display: flex;
  gap: 10px;
}

.search-bar {
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
}
</style>