<!--
 * @Author: Lyle
 * @Date: 2020-05-13 14:03:25
 * @LastEditors: Lyle
 * @LastEditTime: 2020-05-15 15:25:29
 * @Description: 
 -->
<template>
  <div>
    <input
      v-bind:value="name"
      v-on:input="$emit('input', $event.target.value)"
    />
  </div>
</template>
<script>
import Vue from "vue";
export default {
  name: "CustomInput",
  data() {
    return {
			value: ""
		};
  },
  props: {
    message: {
      type: String,
      default: "",
      requeired: true
    },
    name: {
      type: String,
      default: "",
      require: true
    }
  }
  // render: function(createElement) {
  //   // `<div><child v-slot="props"><span>{{ props.text }}</span></child></div>`
  //   return createElement("div", [
  //     createElement("child", {
  //       // 在数据对象中传递 `scopedSlots`
  //       // 格式为 { name: props => VNode | Array<VNode> }
  //       scopedSlots: {
  //         default: function(props) {
  //           return createElement("span", props.text);
  //         }
  //       }
  //     })
  //   ]);
  // }

  // render(createElement) {
  //   let self = this;
  //   return createElement("input", {
  //     domProps: {
  //       value: self.name
  //     },
  //     on: {
  //       input(event) {
  //         self.$emit("input", event.target.value);
  //       }
  //     }
  //   });
  // }
};
</script>
