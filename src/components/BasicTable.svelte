<script lang="ts">
  import query from "json-query";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let columns: {
    name: string;
    path: string;
  }[] = [];
  export let contents: any[] = [];

  let columnNames = columns.map(({ name, path }) => name);

  const getColumnData = (name: string, data: any) => {
    const possiblePath = columns.find((row) => name === row.name);
    if (possiblePath) {
      const path = possiblePath.path;
      const result = query(path, {
        data,
      });
      if (result.value) return result.value;
      else return "unknown";
    } else {
      return "unknown";
    }
  };
</script>

<div class="w-full p-3">
  <table class="w-full border-collapse">
    <thead>
      <tr>
        {#each columnNames as columnName}
          <th
            class="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell"
          >
            {columnName}
          </th>
        {/each}
        <th
          class="hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell"
        >
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      {#each contents as row}
        <tr
          class="flex flex-row flex-wrap mb-10 bg-white lg:hover:bg-gray-100 lg:table-row lg:flex-row lg:flex-no-wrap lg:mb-0"
        >
          {#each columnNames as columnName}
            <td
              class="relative block w-full p-3 text-right text-gray-800 border border-b rounded lg:rounded-none lg:text-center lg:w-auto lg:table-cell lg:static"
            >
              <span
                class="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden"
              >{columnName}</span>
              {getColumnData(columnName, row)}
            </td>
          {/each}
          <td
            class="relative block w-full p-3 text-center text-gray-800 border border-b rounded lg:rounded-none lg:w-auto lg:table-cell lg:static"
          >
            <span
              class="absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden"
            >Actions</span>
            <div class="flex flex-row justify-end lg:justify-between">
              <p class="text-blue-400 underline hover:text-blue-600">Edit</p>
              <p class="pl-6 text-blue-400 underline hover:text-blue-600">
                Remove
              </p>
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
