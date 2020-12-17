<script>
  import { Button, TextField } from "svelte-materialify/src";
  import Chip from "svelte-materialify/src/components/Chip/Chip.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let editor: boolean = false;
  export let chips: string[] = [];
  export let placeholder: string = "Chip";
  let newChip: string = "";

  function toggleEditor() {
    editor = !editor;
    dispatch("editor", editor);
  }

  const addChip = (chip: string) => () => {
    chips = [...chips, chip];
    newChip = "";
    editor = false;
    dispatch("value", chips);
  };

  const removeChip = (chip: string) => () => {
    chips = chips.filter((_chip) => chip !== _chip);
    dispatch("value", chips);
  };
</script>

<p class="p-2 ml-2 -mb-1 font-semibold">{placeholder}</p>
{#if editor}
  <div class="flex flex-row items-center justify-between w-full">
    <div class="w-full">
      <TextField outlined bind:value="{newChip}">{placeholder}</TextField>
    </div>
    <div class="flex flex-row items-center justify-between">
      <Button class="red white-text" on:click="{() => toggleEditor()}">
        Cancel
      </Button>
      <Button class="green white-text" on:click="{addChip(newChip)}">
        Add
        {placeholder}
      </Button>
    </div>
  </div>
{:else}
  <div class="flex flex-row items-center justify-between w-full">
    <div class="flex flex-row items-center justify-start w-full">
      {#each chips as chip, i}
        <div class="p-1">
          <Chip close on:close="{removeChip(chip)}">{chip}</Chip>
        </div>
      {/each}
    </div>
    <Button class="self-end green white-text" on:click="{() => toggleEditor()}">
      Add
    </Button>
  </div>
{/if}

<style>
  /* your styles go here */
</style>
