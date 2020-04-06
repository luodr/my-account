<template>
  <div class="datatime-picker-wrap">
    <div class="date_line">
      <div class="sp-date">
        <img :src="getImgUrl('date.png')" class="date_icon" />
        <span>&nbsp;{{date}}</span>
      </div>
      <!-- <div class="el-date-editor el-input el-input--prefix el-input--suffix el-date-editor--date" type="date">3123</div> -->
      <!-- <el-date-picker v-model="value" style="width:100px" :size="mini" type="date" :editable="false" placeholder="选择日期"></el-date-picker> -->
      <!-- <el-date-picker v-model="timestamp" style="width:3rem" :editable=false  :picker-options={disabledDate:true} type="datetime" placeholder="选择日期时间"></el-date-picker> -->
      <div class="jiange" style="border-right: black solid 1px;"></div>
      <div class="jiange"></div>
      <img :src="getImgUrl('remark.png')" class="date_icon" />
      <input
        type="text"
        placeholder="写点啥备注下"
        class="remark"
        v-model="remark"
        maxlength="13"
        @blur="blur"
        @focus="$emit('calculator_hide')"
      />
    </div>
  </div>
</template>


<style scoped>
.sp-date {
  display: inline-block;
}
.date_line {
  height: 100%;
  width: 95%;
  position: relative;
  left: 5%;
  vertical-align: middle;
  line-height: 1rem;
}
.remark {
  border: none;
  position: relative;
  left: 0.2rem;
}
.date_icon {
  width: 0.4rem;
  height: 0.4rem;
  display: inline-block;

  vertical-align: middle;
}
.jiange {
  display: inline-block;
  vertical-align: middle;
  width: 0.25rem;
  height: 0.3rem;
}
</style>


<script>
import $ from "jquery";
import "../js/jquery.selector-px.js";
export default {
  data() {
    return {
      date: "今天",
      rk: "",
      value: null,
      remark: "",
      datetime: new Date().getTime()
    };
  },
  props: {
    height: {
      type: String,
      default: "26rem"
    },
    width: {
      type: String,
      default: "34"
    },
    remarkValue: {
      type: String,
      default: ""
    },
    timestamp: {
      type: Number,
      default: new Date().getTime()
    },
    time: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    remarkValue: function() {
      this.remark = this.remarkValue;
      alert(this.remark);
      
    },
    timestamp: function() {
      this.datetime = this.timestamp;
    }
  },
  methods: {
    time2str(t) {
      return t > 9 ? t : "0" + t;
    },
    initCss() {
      // $(".sp-date").css({ height: this.height, width: this.width + "%" });
    },
    getImgUrl(name) {
      return require("@/assets/icons/" + name);
    },
    blur() {
      this.$emit("picker", this.datetime, this.remark);
    },
    formatDate(d1, d2, d3, d4, d5) {
      let date = new Date();
      if (d1 == date.getFullYear()) {
        if (d2 == date.getMonth() + 1 && d3 == date.getDate()) {
          this.date = "今天";
        } else {
          this.date = d2 + "-" + d3;
        }
      } else {
        this.date = d1 + "-" + d2 + "-" + d3;
      }
    }
  },

  mounted() {
    this.remark = this.remarkValue;
    let d = new Date(this.datetime);
    console.log(this.datetime);
    
    this.formatDate(
      d.getFullYear(),
      d.getMonth() + 1,
      d.getDate(),
      d.getHours(),
      d.getMinutes()
    );
    let year = new Date().getFullYear();
    let month = this.time2str(new Date().getMonth() + 1);
    let date = this.time2str(new Date().getDate());
    let hours = this.time2str(new Date().getHours());
    let mins = this.time2str(new Date().getMinutes());
    this.initCss();
    $(".sp-date").val(
      year + "-" + month + "-" + date + "  " + hours + ":" + mins
    );
    // 年月日 时分
    $.dateSelector({
      evEle: ".sp-date",
      title: "日期和时间",
      year: year,
      month: month,
      day: date,
      hour: hours,
      minute: mins,
      startYear: year,
      endYear: year + 20,
      timeBoo: this.time, //是否显示时分
      afterAction: (d1, d2, d3, d4, d5) => {
        this.datetime = Date.parse(
          d1 + "/" + d2 + "/" + d3 + "  " + d4 + ":" + d5
        );
        this.$emit("picker", this.datetime, this.remark);
      }
    });
  },
  activated() {}
};
</script>