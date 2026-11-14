// Static checks for every package under plugins/. No dependencies: run by CI and before each release.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const errors = [];
const check = (ok, message) => { if (!ok) errors.push(message); };
const INVISIBLE = /[\u200B-\u200F\u202A-\u202E\u2060-\u2069\uFEFF]|[\u{E0000}-\u{E007F}]/u;
const frontMatter = (text) => /^---\n([\s\S]*?)\n---\n/.exec(text)?.[1];
const field = (fm, name) => new RegExp(`^${name}:\\s*(.+)$`, 'm').exec(fm ?? '')?.[1]?.trim();
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));

const marketplace = JSON.parse(readFileSync('.claude-plugin/marketplace.json', 'utf8'));
const listed = new Map(marketplace.plugins.map((p) => [p.source.replace(/^\.\//, ''), p]));

for (const dir of readdirSync('plugins', { withFileTypes: true }).filter((d) => d.isDirectory())) {
  const root = `plugins/${dir.name}`;
  const manifest = JSON.parse(readFileSync(`${root}/.claude-plugin/plugin.json`, 'utf8'));
  check(manifest.name === dir.name, `${root}: plugin.json name must equal the folder name`);
  check(/^[a-z0-9]+(-[a-z0-9]+)*$/.test(manifest.name) && manifest.name.length <= 64, `${root}: invalid plugin name`);
  for (const key of ['version', 'description', 'author', 'license', 'homepage', 'repository']) check(manifest[key], `${root}: plugin.json is missing ${key}`);
  const entry = listed.get(root);
  check(entry, `${root}: not listed in .claude-plugin/marketplace.json`);
  check(entry?.name === manifest.name && entry?.version === manifest.version, `${root}: marketplace entry name or version differs from plugin.json`);
  check(existsSync(`${root}/LICENSE`), `${root}: LICENSE missing`);
  check(existsSync(`${root}/.claude-plugin/icon.png`), `${root}: icon missing`);
  const readme = existsSync(`${root}/README.md`) ? readFileSync(`${root}/README.md`, 'utf8') : '';
  const words = readme.replace(/```[\s\S]*?```/g, '').split(/\s+/).filter(Boolean).length;
  check(words >= 40, `${root}: README must have at least 40 words outside code blocks (found ${words})`);

  for (const skill of existsSync(`${root}/skills`) ? readdirSync(`${root}/skills`) : []) {
    const file = `${root}/skills/${skill}/SKILL.md`;
    check(existsSync(file), `${file}: missing`);
    if (!existsSync(file)) continue;
    const fm = frontMatter(readFileSync(file, 'utf8'));
    check(field(fm, 'name') === skill, `${file}: name must equal the folder name`);
    const description = field(fm, 'description') ?? '';
    check(description.length > 0 && description.length <= 1024, `${file}: description must be 1 to 1024 characters`);
  }
  for (const kind of ['agents', 'commands']) {
    for (const f of existsSync(`${root}/${kind}`) ? readdirSync(`${root}/${kind}`) : []) {
      const fm = frontMatter(readFileSync(`${root}/${kind}/${f}`, 'utf8'));
      check(fm !== undefined, `${root}/${kind}/${f}: front matter missing`);
      check((field(fm, 'description') ?? '').length > 0, `${root}/${kind}/${f}: description missing`);
      if (kind === 'agents') check(field(fm, 'name') === f.replace(/\.md$/, ''), `${root}/${kind}/${f}: name must equal the file name`);
    }
  }
  for (const file of walk(root)) {
    check(statSync(file).size < 256 * 1024 || /\.(png|jpe?g|gif|webp)$/.test(file), `${file}: larger than 256 KiB`);
    if (/\.(md|json)$/.test(file)) check(!INVISIBLE.test(readFileSync(file, 'utf8')), `${file}: invisible character found`);
    // Hooks, MCP servers and scripts would need the disclosures the plugin directory asks for.
    check(!/(^|\/)(hooks|scripts|bin)\//.test(file.slice(root.length)) && !/\.mcp\.json$/.test(file), `${file}: this repository only ships plain Markdown packages`);
  }
}
if (errors.length > 0) {
  console.error(errors.map((e) => `x ${e}`).join('\n'));
  process.exit(1);
}
console.log(`All ${listed.size} package(s) valid.`);
