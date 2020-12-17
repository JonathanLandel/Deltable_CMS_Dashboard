<script lang="ts">
  import Preview from "./Preview.svelte";
  import { Button } from "svelte-materialify/src";
  import Textarea from "svelte-materialify/src/components/Textarea/Textarea.svelte";

  export let content: string = "";

  let preview: boolean = false;
</script>

<div class="w-full h-full p-4">
  <div class="flex flex-row w-full mt-4">
    <div class="z-10 w-full py-3 pb-1">
      <Button
        block
        on:click="{() => {
          preview = false;
        }}"
      >
        Preview
      </Button>
    </div>
    <div class="z-10 w-full p-3 pb-1">
      <Button
        block
        on:click="{() => {
          preview = true;
        }}"
      >
        Editor
      </Button>
    </div>
  </div>
  {#if preview}
    <Textarea outlined bind:value="{content}">Outlined</Textarea>
  {:else}
    <Preview content="{content}" />
  {/if}
</div>
