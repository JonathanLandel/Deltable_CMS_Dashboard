<script context="module" lang="ts">
  export async function preload(
    this: any,
    route: {
      host: string;
      path: string;
      query: {};
      params: { id: string };
    }
  ) {
    const response = await this.fetch(url, {
      method: "POST",
      headers,
      body: gql`
        {
          NewsStory(ID: "${route.params.id}") {
            ref
            ts
            data {
              name
              description
              link
              tags
            }
          }
        }
      `,
    });
    return {
      story: await response.json(),
      route,
    };
  }
</script>

<script lang="ts">
  import { headers, url, gql } from "../services/graph";
  import { ChipInput } from "../../components";
  import { Button, TextField } from "svelte-materialify/src";

  export let story: {
    data: {
      NewsStory: {
        ref: string;
        ts: number;
        data: {
          name: string;
          description: string;
          link: string;
          tags: string[];
        };
      };
    };
  };

  console.log(story);

  let name = story.data.NewsStory.data.name;
  let description = story.data.NewsStory.data.description;
  let link = story.data.NewsStory.data.link;
  let tags = story.data.NewsStory.data.tags;
</script>

<div
  class="flex flex-row flex-wrap items-center justify-between w-full p-3 border border-gray-500 rounded-md"
>
  <div class="flex flex-col w-full p-2">
    <div class="flex flex-row items-center justify-between">
      <a href="/news">
        <Button>Cancel</Button>
      </a>
      <Button
        class="text-white green"
        on:click="{() => {
          alert('Save');
        }}"
      >
        Save
      </Button>
    </div>
    <h2>News Story Editor</h2>
  </div>
  <div class="w-full">
    <TextField outlined bind:value="{name}">Title</TextField>
  </div>
  <div class="w-full">
    <TextField outlined bind:value="{description}">Description</TextField>
  </div>
  <div class="w-full">
    <TextField outlined bind:value="{link}">Link</TextField>
  </div>
  <ChipInput
    placeholder="Tag"
    chips="{tags}"
    on:value="{({ detail }) => {
      tags = detail;
    }}"
  />
</div>
