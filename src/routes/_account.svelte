<script>
  import { createEventDispatcher } from "svelte";
  import {
    Button,
    Dialog,
    Card,
    CardTitle,
    CardText,
    CardActions,
  } from "svelte-materialify/src";
  import config from "../firebase";
  const dispatch = createEventDispatcher();

  // Import the Firebase Services you want bundled and call initializeApp
  import firebase from "firebase/app";
  import("firebase/firestore");
  import("firebase/auth");
  import("firebase/performance");
  import("firebase/analytics");

  let username: string;
  let password: string;
  let active = false;
  let user: {
    displayName: string | null;
    email: string | null;
    emailVerified: boolean;
    photoURL: string | null;
    isAnonymous: boolean;
    uid: string;
    providerData: (firebase.UserInfo | null)[];
  };

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  firebase.analytics();

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      dispatch("user-id", user.uid);
      const opts = {
        displayName,
        email,
        emailVerified,
        photoURL,
        isAnonymous,
        uid,
        providerData,
      };
      user = opts;
      dispatch("logged-in", {
        displayName,
        email,
        emailVerified,
        photoURL,
        isAnonymous,
        uid,
        providerData,
      });
      active = false;
    } else {
      dispatch("logged-out");
    }
  });

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  };

  const signup = () => {
    dispatch("sign-up");
  };

  const close = (value: string) => () => {
    active = true;
    console.log("closed", value);
    dispatch("closed", value);
  };

  function open() {
    active = true;
  }
</script>

<!-- markup (zero or more items) goes here -->
<Dialog persistent bind:active>
  <Card>
    <CardTitle>Do you Agree?</CardTitle>
    <CardText>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia
      deleniti natus dolore, rerum hic beatae officiis at ea sequi labore.
    </CardText>
    <CardActions>
      <Button on:click="{close('Yes')}" text>Yes</Button>
      <Button on:click="{close('Yes (but in red)')}" text class="red-text">
        Yes (but in red).
      </Button>
    </CardActions>
  </Card>
</Dialog>
<slot user="{user}" popupActive="{active}" />

<style>
  /* your styles go here */
</style>
