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
          Projects {
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
      projects: await response.json(),
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
  export let projects: {
    data: {
      Projects: {
        ref: string;
        ts: number;
        data: {
          name: string;
          languages: string[];
          status: string;
          description: string;
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
    <h2 class="text--secondary">Personal Projects</h2>
  </div>
  {#each projects.data.Projects as project}
    <a href="{'/projects/' + getIDFromRef(project.ref)}" class="w-full mt-2">
      <Card outlined hover>
        <CardText>
          <div class="text--secondary">{project.data.status}</div>
          <div class="text--primary text-h4">{project.data.name}</div>
          {#each project.data.languages as chip}
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
