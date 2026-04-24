import * as core from "@actions/core";
import * as exec from "@actions/exec";
import { installNitro } from "@chillicream/nitro-github-actions";
import pkg from "../package.json" with { type: "json" };

const nitroVersion: string = pkg.version;

async function executeCommand(): Promise<void> {
  try {
    const stage = core.getInput("stage", { required: true });
    const apiId = core.getInput("api-id", { required: true });
    const apiKey = core.getInput("api-key", { required: true });
    const sourceSchemaFiles = core.getMultilineInput("source-schema-files", {
      required: true,
    });
    const legacyV1Archive = core.getInput("legacy-v1-archive") || null;
    const cloudUrl = core.getInput("cloud-url") || null;

    const args: string[] = [
      "fusion",
      "validate",
      "--stage",
      stage,
      "--api-id",
      apiId,
    ];

    for (const file of sourceSchemaFiles) {
      args.push("--source-schema-file", file);
    }

    if (legacyV1Archive) {
      args.push("--legacy-v1-archive", legacyV1Archive);
    }

    if (cloudUrl) {
      args.push("--cloud-url", cloudUrl);
    }

    const env = {
      ...process.env,
      NITRO_API_KEY: apiKey,
    };

    const exitCode = await exec.exec("nitro", args, { env });

    if (exitCode !== 0) {
      core.setFailed(`Nitro CLI exited with code ${exitCode}`);
    }
  } catch (error) {
    core.setFailed(error instanceof Error ? error.message : String(error));
  }
}

async function run(): Promise<void> {
  await installNitro(nitroVersion);

  await executeCommand();
}

run();
