<template>
<div class="app-view-container">
  <mu-flexbox orient="vertical" :gutter="0" style="min-height:100%">
    <mu-flexbox-item grow="0" class="app-img-title"><img src="../assets/images/title_home.png"></mu-flexbox-item>
    <mu-flexbox-item class="app-content">
      <mu-list>
        <mu-list-item class="item-large" title="家庭档案" :to="{name:'archivesCate',query:{belong:'family'}}">
          <div class="app-item-icon" slot="left"><img src="../assets/images/icon_menu_folder.png"></div>
          <mu-icon value="chevron_right" slot="right"/>
        </mu-list-item>
        <mu-divider/>
        <mu-list-item class="item-large" title="我的档案" :to="{name:'archivesCate',query:{belong:'person'}}">
          <div class="app-item-icon" slot="left"><img src="../assets/images/icon_menu_officebag.png"></div>
          <mu-icon value="chevron_right" slot="right"/>
        </mu-list-item>
      </mu-list>
    </mu-flexbox-item>
  </mu-flexbox>
</div>
</template>

<script>
  export default {
    data:function() {
      return {
      }
    }
  }
</script>

<style>
</style>
