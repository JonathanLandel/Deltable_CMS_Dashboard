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
          News {
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
      resources: await response.json(),
      route,
    };
  }
</script>

<script lang="ts">
  import { gql, headers, url, getIDFromRef } from "../services/graph";

  import { Card, CardText, CardActions, Button } from "svelte-materialify/src";
  import Chip from "svelte-materialify/src/components/Chip/Chip.svelte";

  export let resources: {
    data: {
      News: {
        ref: string;
        ts: number;
        data: {
          name: string;
          description: string;
          link: string;
          tags: string[];
        };
      }[];
    };
  };

  export let route: {
    host: string;
    path: string;
    query: {};
    params: {};
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
    <h2 class="text--secondary">Articles</h2>
  </div>
  {#each resources.data.News as story}
    <a href="{'/news/' + getIDFromRef(story.ref)}" class="w-full mt-2">
      <Card outlined hover>
        <CardText>
          <div class="text--secondary">{story.data.description}</div>
          <div class="text--primary text-h4">{story.data.name}</div>
          {#each story.data.tags as chip}
            <Chip class="ma-2">{chip}</Chip>
          {/each}
        </CardText>
        <CardActions>
          <Button text class="primary-text">Learn More</Button>
        </CardActions>
      </Card>
    </a>
  {:else}
    <h2>No Records Found ☹</h2>
    <p>{JSON.stringify(route, undefined, 2)}</p>
  {/each}
</div>
