import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const appDir = join(process.cwd(), "app");

test("site-wide contact control offers WhatsApp, call, and text actions", () => {
  const componentPath = join(appDir, "contact-actions.tsx");
  const layout = readFileSync(join(appDir, "layout.tsx"), "utf8");

  assert.equal(existsSync(componentPath), true, "contact control component is missing");
  assert.match(layout, /<ContactActions\s*\/>/);

  const component = readFileSync(componentPath, "utf8");
  assert.match(component, /https:\/\/wa\.me\/19565433188/);
  assert.match(component, /tel:\+19565433188/);
  assert.match(component, /sms:\+19565433188/);
  assert.match(component, />WhatsApp</);
  assert.match(component, />Call</);
  assert.match(component, />Text</);
  assert.match(component, /aria-expanded/);
  assert.match(component, /aria-label="Contact Sound Factory"/);
});
