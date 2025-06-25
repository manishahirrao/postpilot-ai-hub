import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://d351bb9c1fe4d167c942301be5047c5c@o4509525514977285.ingest.us.sentry.io/4509525518319616",

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  integrations: [
  ],

});
