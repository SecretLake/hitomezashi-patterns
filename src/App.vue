<template>
  <v-app>
    <v-navigation-drawer :clipped="true" app color="#272522">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" class="navi-row">
          <v-btn
              elevation="3"
              large
              :color="accentColor"
              class="white--text"
              v-on:click="onDrawBtnClick"
          >Draw Pattern
          </v-btn>
        </v-row>
        <v-row align="center" justify="center" class="navi-row">
          <v-col cols="12" md="12" lg="12">
            <v-subheader>Define X values</v-subheader>
            <v-text-field
                label="Enter a phrase"
                v-model="xAxisHint"
                solo
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" justify="center" class="navi-row">
          <v-col cols="12" md="12" lg="12">
            <v-subheader>Define Y values</v-subheader>
            <v-text-field
                label="Enter a phrase"
                v-model="yAxisHint"
                solo
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" justify="center" class="navi-row">
          <v-col cols="12" md="12" lg="12">
            <v-subheader>Select line color</v-subheader>
            <v-text-field v-model="lineColor" hide-details class="ma-0 pa-0" solo>
              <template v-slot:append>
                <v-menu v-model="menu" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
                  <template v-slot:activator="{ on }">
                    <div :style="swatchStyle" v-on="on"/>
                  </template>
                  <v-card>
                    <v-card-text class="pa-0">
                      <v-color-picker v-model="lineColor" flat/>
                    </v-card-text>
                  </v-card>
                </v-menu>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row class="navi-row">
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
            <v-col class="alert-wrapper" cols="12" md="6" lg="6" v-if="!(horizontalNums.length && verticalNums.length)">
              <v-alert
                  shaped
                  outlined
                  type="info"
                  elevation="2"
                  :color="accentColor"
              >
                Click on the the "Generate Pattern" button to draw a pattern.
              </v-alert>
            </v-col>
            <HitomezashiPatterns
                :triggerDrawPattern="triggerDrawing"
                :lineWidth="lineWidth"
                :lineColor="lineColor"
                :xAxisHint="xAxisHint"
                :yAxisHint="yAxisHint"
                :horizontalLength="horizontalLength"
                :verticalLength="verticalLength"
                :patternLength="patternLength"
                :verticalNums="verticalNums"
                :horizontalNums="horizontalNums"
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
  computed: {
    swatchStyle() {
      const {lineColor, menu} = this
      return {
        backgroundColor: lineColor,
        cursor: 'pointer',
        height: '30px',
        width: '30px',
        borderRadius: menu ? '50%' : '4px',
        transition: 'border-radius 200ms ease-in-out'
      }
    }
  },
  data() {
    return {
      triggerDrawing: 0,
      lineWidth: 1,
      xAxisHint: "",
      yAxisHint: "",
      verticalNums: [],
      horizontalNums: [],
      patternLength: 30,
      vowels: "aeoui",
      horizontalLength: 30,
      verticalLength: 30,
      accentColor: "#7FA650",
      lineColor: '#7FA650FF',
      menu: false,
    }
  },
  methods: {
    isLetter(character) {
      return character.length === 1 && character.match(/[a-z]/i);
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    generateNumbers(range, saveNums) {
      for (let i = 0; i < range; i++) {
        saveNums.push(this.getRandomInt(2));
      }
    },
    generateNumsBasedOnHint(hint) {
      let result = [];
      let hintWithoutSpaces = hint.replace(/\s/g, '');

      for (let i = 0; i < hintWithoutSpaces.length; i++) {
        if (this.vowels.includes(hint[i].toLowerCase())) {
          result.push(0)
        } else {
          result.push(1)
        }
      }

      return result;
    },
    onDrawBtnClick() {
      // Clear for re-draw
      this.verticalNums = []
      this.horizontalNums = []

      this.generateNumbers(this.patternLength, this.horizontalNums)
      this.generateNumbers(this.patternLength, this.verticalNums)
    },
  }
}
</script>

<style>
.v-messages__message {
  color: white !important;
}

.alert-wrapper {
  margin: auto;
}

.v-subheader {
  color: white !important;
  padding: 0px !important;
}
</style>