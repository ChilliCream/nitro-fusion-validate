# Nitro Fusion Validate

A GitHub Action that validates GraphQL source schemas against the Nitro registry.

## Usage

```yaml
- uses: ChilliCream/nitro-fusion-validate@v16
  with:
    stage: <stage>
    api-id: <api-id>
    api-key: <api-key>
    source-schema-files:
      - ./src/SchemaA/schema.graphqls
      - ./src/SchemaB/schema.graphqls
    # Optional
    commentMode: none
    cloud-url: <cloud-url>
```

## Inputs

| Name                  | Required | Description                                                                     |
| --------------------- | -------- | ------------------------------------------------------------------------------- |
| `stage`               | Yes      | The name of the stage                                                           |
| `api-id`              | Yes      | The ID of the API                                                               |
| `api-key`             | Yes      | API key for authentication                                                      |
| `source-schema-files` | Yes      | Paths to source schema files                                                    |
| `commentMode`         | No       | Pull request feedback mode on failure: `comment`, `review`, or `none` (default) |
| `cloud-url`           | No       | The URL of the Nitro registry                                                   |

If you self-host Nitro or use a dedicated hosted instance, you can specify the `cloud-url` input to point to your instance.

## Pull Request comments

Use `commentMode` to control pull request feedback behavior.

`commentMode: comment` comments on the pull request - requires `issues: write` permissions

`commentMode: review` creates a pull request review with a comment - requires `pull-requests: write` permissions

Example for `commentMode: comment`:

```yaml
jobs:
  validate:
    permissions:
      contents: read
      issues: write
```

Example for `commentMode: review`:

```yaml
jobs:
  validate:
    permissions:
      contents: read
      pull-requests: write
```

> Note: When you define job-level `permissions`, GitHub no longer applies the default permission set for that job. Make sure to explicitly include every permission the job needs (for example `contents: read`).
