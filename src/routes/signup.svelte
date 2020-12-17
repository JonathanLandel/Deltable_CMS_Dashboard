<script lang="ts">
  import {
    TextField,
    Icon,
    Card,
    CardTitle,
    CardSubtitle,
    CardActions,
    CardText,
    Button,
  } from "svelte-materialify/src";

  let firstPassword = "";
  let secondPassword = "";
  let firstName = "";
  let lastName = "";
  let email = "";
  let showFirstPassword = false;
  let showSecondPassword = false;

  let passwordRules = [
    (v: string) => !!v || "Required",
    (v: string) => v.length <= 30 || "Max 25 characters",
    () => secondPassword.includes(firstPassword) || "Passwords Missmatch",
  ];

  const signup = () => {
    alert(
      [firstName, lastName, email, firstPassword, secondPassword].join(", ")
    );
  };
</script>

<div class="grid min-h-full place-items-center text--primary">
  <div class="w-11/12 p-12 sm:w-8/12 md:w-1/2 lg:w-5/12">
    <Card>
      <CardTitle>Hello there 👋,</CardTitle>
      <CardSubtitle>please fill in your information to continue</CardSubtitle>
      <CardText>
        <div class="flex justify-between gap-3">
          <span class="w-1/2">
            <TextField
              outlined
              bind:value="{firstName}"
              counter="{50}"
              type="given-name"
            >
              Firstname
            </TextField>
          </span>
          <span class="w-1/2">
            <TextField
              outlined
              bind:value="{lastName}"
              counter="{50}"
              type="family-name"
            >
              Lastname
            </TextField>
          </span>
        </div>
        form
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
        <TextField
          counter="{30}"
          type="{showSecondPassword ? 'text' : 'password'}"
          rules="{passwordRules}"
          bind:value="{secondPassword}"
        >
          Confirm Password
          <div
            slot="append"
            on:click="{() => {
              showSecondPassword = !showSecondPassword;
            }}"
          >
            <Icon class="mdi mdi-{showSecondPassword ? 'eye-off' : 'eye'}" />
          </div>
        </TextField>
      </CardText>
      <CardActions>
        <div class="flex flex-row justify-around w-full">
          <a href="/login">
            <Button
              rounded
              depressed
              class="secondary-text"
              size="large"
              style="outline-width: 0px;"
            >
              Already registered?
            </Button>
          </a>
          <Button
            rounded
            depressed
            class="primary-text"
            size="large"
            style="outline-width: 0px;"
            on:click="{signup}"
          >
            Sign up
          </Button>
        </div>
      </CardActions>
    </Card>
  </div>
</div>

<style>
  /* your styles go here */
</style>
