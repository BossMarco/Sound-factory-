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
  assert.match(page, /className="apollo-hero__media"/);
  assert.match(page, /src="\/concert-production\.mp4"/);
  assert.match(page, /media="\(max-width: 720px\)" src="\/pexels-dj-loop-mobile\.mp4"/);
  assert.match(page, /poster="\/concert-production\.jpg"/);
  assert.match(page, /className="apollo-hero__video" autoPlay muted loop playsInline/);
  assert.match(page, /className="apollo-feature__media" autoPlay muted loop playsInline/);
  assert.match(page, /src="\/wedding-confetti\.mp4"/);
  assert.match(page, /href="#build-package"/);
  assert.match(page, />Plan your event <span aria-hidden="true">↗<\/span><\/a>/);
  assert.match(page, /className="apollo-event-rail"/);
  assert.match(page, /See what we build/);
});

test("homepage social links use their corresponding brand icons", () => {
  const page = homePage();

  assert.match(page, /IconBrandInstagram/);
  assert.match(page, /IconBrandFacebook/);
  assert.match(page, /className="apollo-social__icon"/);
});

test("homepage keeps service discovery and gives cinematic motion an accessible fallback", () => {
  const page = homePage();
  const motionPath = join(appDir, "apollo-home-motion.tsx");
  const stylePath = join(appDir, "apollo-home.css");
  const cloneStylePath = join(appDir, "apollo-clone.css");

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
  const cloneStyles = readFileSync(cloneStylePath, "utf8");
  assert.match(motion, /prefers-reduced-motion: reduce/);
  assert.match(motion, /addEventListener\(\s*["']change/);
  assert.match(motion, /autoplayVideo\.play\(/);
  assert.match(motion, /pexels-dj-loop-mobile\.jpg/);
  assert.doesNotMatch(motion, /addEventListener\(\s*["']scroll/);
  assert.match(styles, /min-height:\s*100dvh/);
  assert.match(styles, /@media\s*\(max-width:\s*720px\)/);
  assert.match(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(cloneStyles, /aspect-ratio:\s*9\s*\/\s*16/);
  assert.match(cloneStyles, /object-fit:\s*contain/);
  assert.match(cloneStyles, /overflow-wrap:\s*anywhere/);
});

test("homepage literal media paths resolve to verified local public assets", () => {
  const publicDir = join(process.cwd(), "public");
  const paths = [...homePage().matchAll(/(?:src|poster)="(\/[^"]+)"/g)].map((match) => match[1]);
  assert.ok(paths.length > 0);
  for (const assetPath of paths) {
    assert.equal(existsSync(join(publicDir, assetPath)), true, `missing local asset: ${assetPath}`);
  }
  assert.equal(existsSync(join(publicDir, "pexels-dj-loop-mobile.mp4")), true);
  assert.equal(existsSync(join(publicDir, "pexels-dj-loop-mobile.jpg")), true);
});

test("root layout loads the isolated homepage stylesheet after legacy layers", () => {
  const layout = readFileSync(join(appDir, "layout.tsx"), "utf8");
  assert.match(layout, /import\s+["']\.\/apollo-home\.css["']/);
  assert.ok(layout.indexOf('"./apollo-home.css"') > layout.indexOf('"./taste-pass.css"'));
});
