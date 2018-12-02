<style src="./DeviceEmulation.scss" module lang="scss"></style>
<script src="./DeviceEmulation.js"></script>

<template>
  <div :class="[$style.deviceEmulation, enabled ? $style.isEnabled : null]">
    <div :class="$style.generic">
      <div :class="$style.currentSize">
        <div :class="$style.value">{{viewportWidth}}px</div>
      </div>
      <div
        v-for="breakpoint in defaultBreakpoints"
        :class="$style.size"
        :style="{ width: breakpoint.max + 'px'}"
        @click="onBreakpointClick(breakpoint)"
      >
        {{breakpoint.label}} - {{breakpoint.max}}px
      </div>
    </div>

    <div :class="$style.maxWidth">
      <div
        v-for="b in breakpointsMax"
        :class="[$style.bar, b.isActive ? $style.active : null ]"
        :style="{ width: b.max + 'px'}"
        @click="onBreakpointClick(b)"
      >
        <span :class="[$style.label, $style.left]">{{b.max}}px</span>
        <span :class="[$style.label, $style.right]">{{b.max}}px</span>
      </div>
    </div>

    <div :class="$style.minMaxWidth">
      <template v-for="b in breakpointsMinMax">
        <div
          :class="[$style.bar, $style.left, b.isActive ? $style.active : null ]"
          :style="{ width: b.width + 'px', right: '50%', transform: 'translate(-' + b.offset + 'px, 0)'}"
          @click="onBreakpointClick(b)"
        >
          <span :class="[$style.label, $style.left]">{{b.min}}px</span>
          <span :class="[$style.label, $style.right]">{{b.max}}px</span>
        </div>
        <div
          :class="[$style.bar, $style.right, b.isActive ? $style.active : null ]"
          :style="{ width: b.width + 'px', left: '50%', transform: 'translate(' + b.offset + 'px, 0)'}"
          @click="onBreakpointClick(b)"
        >
          <span :class="[$style.label, $style.left]">{{b.min}}px</span>
          <span :class="[$style.label, $style.right]">{{b.max}}px</span>
        </div>
      </template>
    </div>

    <div :class="$style.minWidth">
      <template v-for="b in breakpointsMin">
        <div
          :class="[$style.bar, $style.left, b.isActive ? $style.active : null ]"
          :style="{width: '100vw', right: '50%', transform: 'translate(-' + (b.min / 2) + 'px, 0)' }"
          @click="onBreakpointClick(b)"
        >
          <span :class="$style.label">{{b.min}}px</span>
        </div>
        <div
          :class="[$style.bar, $style.right, b.isActive ? $style.active : null ]"
          :style="{width: '100vw', left: '50%', transform: 'translate(' + (b.min / 2) + 'px, 0)' }"
          @click="onBreakpointClick(b)"
        >
          <span :class="$style.label">{{b.min}}px</span>
        </div>
      </template>
    </div>
  </div>
</template>
