<style src="./Header.scss" module lang="scss"></style>
<script src="./Header.js"></script>

<template>
  <header :class="$style.header">
    <div :class="$style.headerBlockLeft">
      <a href="/"><span :class="$style.headerTitle">Muban</span></a>
    </div>

    <div :class="$style.headerBlockCenter">
      <div :class="$style.search">
        <input
          type="text"
          placeholder="Search..."
          ref="searchInput"
          :class="$style.searchInput"
          @focus="onSearchFocus"
          v-model="searchQuery"
        />
        <i :class="[$style.searchIcon, 'material-icons']">search</i>
      </div>
    </div>

    <div :class="$style.headerBlockRight">
      <ul :class="$style.headerNav">
        <li :class="[$style.filter, filterSelected ? $style.isSelected : null ]" @click="toggleFiltersClick">
          <a href="#"><i :class="[$style.filterIcon, 'material-icons']">filter_list</i></a>
        </li>
        <li :class="[$style.deviceEmulator, deviceEmulationSelected ? $style.isSelected : null ]" @click="toggleDeviceClick">
          <a href="#">
            <span :class="$style.deviceIcon">
              <span :class="$style.iconContent">&nbsp;</span>
              <span :class="$style.tablet"></span>
              <span :class="$style.phone">
                <span :class="$style.bezel"></span>
              </span>
            </span>
          </a>
        </li>
      </ul>
    </div>

    <SearchResults :opened="searchOpened" @cancelblur="onCancelBlur" />
  </header>
</template>
