<style src="./InfoPanel.scss" module lang="scss"></style>
<script src="./InfoPanel.js"></script>

<template>
  <div :class="$style.infoPanel">
    <i v-if="!isSingleStorySelected" :class="[$style.close, 'material-icons']" @click="onCloseClick">close</i>
    <StoryInfo :story="story"/>
    <StorySource :story="story" />
  </div>
</template>
