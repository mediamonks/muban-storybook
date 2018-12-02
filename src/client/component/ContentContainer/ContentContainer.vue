<style src="./ContentContainer.scss" module lang="scss"></style>
<script src="./ContentContainer.js"></script>

<template>
  <div
    :class="[
      $style.contentContainer,
      $style.singleStory,
      deviceEmulationEnabled ? $style.deviceEmulationEnabled : null,
      filtersEnabled || showBreadcrumbs ? $style.filtersEnabled  : null,
      isResizing ? $style.isResizing : null,
      panelInfo ? $style.infoPanelOpen : null,
    ]"
    :style="{maxWidth: deviceEmulationEnabled ? viewportWidth + 'px' : '100%'}"
  >
    <div :class="[$style.resizer, $style.before]" @mousedown="onMouseDown($event, true)" @mouseup="onMouseUp"></div>
    <div :class="[$style.resizer, $style.after]" @mousedown="onMouseDown($event, false)" @mouseup="onMouseUp"></div>
    <iframe :class="$style.storyFrame" src="iframe.html?storyName={story}&variant={variant}" frameborder="0"></iframe>
    <div :class="$style.blocker"></div>
  </div>
</template>
