<style src="./StorySource.scss" module lang="scss"></style>
<script src="./StorySource.js"></script>

<template>
  <div :class="$style.storySource">
    <Tabs :tabs="tabData" >
      <pre
        slot="contentItem"
        slot-scope="props"
        :class="[$style.tabContent, props.isSelected ? null : 'hidden']"
      ><code v-html="props.content"></code></pre>
    </Tabs>
  </div>
</template>
