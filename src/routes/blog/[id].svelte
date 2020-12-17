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
          Blog(ID: "${route.params.id}") {
            ref
            ts
            data {
              name
              description
              tags
              sections
              content
            }
          }
        }
      `,
    });
    return {
      blog: await response.json(),
      route,
    };
  }
</script>

<script lang="ts">
  import { headers, url, gql } from "../services/graph";
  import { MarkdownEditor, ChipInput } from "../../components";
  import { Button, TextField } from "svelte-materialify/src";

  export let blog: {
    data: {
      Blog: {
        ref: string;
        ts: number;
        data: {
          name: string;
          description: string;
          tags: string[];
          sections: string[];
          content: string;
        };
      };
    };
  };

  let preview = false;
  let name = blog.data.Blog.data.name;
  let description = blog.data.Blog.data.description;
  let content = blog.data.Blog.data.content;
  let tags = blog.data.Blog.data.tags;
  let sections = blog.data.Blog.data.sections;
</script>

<div
  class="flex flex-row flex-wrap items-center justify-between w-full p-3 border border-gray-500 rounded-md"
>
  <div class="flex flex-col w-full p-2">
    <div class="flex flex-row items-center justify-between">
      <a href="/blog">
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
    <h2>Blog Editor</h2>
  </div>
  <div class="w-full">
    <TextField outlined bind:value="{name}">Title</TextField>
  </div>
  <div class="w-full">
    <TextField outlined bind:value="{description}">Description</TextField>
  </div>
  <ChipInput
    placeholder="Tag"
    chips="{tags}"
    on:value="{({ detail }) => {
      tags = detail;
    }}"
  />
  <ChipInput
    placeholder="Section"
    chips="{sections}"
    on:value="{({ detail }) => {
      sections = detail;
    }}"
  />
  <MarkdownEditor bind:content />
</div>
