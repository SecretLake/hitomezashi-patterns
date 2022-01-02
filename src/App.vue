<template>
  <v-app>
    <v-navigation-drawer :clipped="true" app color="#272522">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-btn
              elevation="3"
              large
              :color="accentColor"
              class="white--text"
              v-on:click="triggerDrawing += 1"
          >Draw Pattern
          </v-btn>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" md="12" lg="12">
            <v-slider
                hint="Adjust line width"
                min="1"
                max="20"
                persistent-hint
                track-color="white"
                thumb-label="always"
                :color="accentColor"
                v-on:change="lineWidth = $event"
            ></v-slider>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="6" lg="12">
            <v-col class="alert-wrapper" cols="12" md="6" lg="6" v-if="triggerDrawing === 0">
              <v-alert
                  shaped
                  outlined
                  type="success"
                  elevation="2"
                  :color="accentColor"
              >
                Click on the the "Generate Pattern" button to draw an initial pattern.
              </v-alert>
            </v-col>
            <HitomezashiPatterns
                :triggerDrawPattern="triggerDrawing"
                :lineWidth="lineWidth"
            />
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
  },
  data() {
    return {
      triggerDrawing: 0,
      lineWidth: 1,
      accentColor: "#7FA650",
    }
  },
}
</script>

<style>
.v-messages__message {
  color: white !important;
}

.alert-wrapper {
  margin: auto;
}
</style>