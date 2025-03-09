<script setup>
import { onMounted, ref } from 'vue';

import { render } from 'solid-js/web';
import { createComponent as _$createComponent } from 'solid-js/web';

import { message } from 'arco-design-solid';
import * as icons from 'arco-solid-icon';

const el = ref();

onMounted(async () => {
  Object.keys(icons).forEach(async item => {
    const block = document.createElement('div');
    block.classList.add('s-panel-icon-item');

    setTimeout(() => {
      el.value.appendChild(block);

      render(() => _$createComponent(icons[item], {}), block);
    });
  });
});
</script>

<template>
  <ClientOnly>
    <div class="s-panel-container">
      <div ref="el" id="s-icon-container-id" class="s-panel-icon-container"></div>
    </div>
  </ClientOnly>
</template>

<style lang="less">
@import '../../../assets/styles/atom-one-light.css';
@import '../../../assets/styles/atom-one-dark.css';
.s-panel-container {
  margin-top: 10px;
}
.s-panel-icon-container {
  display: flex;
  border-left: 1px solid var(--color-border);
  border-top: 1px solid var(--color-border);
  box-sizing: border-box;
  flex-flow: row wrap;
}
.s-panel-icon-item {
  height: 140px;
  line-height: 140px;
  font-size: 24px;
  text-align: center;
  box-sizing: border-box;
  border-right: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-bg-2);
  width: 20%;
  transition: all 0.3s;
}
.s-panel-icon-item:hover {
  cursor: pointer;
}
</style>
