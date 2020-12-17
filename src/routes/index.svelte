<script lang="ts">
  import ExampleComponent from "../components/ExampleComponent.svelte";
</script>

<div class:centerer="{true}">
  <!-- Here's how you could extract conditional class groups with @apply -->
  <!-- This is an example component -->
  <div class="w-full p-4 mx-4">
    <ExampleComponent
      title="Portfolio Dashboard"
      paragraph="This is where you edit the content of your portfolio site using this custom CMS system!"
    />
    <div class="grid m-4 ">
      <!-- Cards -->
      <div class="grid gap-6 mb-3 md:grid-cols-2 xl:grid-cols-4">
        <!-- Card -->
        <div
          class="flex items-center p-4 rounded-lg shadow-xs dark:bg-gray-800"
        >
          <div
            class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
              ></path>
            </svg>
          </div>
          <div>
            <p
              class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
            >
              Blogs Posted
            </p>
            <p class="text-lg font-semibold text-gray-500 dark:text-gray-200">
              10
            </p>
          </div>
        </div>
        <!-- Card -->
        <div
          class="flex items-center p-4 rounded-lg shadow-xs dark:bg-gray-800"
        >
          <div
            class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div>
            <p
              class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
            >
              Important News
            </p>
            <p class="text-lg font-semibold text-gray-500 dark:text-gray-200">
              24
            </p>
          </div>
        </div>
        <!-- Card -->
        <div
          class="flex items-center p-4 rounded-lg shadow-xs dark:bg-gray-800"
        >
          <div
            class="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div>
            <p
              class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
            >
              Learning Resources
            </p>
            <p class="text-lg font-semibold text-gray-500 dark:text-gray-200">
              376
            </p>
          </div>
        </div>
        <!-- Card -->
        <div
          class="flex items-center p-4 rounded-lg shadow-xs dark:bg-gray-800"
        >
          <div
            class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              ></path>
            </svg>
          </div>
          <div>
            <p
              class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
            >
              Public Projects
            </p>
            <p class="text-lg font-semibold text-gray-500 dark:text-gray-200">
              35
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <main class="w-full">
    <section class="m-4 border border-gray-500 border-solid rounded shadow">
      <header
        class="p-4 text-lg font-medium border-b border-gray-500 border-solid"
      >
        Buildings Overview
      </header>
      <section
        class="flex flex-row flex-wrap items-center text-center border-b border-gray-500 border-solid "
      >
        <div
          class="w-full p-4 border-b border-gray-500 border-solid sm:w-1/2 lg:w-1/4 md:border-b-0 sm:border-r"
        >
          <span class="text-xs font-medium text-gray-500 uppercase">TOTAL
            REVENUE</span>
          <div class="flex items-center justify-center py-4 text-center">
            <span class="mr-4 text-3xl">$485,985</span>
            <span
              class="inline-flex items-center h-6 px-2 text-xs text-white bg-green-500 rounded"
            >+9.1%</span>
          </div>
        </div>
        <div
          class="w-full p-4 border-b border-gray-500 border-solid sm:w-1/2 lg:w-1/4 md:border-b-0 sm:border-r"
        >
          <span class="text-xs font-medium text-gray-500 uppercase">PREDICTED
            MONTHLY REVENUE</span>
          <div class="flex items-center justify-center py-4 text-center">
            <span class="mr-4 text-3xl">$6,576</span>
            <span
              class="inline-flex items-center h-6 px-2 text-xs text-white bg-green-500 rounded"
            >+12.0%</span>
          </div>
        </div>
        <div
          class="w-full p-4 border-b border-gray-500 border-solid sm:w-1/2 lg:w-1/4 md:border-b-0 sm:border-r"
        >
          <span class="text-xs font-medium text-gray-500 uppercase">ACTIVE
            RENTERS</span>
          <div class="flex items-center justify-center py-4 text-center">
            <span class="mr-4 text-3xl">152</span>
            <span
              class="inline-flex items-center h-6 px-2 text-xs text-white bg-red-500 rounded"
            >-12</span>
          </div>
        </div>
        <div
          class="flex flex-col items-center w-full p-4 border-b border-gray-500 border-solid sm:w-1/2 lg:w-1/4 md:border-b-0 sm:border-r"
        >
          <span class="text-xs font-medium text-gray-500 uppercase">PENDING
            RENTS</span>
          <span class="block py-4 text-3xl">$930,10</span>
        </div>
      </section>
      <section id="chart" class="p-4">
        <pre
          style="width: 100%; height: 200px; background:gray;"
        > 
          CHART HERE
        </pre>
      </section>
    </section>

    <div class="flex flex-row flex-wrap">
      <div class="w-full lg:w-1/2">
        <section class="m-4 border border-gray-500 border-solid rounded shadow">
          <header
            class="p-4 text-lg font-medium border-b border-gray-500 border-solid"
          >
            Most Profitable Renters
          </header>
          <section class="w-full overflow-x-auto">
            <table class="w-full" cellpadding="0" cellspacing="0">
              <tbody>
                <tr>
                  <td class="p-2 py-4 border-b border-gray-500 border-solid">
                    <div class="flex flex-row flex-wrap items-center pl-4">
                      <div
                        class="flex flex-row items-center justify-center w-12 h-12 mr-4 text-white bg-red-600 rounded-full"
                      >
                        A
                      </div>
                      <div class="text-gray-500">Adobe</div>
                    </div>
                  </td>
                  <td
                    class="p-2 pr-4 text-right text-gray-500 border-b border-gray-500 border-solid"
                  >
                    $35,210.66
                  </td>
                </tr>
                <tr>
                  <td class="p-2 py-4 border-b border-gray-500 border-solid">
                    <div class="flex flex-row flex-wrap items-center pl-4">
                      <div
                        class="flex flex-row items-center justify-center w-12 h-12 mr-4 text-white bg-green-600 rounded-full"
                      >
                        B
                      </div>
                      <div class="text-gray-500">Bank of America</div>
                    </div>
                  </td>
                  <td
                    class="p-2 pr-4 text-right text-gray-500 border-b border-gray-500 border-solid"
                  >
                    $11,456.84
                  </td>
                </tr>
                <tr>
                  <td class="p-2 py-4 border-b border-gray-500 border-solid">
                    <div class="flex flex-row flex-wrap items-center pl-4">
                      <div
                        class="flex flex-row items-center justify-center w-12 h-12 mr-4 text-white bg-blue-600 rounded-full"
                      >
                        L
                      </div>
                      <div class="text-gray-500">Lamborghini Automobili</div>
                    </div>
                  </td>
                  <td
                    class="p-2 pr-4 text-right text-gray-500 border-b border-gray-500 border-solid"
                  >
                    $35,210.66
                  </td>
                </tr>
                <tr>
                  <td class="p-2 py-4 border-b border-gray-500 border-solid">
                    <div class="flex flex-row flex-wrap items-center pl-4">
                      <div
                        class="flex flex-row items-center justify-center w-12 h-12 mr-4 text-white bg-yellow-600 rounded-full"
                      >
                        G
                      </div>
                      <div class="text-gray-500">Google London</div>
                    </div>
                  </td>
                  <td
                    class="p-2 pr-4 text-right text-gray-500 border-b border-gray-500 border-solid"
                  >
                    $9,586.11
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </section>
      </div>
      <div class="w-full lg:w-1/2">
        <section class="m-4 border border-gray-500 border-solid rounded shadow">
          <header
            class="p-4 text-lg font-medium border-b border-gray-500 border-solid"
          >
            Latest Invoices
          </header>
          <section class="w-full overflow-x-auto">
            <table class="w-full" cellpadding="0" cellspacing="0">
              <tbody>
                <tr>
                  <td class="p-2 py-4 border-b border-gray-500 border-solid">
                    <div class="flex flex-row flex-wrap items-center pl-4">
                      <div
                        class="flex flex-row items-center justify-center w-12 h-12 mr-4 text-white bg-red-600 rounded-full"
                      >
                        A
                      </div>
                      <div class="text-gray-500">Adobe</div>
                    </div>
                  </td>
                  <td
                    class="p-2 pr-4 text-right text-gray-500 border-b border-gray-500 border-solid"
                  >
                    $35,210.66
                  </td>
                </tr>
                <tr>
                  <td class="p-2 py-4 border-b border-gray-500 border-solid">
                    <div class="flex flex-row flex-wrap items-center pl-4">
                      <div
                        class="flex flex-row items-center justify-center w-12 h-12 mr-4 text-white bg-green-600 rounded-full"
                      >
                        B
                      </div>
                      <div class="text-gray-500">Bank of America</div>
                    </div>
                  </td>
                  <td
                    class="p-2 pr-4 text-right text-gray-500 border-b border-gray-500 border-solid"
                  >
                    $11,456.84
                  </td>
                </tr>
                <tr>
                  <td class="p-2 py-4 border-b border-gray-500 border-solid">
                    <div class="flex flex-row flex-wrap items-center pl-4">
                      <div
                        class="flex flex-row items-center justify-center w-12 h-12 mr-4 text-white bg-blue-600 rounded-full"
                      >
                        L
                      </div>
                      <div class="text-gray-500">Lamborghini Automobili</div>
                    </div>
                  </td>
                  <td
                    class="p-2 pr-4 text-right text-gray-500 border-b border-gray-500 border-solid"
                  >
                    $35,210.66
                  </td>
                </tr>
                <tr>
                  <td class="p-2 py-4 border-b border-gray-500 border-solid">
                    <div class="flex flex-row flex-wrap items-center pl-4">
                      <div
                        class="flex flex-row items-center justify-center w-12 h-12 mr-4 text-white bg-yellow-600 rounded-full"
                      >
                        G
                      </div>
                      <div class="text-gray-500">Google London</div>
                    </div>
                  </td>
                  <td
                    class="p-2 pr-4 text-right text-gray-500 border-b border-gray-500 border-solid"
                  >
                    $9,586.11
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </section>
      </div>
    </div>
  </main>
</div>

<style>
  .centerer {
    @apply flex-1 flex flex-col items-center justify-center;
  }
</style>
