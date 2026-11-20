import { readFileSync } from "node:fs";
import { Ajv } from "ajv";
import { parse } from "smol-toml";
import projectSchema from "../schemas/project.schema.json" with { type: "json" };
import hexColor from "../schemas/hex-color.schema.json" with { type: "json" };

type Project = { palette: Record<string, string> };
const validate = new Ajv({ ownProperties: true })
  .addSchema(hexColor, "hex-color.schema.json")
  .compile<Project>(projectSchema);

function lookup(args: string[]): string {
  const [file, name] = args;
  if (args.length !== 2 || !file || !name) {
    throw new Error("用法：node scripts/lookup.ts <项目 TOML 路径> <颜色名称>");
  }
  let source: string;
  try {
    source = readFileSync(file, "utf8");
  } catch {
    throw new Error("无法读取指定的项目 TOML，请检查路径和读取权限。");
  }
  let project: unknown;
  try {
    project = parse(source);
  } catch {
    throw new Error("项目 TOML 语法无效。");
  }
  if (!validate(project)) {
    const location = validate.errors?.[0]?.instancePath || "[palette]";
    throw new Error(`请检查 ${location}：项目必须含有 [palette] 表，每个颜色须有名称，值须为 #RRGGBB。`);
  }
  if (!Object.hasOwn(project.palette, name)) {
    throw new Error(`调色板中没有名称 ${JSON.stringify(name)}。`);
  }
  return project.palette[name];
}

try {
  console.log(lookup(process.argv.slice(2)));
} catch (error) {
  console.error(error instanceof Error ? error.message : "查询失败。");
  process.exitCode = 1;
}
