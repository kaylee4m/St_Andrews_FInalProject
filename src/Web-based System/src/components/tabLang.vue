<template>
	<div @click.stop="$setLang($lang === 'en' ? 'zh' : 'en')" class="tab-lang">
		<span :class="{active: $lang === 'zh'}">zh</span>
		/
		<span :class="{active: $lang === 'en'}">en</span>
	</div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.tab-lang {
    width: 80px;
    margin-right: 50px;
    cursor: pointer;
	.active {
        color: $__theme;
        font-size: 18px;
	}
}
</style>


