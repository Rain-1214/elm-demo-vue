<template>
  <div id="filter">
    <mt-header title="发现"></mt-header>
    <article>
      <section>

      </section>
    </article>
    <my-footer :active="1"></my-footer>
  </div>
</template>
<script>
  import Footer from '../components/footer.vue';

  export default {
    data() {
      return {

      };
    },
    components: {
      'my-footer': Footer,
    },
  };
</script>
<style lang="scss" scoped>

</style>


