import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const appDir = join(process.cwd(), "app");
const homePage = () => readFileSync(join(appDir, "page.tsx"), "utf8");

test("homepage opens with a cinematic local-video hero and a direct date inquiry", () => {
  const page = homePage();

  assert.match(page, /className="apollo-home"/);
  assert.match(page, /className="apollo-hero"/);
  assert.match(page, /src="\/concert-production\.mp4"/);
  assert.match(page, /poster="\/concert-production\.jpg"/);
  assert.doesNotMatch(page, /apollo-hero__video" autoPlay/);
  assert.match(page, /href="#build-package"/);
  assert.match(page, />Check your date</);
  assert.match(page, /className="apollo-hero__social"/);
  assert.match(page, /<SocialIcons\s*\/>/);
});

test("homepage keeps service discovery and gives cinematic motion an accessible fallback", () => {
  const page = homePage();
  const motionPath = join(appDir, "apollo-home-motion.tsx");
  const stylePath = join(appDir, "apollo-home.css");

  assert.match(page, /ApolloHomeMotion/);
  assert.match(page, /wedding-dj/);
  assert.match(page, /quinceanera-dj/);
  assert.match(page, /cheerleading-event-dj/);
  assert.match(page, /concert-production/);
  assert.match(page, /wedding-confetti\.jpg/);
  assert.match(page, /venue-uplighting\.jpeg/);
  assert.equal(existsSync(motionPath), true);
  assert.equal(existsSync(stylePath), true);

  const motion = readFileSync(motionPath, "utf8");
  const styles = readFileSync(stylePath, "utf8");
  assert.match(motion, /prefers-reduced-motion: reduce/);
  assert.match(motion, /addEventListener\(\s*["']change/);
  assert.match(motion, /video\.play\(/);
  assert.doesNotMatch(motion, /addEventListener\(\s*["']scroll/);
  assert.match(styles, /min-height:\s*100dvh/);
  assert.match(styles, /@media\s*\(max-width:\s*720px\)/);
  assert.match(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
});

test("homepage literal media paths resolve to verified local public assets", () => {
  const publicDir = join(process.cwd(), "public");
  const paths = [...homePage().matchAll(/(?:src|poster)="(\/[^"]+)"/g)].map((match) => match[1]);
  assert.ok(paths.length > 0);
  for (const assetPath of paths) {
    assert.equal(existsSync(join(publicDir, assetPath)), true, `missing local asset: ${assetPath}`);
  }
});

test("root layout loads the isolated homepage stylesheet after legacy layers", () => {
  const layout = readFileSync(join(appDir, "layout.tsx"), "utf8");
  assert.match(layout, /import\s+["']\.\/apollo-home\.css["']/);
  assert.ok(layout.indexOf('"./apollo-home.css"') > layout.indexOf('"./taste-pass.css"'));
});
