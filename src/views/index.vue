<template>
  <div class="app-view-container">
    <mu-flexbox orient="vertical" :gutter="0" style="min-height:100%">
      <mu-flexbox-item grow="0" class="app-img-title"><img src="../assets/images/title_home.png" style="margin:-5px auto -10px auto"></mu-flexbox-item>
      <mu-flexbox-item class="app-content">
        <keep-alive>
          <app-menunav>
            <app-menunav-item :to="{name:'archives'}" title="档案查询"><img src="../assets/images/menu_archives.png" style="height:60px;width:60px"></app-menunav-item>
            <app-menunav-item :to="{name:'search'}" title="全文检索"><img src="../assets/images/menu_search.png" style="height:60px;width:60px"></app-menunav-item>
            <app-menunav-item :to="{name:'albums'}" title="家庭相册"><img src="../assets/images/menu_album.png" style="height:60px;width:60px"></app-menunav-item>
            <app-menunav-item :to="{name:'anniversary'}" title="纪念日"><img src="../assets/images/menu_anniversary.png" style="height:60px;width:60px"></app-menunav-item>
            <app-menunav-item :to="{name:'bigevent'}" title="大事件"><img src="../assets/images/menu_bigevent.png" style="height:60px;width:60px"></app-menunav-item>
            <app-menunav-item :to="{name:'archives'}" title="随手记"><img src="../assets/images/menu_record.png" style="height:60px;width:60px"></app-menunav-item>
          </app-menunav>
        </keep-alive>
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
