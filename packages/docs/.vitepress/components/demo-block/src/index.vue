<script setup>
import { computed, onMounted, ref } from 'vue';

import { render } from 'solid-js/web';
import { createComponent as _$createComponent } from 'solid-js/web';

import { IconCode, IconCopy } from 'arco-solid-icon';
import { CopyClickBoard, message } from 'arco-design-solid';
const modules = import.meta.glob('../../../../example/**/*.tsx');

const props = defineProps({
  src: {
    type: String,
  },
  github: {
    type: String,
  },
  source: {
    type: String,
    default: '',
  },
});

let comp = null;
const el = ref();
const expand = ref();
const copy = ref();
const code = computed(() => decodeURIComponent(props.source));
const handleCopy = () => {
  CopyClickBoard.$copy(code.value);
  message.success('复制成功');
};
onMounted(async () => {
  const path = `../../../../example/${props.src}`;
  comp = await modules[path]();
  render(() => _$createComponent(comp.default, {}), el.value);
  render(() => _$createComponent(IconCode, { class: 's-expand-icon' }), expand.value);

  render(() => _$createComponent(IconCopy, { class: 's-expand-icon', copyText: code }), copy.value);
});
const showCode = ref(false);
const handleClick = () => {
  showCode.value = !showCode.value;
};
</script>

<template>
  <ClientOnly>
    <div class="s-panel-container">
      <div class="s-panel-solid-render-container">
        <div ref="el"></div>
      </div>
      <div class="s-panel-code-operate">
        <div class="s-panel-operate">
          <span class="s-expand-icon" @click="handleClick" ref="expand"></span>
          <span class="s-expand-icon" @click="handleCopy" ref="copy"> </span>
        </div>
        <highlight-code v-if="showCode" class="s-docs-code" language="jsx" :code="code" />
      </div>
    </div>
  </ClientOnly>
</template>

<style>
@import '../../../assets/styles/atom-one-light.css';
.s-panel-container {
  margin-top: 10px;
}
.s-panel-code-operate {
  border: 1px solid var(--color-border);
}
.s-panel-operate {
  display: flex;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 4px;
  justify-content: flex-end;
  gap: 12px;
  align-items: center;
}
.s-panel-solid-render-container {
  background-color: var(--color-bg-2) !important;
  border-top: 1px solid var(--color-border);
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
  padding: 20px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
}
.s-expand-icon {
  cursor: pointer;
  font-weight: 600;
  color: grey;
  font-size: 16px;
}
.s-docs-code {
  border-top: 1px solid var(--color-border);
}

.s-expand-icon:hover {
  color: var(--vp-c-brand);
}
</style>
