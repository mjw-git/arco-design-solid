<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';

import { render } from 'solid-js/web';
import { createComponent as _$createComponent } from 'solid-js/web';

import { IconCode, IconCopy } from 'arco-solid-icon';

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
console.log('demo-vue');
let comp = null;
const el = ref();
const expand = ref();
const copy = ref();
const code = computed(() => decodeURIComponent(props.source));
// const handleCopy = () => {
//   message.success('复制成功');
// };
let disposeFns = [];

onMounted(async () => {
  const path = `../../../../example/${props.src}`;
  try {
    comp = await modules[path]();
    disposeFns = [
      render(() => _$createComponent(comp.default, {}), el.value),
      render(() => _$createComponent(IconCode), expand.value),
      render(() => _$createComponent(IconCopy, { copyText: code }), copy.value),
    ];
  } catch (error) {}
});

onUnmounted(() => {
  disposeFns.forEach(disposeFn => disposeFn());
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

<style lang="less">
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
  width: 28px;
  height: 28px;
  text-align: center;
  border-radius: 50%;
  cursor: pointer;
  font-weight: 600;
  color: grey;
  font-size: 16px;
  border: 1px solid var(--color-fill-3);
  line-height: 1.5715;
}
.s-docs-code {
  border-top: 1px solid var(--color-border);
}

.s-expand-icon:hover {
  background-color: var(--color-secondary-hover);
  color: var(--color-text-2);
}
.vp-doc {
  .arco-link {
    color: rgb(var(--link-6));
    line-height: var(--line-height-base);
    font-size: 14px;
    display: inline-block;
    padding: 1px 4px;
    background-color: transparent;
    cursor: pointer;
    text-decoration: none;
    border-radius: var(--border-radius-small);
    transition: all 0.1s linear;
    &:hover {
      color: rgb(var(--link-6));
      background-color: var(--color-fill-2);
    }
    &.arco-link-disabled {
      color: var(--color-link-light-3);
      background: none;
      cursor: not-allowed;
    }
    &.arco-link-hoverless {
      background-color: unset;
      padding: 0;
      display: inline;
    }
  }
  .arco-link-is-error {
    color: rgb(var(--danger-6));
    &:active {
      color: rgb(var(--danger-6));
    }
    &:hover {
      color: rgb(var(--danger-6));
    }
    &.arco-link-disabled {
      color: var(--color-danger-light-3);
    }
  }

  .arco-link-is-success {
    color: rgb(var(--success-6));
    &:active {
      color: rgb(var(--success-6));
    }
    &:hover {
      color: rgb(var(--success-6));
    }
    &.arco-link-disabled {
      color: var(--color-success-light-3);
    }
  }

  .arco-link-is-warning {
    color: rgb(var(--warning-6));
    &:active {
      color: rgb(var(--warning-6));
    }
    &:hover {
      color: rgb(var(--warning-6));
    }
    &.arco-link-disabled {
      color: var(--color-warning-light-2);
    }
  }
  .arco-link-icon {
    margin-right: 6px;
    font-size: 12px;
  }
}
</style>
