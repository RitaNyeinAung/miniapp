<template>
  <web-view :src="url"></web-view>
</template>

<script>
	import config from '@/config.js'
	import api from '@/api.js'
	export default {
		
		data(){
			return {
				url:'',
			}
		},
    onLoad(val) {
      this.url = val.url
    }
	}
</script>

<style lang="scss">

</style>
