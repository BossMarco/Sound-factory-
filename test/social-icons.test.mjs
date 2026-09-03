import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const appDir = join(process.cwd(), "app");

test("site header provides visible accessible Instagram and Facebook icon links", () => {
  const socialPath = join(appDir, "social-icons.tsx");
  const components = readFileSync(join(appDir, "components.tsx"), "utf8");

  assert.equal(existsSync(socialPath), true, "social icon component is missing");
  assert.match(components, /<SocialIcons\s*\/>/);

  const socialIcons = readFileSync(socialPath, "utf8");
  assert.match(socialIcons, /IconBrandInstagram/);
  assert.match(socialIcons, /IconBrandFacebook/);
  assert.match(socialIcons, /aria-label="Instagram"/);
  assert.match(socialIcons, /aria-label="Facebook"/);
  assert.match(socialIcons, /https:\/\/www\.instagram\.com\/factoryrgv/);
  assert.match(socialIcons, /https:\/\/www\.facebook\.com\/share\/1DN2VJrcCH/);
});
