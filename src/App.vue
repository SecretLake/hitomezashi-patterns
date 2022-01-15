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
          <v-col cols="12" md="12" lg="12" class="small-button-col">
            <v-btn
                elevation="4"
                x-small
                :color="accentColor"
                class="white--text"
                v-on:click="setRandomLineColor"
            >Random Line Color
            </v-btn>
          </v-col>
          <v-col cols="12" md="12" lg="12" class="small-button-col">
            <v-btn
                elevation="4"
                x-small
                :color="accentColor"
                class="white--text"
                v-on:click="setRandomLineWidth"
            >Random Line Width
            </v-btn>
          </v-col>
          <v-col cols="12" md="12" lg="12" class="small-button-col">
            <v-btn
                elevation="4"
                x-small
                :color="accentColor"
                class="white--text"
                v-on:click="setRandomFillColor"
            >Random Fill Color
            </v-btn>
          </v-col>
          <v-col cols="12" md="12" lg="12" class="small-button-col">
            <v-btn
                elevation="4"
                x-small
                :color="accentColor"
                class="white--text"
                v-on:click="colorRandomSegment += 1"
            >Color Random Segment
            </v-btn>
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
                      <v-color-picker v-model="lineColor" show-swatches swatches-max-height="300px" flat/>
                    </v-card-text>
                  </v-card>
                </v-menu>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="12" lg="12">
            <v-subheader>Color pattern segments</v-subheader>
            <v-text-field v-model="regionFillColor" hide-details class="ma-0 pa-0" solo>
              <template v-slot:append>
                <v-menu
                    v-model="regionFillColorMenu"
                    top
                    nudge-bottom="105"
                    nudge-left="16"
                    :close-on-content-click="false">
                  <template v-slot:activator="{ on }">
                    <div :style="regionFillColorStyle" v-on="on"/>
                  </template>
                  <v-card>
                    <v-card-text class="pa-0">
                      <v-color-picker v-model="regionFillColor" show-swatches swatches-max-height="300px" flat/>
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
                :value="lineWidth"
            ></v-slider>
          </v-col>
        </v-row>
        <v-row align="center" justify="center" class="navi-row">
          <v-btn
              elevation="3"
              large
              :color="accentColor"
              class="white--text"
              v-on:click="saveAsPng"
          >Save as PNG
          </v-btn>
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
                Each pattern is generated on a 30x30 number grid.
                If you want to set your own values for X and Y axis and they are shorter than 30 characters,
                your hints will be expanded to generate a 30x30 grid.
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
                :regionFillColor="regionFillColor"
                :colorRandomSegment="colorRandomSegment"
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
  name: "App",
  components: {
    HitomezashiPatterns
  },
  computed: {
    lineColorStyle() {
      const {lineColor, lineColorMenu} = this;

      return {
        backgroundColor: lineColor,
        cursor: "pointer",
        height: "30px",
        width: "30px",
        border: "1px solid #272522",
        borderRadius: lineColorMenu ? "50%" : "4px",
        transition: "border-radius 200ms ease-in-out"
      };
    },
    regionFillColorStyle() {
      const {regionFillColor, regionFillColorMenu} = this;

      return {
        backgroundColor: regionFillColor,
        cursor: "pointer",
        height: "30px",
        width: "30px",
        border: "1px solid #272522",
        borderRadius: regionFillColorMenu ? "50%" : "4px",
        transition: "border-radius 200ms ease-in-out"
      };
    },
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
      segmentOneColor: "#FFFFFF",
      regionFillColor: "#FFFFFF",
      lineColorMenu: false,
      regionFillColorMenu: false,
      colorRandomSegment: 0,
    };
  },
  methods: {
    getRandomColor() {
      let letters = '0123456789ABCDEF';
      let color = '#';

      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    setRandomLineColor() {
      this.lineColor = this.getRandomColor();
    },
    setRandomLineWidth() {
      this.lineWidth = this.getRandomInt(20);
    },
    setRandomFillColor() {
      this.regionFillColor = this.getRandomColor();
    },
    isNumber(character) {
      return !isNaN(parseInt(character));
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    getEvenOddResult(num) {
      if (num % 2 === 0) {
        return 1;
      }
      return 0;
    },
    generateNumbers(range, saveNums) {
      for (let i = 0; i < range; i++) {
        saveNums.push(this.getRandomInt(2));
      }
    },
    inflateHint(hint) {
      if (hint.length < this.patternLength) {
        let divisor = this.patternLength / hint.length
        hint = hint.repeat(Math.ceil(divisor))
      }

      return hint;
    },
    generateNumsBasedOnHint(hint) {
      let result = [];
      let hintWithoutSpaces = hint.replace(/\s/g, "");
      let inflatedHint = this.inflateHint(hintWithoutSpaces);

      for (let i = 0; i < inflatedHint.length; i++) {
        let character = inflatedHint[i];

        if (this.isNumber(character)) {
          result.push(this.getEvenOddResult(character));
        } else if (this.vowels.includes(character.toLowerCase())) {
          result.push(0);
        } else {
          result.push(1);
        }
      }

      return result;
    },
    onDrawBtnClick() {
      // Clear numbers for re-draw
      this.verticalNums = [];
      this.horizontalNums = [];

      if (this.xAxisHint && this.yAxisHint) {
        this.horizontalNums = this.generateNumsBasedOnHint(this.xAxisHint);
        this.verticalNums = this.generateNumsBasedOnHint(this.yAxisHint);
      } else {
        this.generateNumbers(this.patternLength, this.verticalNums);
        this.generateNumbers(this.patternLength, this.horizontalNums);
      }
    },
    saveAsPng() {
      if (!(this.horizontalNums.length && this.verticalNums.length)) {
        return;
      }

      let downloadLink = document.createElement("a");
      downloadLink.setAttribute("download", "hitomezashi-pattern.png");

      let canvas = document.getElementById("canvas");
      let dataURL = canvas.toDataURL("image/png");
      let url = dataURL.replace(/^data:image\/png/, "data:application/octet-stream");

      downloadLink.setAttribute("href", url);
      downloadLink.click();
    }
  }
};
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

.theme--light.v-label {
  color: white !important;
}

.small-button-col {
  display: flex;
  justify-content: center;
}

</style>