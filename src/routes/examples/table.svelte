<script lang="ts">
  import BasicTable from "../../components/BasicTable.svelte";

  const data = [
    {
      name: "Adam Manuel",
      title: "Mr.",
      day: "1/11/11",
    },
    {
      name: "Mark Manuel",
      title: "Mr.",
      day: "1/11/12",
    },
    {
      name: "Linda Manuel",
      title: "Mrs.",
      day: "1/11/13",
    },
    {
      name: "Lauren Manuel",
      title: "Ms.",
      day: "1/11/14",
    },
  ];

  const mapping: {
    name: string;
    path: string;
  }[] = [
    {
      name: "Full Name",
      path: "name",
    },
    {
      name: "Title",
      path: "title",
    },
    {
      name: "Date of Signing",
      path: "day",
    },
  ];
</script>

<style>
  /* your styles go here */
</style>

<div class="flex flex-col w-full p-2">
  <div class="w-full p-3 border border-gray-500 rounded-md shadow-md">
    <pre>
      {JSON.stringify(data, undefined, 2)}
    </pre>
  </div>
  <div class="w-full p-3">
    <BasicTable columns="{mapping}" contents="{data}" />
  </div>
</div>
