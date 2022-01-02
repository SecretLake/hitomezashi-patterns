<template>
  <v-app>
    <v-navigation-drawer :clipped="true" app color="#59555C">

    </v-navigation-drawer>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="6" lg="12">
            <HitomezashiPatterns/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HitomezashiPatterns from "@/components/HitomezashiPatterns";

export default {
  name: 'App',
  components: {
    HitomezashiPatterns
  }
}
</script>

<style>
</style>