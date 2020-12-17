<script>
  import marked from "marked";
  export let content = "";

  let parsedContent = "";
  $: parsedContent = marked(content);
</script>

<style>
  /* your styles go here */
</style>

<div class="w-full h-full ">
  <div class="w-full h-full p-3 rounded-md shadow-md">
    {@html parsedContent}
  </div>
</div>
