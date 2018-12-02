<style src="./SearchResults.scss" module lang="scss"></style>
<script src="./SearchResults.js"></script>

<template>
  <div :class="[$style.searchResults, active ? $style.active : null, opened ? $style.opened : null]">
    <div :class="$style.backdrop"></div>

    <div :class="$style.searchResultHeader" @click="onHeaderClick">
      <span :class="$style.amount">{{componentCount}} component(s) - {{presetCount}} preset(s)</span>
      <span :class="$style.filters">
        <i
          :class="['material-icons', filterEnabled ? $style.active : null ]"
          title="Toggle between filtered or all results"
          @click="filterEnabled = !filterEnabled"
        >
          filter_list
        </i>
        <i
          :class="['material-icons', labelEnabled ? $style.active : null]"
          title="Group by label"
          @click="labelEnabled = !labelEnabled"
        >
          label_outline
        </i>
      </span>
    </div>

    <ul :class="$style.resultList">
      <template v-for="(group, key) in storyList">
        <li :class="$style.group">
          <span :class="$style.groupName">{{key}}</span>
        </li>
        <template v-for="story in group">
          <li :class="$style.component">
            <a href="/?storyName={label}" @click="onSelectComponent($event, story)">
              <span :class="$style.row">
                <span :class="$style.name">{{story.label}}</span>
                <span :class="$style.file">{{story.path}}</span>
              </span>
              <span :class="$style.right">view all...</span>
            </a>
          </li>
          <li :class="$style.variant" v-for="variant in story.variants">
            <a href="/?storyName={story.label}&variant={variant.variant}" @click="onSelectVariant($event, variant)">
                <span :class="$style.row">
                  <span :class="$style.label">{{story.label}} - {{variant.label}}</span>
                  <span :class="$style.description">{{variant.description}}</span>
                </span>
            </a>
          </li>
        </template>
      </template>
    </ul>
  </div>

</template>
