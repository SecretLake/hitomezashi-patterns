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
                label="Enter phrase or 1s and 0s"
                v-model="xAxisHint"
                solo
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" justify="center" class="navi-row">
          <v-col cols="12" md="12" lg="12">
            <v-subheader>Define Y values</v-subheader>
            <v-text-field
                label="Enter phrase or 1s and 0s"
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
                <v-menu v-model="lineColorMenu" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
                  <template v-slot:activator="{ on }">
                    <div :style="lineColorStyle" v-on="on"/>
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
        <v-row align="center" justify="center" class="navi-row">
          <v-col cols="12" md="12" lg="12">
            <v-subheader>Color pattern segments</v-subheader>
            <v-text-field v-model="segmentOneColor" hide-details class="ma-0 pa-0" solo>
              <template v-slot:append>
                <v-menu v-model="segmentOneMenu" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
                  <template v-slot:activator="{ on }">
                    <div :style="segmentOneColorStyle" v-on="on"/>
                  </template>
                  <v-card>
                    <v-card-text class="pa-0">
                      <v-color-picker v-model="segmentOneColor" flat/>
                    </v-card-text>
                  </v-card>
                </v-menu>
              </template>
            </v-text-field>
            <v-text-field v-model="segmentTwoColor" hide-details class="pa-0 background-color-segment" solo>
              <template v-slot:append>
                <v-menu v-model="segmentTwoMenu" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
                  <template v-slot:activator="{ on }">
                    <div :style="segmentTwoColorStyle" v-on="on"/>
                  </template>
                  <v-card>
                    <v-card-text class="pa-0">
                      <v-color-picker v-model="segmentTwoColor" flat/>
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
                Default pattern is generated on a 30x30 number grid.
              </v-alert>
            </v-col>
            <HitomezashiPatterns
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
    lineColorStyle() {
      const {lineColor, lineColorMenu} = this;

      return {
        backgroundColor: lineColor,
        cursor: 'pointer',
        height: '30px',
        width: '30px',
        borderRadius: lineColorMenu ? '50%' : '4px',
        transition: 'border-radius 200ms ease-in-out'
      }
    },
    segmentOneColorStyle() {
      const {segmentOneColor, segmentOneMenu} = this;

      return {
        backgroundColor: segmentOneColor,
        cursor: 'pointer',
        height: '30px',
        width: '30px',
        borderRadius: segmentOneMenu ? '50%' : '4px',
        transition: 'border-radius 200ms ease-in-out'
      }
    },
    segmentTwoColorStyle() {
      const {segmentTwoColor, segmentTwoMenu} = this;

      return {
        backgroundColor: segmentTwoColor,
        cursor: 'pointer',
        height: '30px',
        width: '30px',
        borderRadius: segmentTwoMenu ? '50%' : '4px',
        transition: 'border-radius 200ms ease-in-out'
      }
    }
  },
  data() {
    return {
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
      lineColor: "#7FA650FF",
      segmentOneColor: "#fff",
      segmentTwoColor: "#fff",
      lineColorMenu: false,
      segmentOneMenu: false,
      segmentTwoMenu: false,
    }
  },
  methods: {
    isNumber(character) {
      return !isNaN(parseInt(character));
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
        let character = hintWithoutSpaces[i];

        if (this.isNumber(character)) {
          result.push(parseInt(character))
        } else if (this.vowels.includes(character.toLowerCase())) {
          result.push(0)
        } else {
          result.push(1)
        }
      }

      return result;
    },
    onDrawBtnClick() {
      // Clear numbers for re-draw
      this.verticalNums = []
      this.horizontalNums = []

      if (this.xAxisHint && this.yAxisHint) {
        this.horizontalNums = this.generateNumsBasedOnHint(this.xAxisHint);
        this.verticalNums = this.generateNumsBasedOnHint(this.yAxisHint);
      } else {
        this.generateNumbers(this.patternLength, this.verticalNums)
        this.generateNumbers(this.patternLength, this.horizontalNums)
      }
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

.background-color-segment {
  margin-top: 15px !important;
}
</style>