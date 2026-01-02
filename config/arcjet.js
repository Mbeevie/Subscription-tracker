import arcjet, { shield, detectBot, tokenBucket } from '@arcjet/node';
import { ARCJET_API_KEY, ARCJET_ENV } from './env.js';

const isProd = ARCJET_ENV === "production";

export const aj = arcjet({
  key: ARCJET_API_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: isProd ? "LIVE" : "DRY_RUN",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});
