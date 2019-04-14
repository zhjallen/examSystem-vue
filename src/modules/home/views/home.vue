<template>
  <div class="home">
    <home-admin/>
  </div>
</template>
<script>
import "../styles/home.scss";
import HomeAdmin from "../components/home.admin.vue";
export default {
  name: "Home",
  components: {
    HomeAdmin
  }
};
</script>


