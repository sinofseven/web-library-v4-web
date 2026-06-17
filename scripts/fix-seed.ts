import { readFileSync, writeFileSync } from "node:fs";

type Seed = {
  key: string;
  value: object;
};

const convertValue = (raw: unknown) => {
  if (typeof raw === "object") {
    return JSON.stringify(raw);
  } else {
    return raw;
  }
};

const text = readFileSync("local-kv/seed.json", "utf-8");

const data = JSON.parse(text) as Array<Seed>;

const result = data.map(({ key, value }) => {
  return {
    key,
    value: convertValue(value),
  };
});

writeFileSync("local-kv/fixed-seed.json", JSON.stringify(result));
