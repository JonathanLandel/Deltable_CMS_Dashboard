<script context="module">
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
      Resource(ID:"${route.params.id}") {
        ref
        ts
        data {
          name
          languages
          status
          description
          tags
          link
        }
      }
    }
`,
    });
    return {
      response: await response.json(),
      route,
    };
  }
</script>

<script lang="ts">
  import { headers, url, gql } from "../services/graph";
  import { ChipInput } from "../../components";
  import { Button, TextField } from "svelte-materialify/src";

  export let response: {
    data: {
      Resource: {
        ref: string;
        ts: number;
        data: {
          name: string;
          languages: string[];
          status: string;
          description: string;
          tags: string[];
          link: string;
        };
      };
    };
  };

  let name: string = response.data.Resource.data.name;
  let languages: string[] = response.data.Resource.data.languages;
  let status: string = response.data.Resource.data.status;
  let description: string = response.data.Resource.data.description;
  let tags: string[] = response.data.Resource.data.tags;
  let link: string = response.data.Resource.data.link;
</script>

<div
  class="flex flex-row flex-wrap items-center justify-between w-full p-3 border border-gray-500 rounded-md"
>
  <div class="flex flex-col w-full p-2">
    <div class="flex flex-row items-center justify-between">
      <a href="/resources">
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
    <h2>Resource Editor</h2>
  </div>
  <div class="w-full">
    <TextField outlined bind:value="{name}">Title</TextField>
  </div>
  <div class="w-full">
    <TextField outlined bind:value="{description}">Description</TextField>
  </div>
  <div class="w-full">
    <TextField outlined bind:value="{status}">Status</TextField>
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
  <ChipInput
    placeholder="Language"
    chips="{languages}"
    on:value="{({ detail }) => {
      languages = detail;
    }}"
  />
</div>
