<style src="./FilterBar.scss" module lang="scss"></style>
<script src="./FilterBar.js"></script>

<template>
  <div :class="[$style.filterBar, enabled || showBreadcrumbs ? $style.isEnabled : null ]">
    <div :class="$style.container">
      <template v-if="!showBreadcrumbs">
        <div :class="$style.types">
          <a
            href="#"
            v-for="type in types"
            :class="type === selectedType ? $style.isSelected : null"
            @click="selectType(type)"
          >
            {{type}}
          </a>
        </div>
        <div :class="$style.labels">
          <a
            href="#"
            v-for="label in labels"
            :class="selectedLabels.includes(label) ? $style.isSelected : null"
            @click="toggleLabel(label)"
          >
            {{label}}
          </a>
        </div>
      </template>
      <template v-if="showBreadcrumbs">
        <div :class="$style.breadcrumbs">
          <a href="#" @click="showAll">All</a>
          <span>
            <span :class="$style.separator">|</span>
            <a href="#" @click="showStory" v-if="selectedVariant !== null">{{selectedStory}}</a>
            <span v-if="selectedVariant === null">{{selectedStory}}</span>
          </span>
          <span v-if="selectedVariant !== null">
            <span :class="$style.separator">|</span>
            <span>{{selectedVariantName}}</span>
          </span>
          <span v-if="selectedVariant === null">
            <span :class="$style.separator">|</span>
            <span>All presets</span>
          </span>
        </div>
      </template>
    </div>
  </div>
</template>
