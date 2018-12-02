<style src="./StoryInfo.scss" module lang="scss"></style>
<script src="./StoryInfo.js"></script>

<template>
  <div :class="$style.storyInfo">
    <a @click="onSelectComponent($event, story)" href="/?storyName={story}" target="_top"><p :class="$style.path">{{story.path}}</p></a>
    <a @click="onSelectVariant($event, story)" href="/?storyName={story}&variant={variant}" target="_top"><h1>{{story.name}} - {{story.label}}</h1></a>
    <p>{{story.description}}</p>
  </div>
</template>
