<script lang="ts">
  import { MarkdownPreview } from "../../components";
  import Textarea from "svelte-materialify/src/components/Textarea/Textarea.svelte";
  import Button from "svelte-materialify/src/components/Button/Button.svelte";
  // your script goes here

  let preview = false;
  let content = "";

  const togglePreview = () => {
    preview = !preview;
  };
</script>

<style>
  /* your styles go here */
</style>

<div class="flex flex-row flex-wrap items-center justify-between w-full">
  <div class="flex flex-row w-full mt-4">
    <div class="w-full p-3">
      <Button block on:click="{togglePreview}">Editor</Button>
    </div>
    <div class="w-full p-3">
      <Button block on:click="{togglePreview}">Preview</Button>
    </div>
  </div>
  <div class="w-full h-full p-4">
    {#if preview}
      <Textarea outlined bind:value="{content}">Outlined</Textarea>
    {:else}
      <MarkdownPreview content="{content}" />
    {/if}
  </div>
</div>
