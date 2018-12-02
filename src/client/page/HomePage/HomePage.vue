<style src="./HomePage.scss" module lang="scss"></style>
<script src="./HomePage.js"></script>

<template>
  <div>
    <Header></Header>
    <FilterBar></FilterBar>
    <DeviceEmulation></DeviceEmulation>
    <ContentContainer></ContentContainer>
    <InfoPanel v-if="panelInfo"></InfoPanel>
  </div>
</template>
