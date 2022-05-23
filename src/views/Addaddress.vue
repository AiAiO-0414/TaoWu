<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @change-area="changeArea"
    />
  </div>
</template>

<script>
import { areaList } from '@vant/area-data';
import { fetchAddUserAddress  } from "../api/address.js"

export default {
    data() {
        return {
            areaList,
            searchResult: [],
        }
    },
    methods: {
        onSave(){

        },
        changeArea() {

        },
    },
};
</script>

<style lang="scss" scoped>
</style>
