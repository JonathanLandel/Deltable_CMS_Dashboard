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
          Project(ID: "${route.params.id}") {
            ref
            ts
            data {
              name
              languages
              status
              description
            }
          }
        }
      `,
    });
    return {
      project: await response.json(),
      route,
    };
  }
</script>

<script lang="ts">
  import { headers, url, gql } from "../services/graph";
  import { ChipInput } from "../../components";
  import { Button, TextField } from "svelte-materialify/src";

  // export let route: {
  //   host: string;
  //   path: string;
  //   query: {};
  //   params: { id: string };
  // };

  export let project: {
    data: {
      Project: {
        ref: string;
        ts: number;
        data: {
          name: string;
          languages: string[];
          status: string;
          description: string;
        };
      };
    };
  };

  let name = project.data.Project.data.name;
  let languages = project.data.Project.data.languages;
  let status = project.data.Project.data.status;
  let description = project.data.Project.data.description;
</script>

<div
  class="flex flex-row flex-wrap items-center justify-between w-full p-3 border border-gray-500 rounded-md"
>
  <div class="flex flex-col w-full p-2">
    <div class="flex flex-row items-center justify-between">
      <a href="/projects">
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
    <h2>Project Editor</h2>
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
  <ChipInput
    placeholder="Language"
    chips="{languages}"
    on:value="{({ detail }) => {
      languages = detail;
    }}"
  />
</div>
