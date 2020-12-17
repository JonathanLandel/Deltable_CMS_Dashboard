<script lang="ts">
  // your script goes here
  import {
    TextField,
    Icon,
    Card,
    CardSubtitle,
    CardActions,
    CardText,
    Button,
  } from "svelte-materialify/src";

  let firstPassword = "";
  let email = "";
  let showFirstPassword = false;

  let passwordRules = [
    (v: string) => !!v || "Required",
    (v: string) => v.length <= 30 || "Max 25 characters",
  ];

  const login = () => {
    alert(`${email}|${firstPassword}`);
  };
</script>

<div class="grid min-h-full place-items-center text--primary">
  <div class="w-11/12 p-12 sm:w-8/12 md:w-1/2 lg:w-5/12">
    <Card>
      <CardSubtitle>Please login to continue</CardSubtitle>
      <CardText>
        <TextField outlined bind:value="{email}" counter="{100}" type="email">
          Email
        </TextField>
        <TextField
          counter="{30}"
          type="{showFirstPassword ? 'text' : 'password'}"
          rules="{passwordRules}"
          bind:value="{firstPassword}"
        >
          Password
          <div
            slot="append"
            on:click="{() => {
              showFirstPassword = !showFirstPassword;
            }}"
          >
            <Icon class="mdi mdi-{showFirstPassword ? 'eye-off' : 'eye'}" />
          </div>
        </TextField>
      </CardText>
      <CardActions>
        <div class="flex flex-row justify-around w-full">
          <a href="/signup">
            <Button
              rounded
              depressed
              class="secondary-text"
              size="large"
              style="outline-width: 0px;"
            >
              Signup?
            </Button>
          </a>
          <Button
            rounded
            depressed
            class="primary-text"
            size="large"
            style="outline-width: 0px;"
            on:click="{login}"
          >
            Login
          </Button>
        </div>
      </CardActions>
    </Card>
  </div>
</div>

<style>
  /* your styles go here */
</style>
