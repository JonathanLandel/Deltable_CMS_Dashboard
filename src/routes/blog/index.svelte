<script context="module">
  export async function preload(
    this: any,
    route: {
      host: string;
      path: string;
      query: {};
      params: {};
    }
  ) {
    const response = await this.fetch(url, {
      method: "POST",
      headers,
      body: gql`
        {
          Blogs {
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
      blogs: await response.json(),
      route,
    };
  }
</script>

<script lang="ts">
  import { gql, headers, url, getIDFromRef } from "../services/graph";

  import { Card, CardText, CardActions, Button } from "svelte-materialify/src";
  import Chip from "svelte-materialify/src/components/Chip/Chip.svelte";

  export let route: {
    host: string;
    path: string;
    query: {};
    params: {};
  };
  export let blogs: {
    data: {
      Blogs: {
        ref: string;
        ts: number;
        data: {
          name: string;
          description: string;
          tags: string[];
          sections: string[];
          content: string;
        };
      }[];
    };
  };
</script>

<style>
  .container {
    @apply flex flex-row flex-wrap items-center justify-center p-3 overflow-auto;
  }

  .title-container {
    @apply w-full mb-4 text-center;
  }
</style>

<div class:container="{true}">
  <div class:title-container="{true}">
    <h2 class="text--secondary">Personal Blog</h2>
  </div>
  {#if blogs.data}
    {#each blogs.data.Blogs || [] as blog}
      <a href="{'/blog/' + getIDFromRef(blog.ref)}" class="w-full mt-2">
        <Card outlined hover>
          <CardText>
            <div class="text--secondary">{blog.data.description}</div>
            <div class="text--primary text-h4">{blog.data.name}</div>
            {#each blog.data.tags as chip}
              <Chip class="ma-2">{chip}</Chip>
            {/each}
            <p>{blog.data.content}</p>
          </CardText>
          <CardActions>
            <Button text class="primary-text">Learn More</Button>
          </CardActions>
        </Card>
      </a>
    {/each}
  {:else}
    <h2>No Records Found ☹</h2>
    <p>{JSON.stringify(route, undefined, 2)}</p>
  {/if}
</div>
