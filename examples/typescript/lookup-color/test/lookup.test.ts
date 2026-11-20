import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, test } from "node:test";
import { fileURLToPath } from "node:url";

const cli = fileURLToPath(new URL("../scripts/lookup.ts", import.meta.url));
const project = mkdtempSync(join(tmpdir(), "lookup-color-"));
after(() => rmSync(project, { recursive: true, force: true }));

function run(...args: string[]) {
  // 只授予读取权限；查询不应依赖可写的包目录或项目目录。
  const result = spawnSync(process.execPath, ["--permission", "--allow-fs-read=*", cli, ...args], {
    cwd: project, encoding: "utf8",
  });
  if (result.error) throw result.error;
  return result;
}

test("从包外查询指定项目，重复运行得到相同的原始色值", () => {
  const source = '[palette]\nmint = "#aB12cD"\n';
  writeFileSync(join(project, "project.toml"), source);
  for (let i = 0; i < 2; i++) {
    const { status, stdout, stderr } = run("project.toml", "mint");
    assert.equal(status, 0, stderr);
    assert.equal(stdout, "#aB12cD\n");
    assert.equal(stderr, "");
  }
  assert.equal(readFileSync(join(project, "project.toml"), "utf8"), source);
});

for (const [label, source, args, reason] of [
  ["不接受改色参数", '[palette]\nmint = "#112233"', ["mint", "#FFFFFF"], /用法/],
  ["名称区分大小写", '[palette]\nmint = "#112233"', ["Mint"], /没有名称/],
  ["未提供文件", null, ["mint"], /无法读取/],
  ["缺少配置节", 'title = "虚构画册"', ["mint"], /\[palette\]/],
  ["TOML 语法错误", "[palette", ["mint"], /语法/],
  ["同表存在无效色值", '[palette]\nmint = "#112233"\nfog = "gray"', ["mint"], /\/palette\/fog/],
] as const) {
  test(label, () => {
    const file = `${label}.toml`;
    if (source !== null) writeFileSync(join(project, file), source);
    const { status, stdout, stderr } = run(file, ...args);
    assert.equal(status, 1);
    assert.equal(stdout, "");
    assert.match(stderr, reason);
  });
}
