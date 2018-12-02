<style src="./Tabs.scss" module lang="scss"></style>
<script src="./Tabs.js"></script>

<template>
  <div>
    <ul :class="$style.tabs">
      <li
        v-for="(tab, index) in tabs"
        :class="isSelected(index) ? $style.isSelected : null"
        @click="selectTab(index)"
      >
        {{tab.label}}
      </li>
    </ul>
    <div>
      <slot name="contentItem" v-for="(tab, index) in tabs" :isSelected="isSelected(index)" :content="tab.content" />
    </div>
  </div>
</template>
