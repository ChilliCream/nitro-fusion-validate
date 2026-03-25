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
```

## Inputs

| Name                  | Required | Description                   |
| --------------------- | -------- | ----------------------------- |
| `stage`               | Yes      | The name of the stage         |
| `api-id`              | Yes      | The ID of the API             |
| `api-key`             | Yes      | API key for authentication    |
| `source-schema-files` | Yes      | Paths to source schema files  |
| `cloud-url`           | No       | The URL of the Nitro registry |

If you self-host Nitro or use a dedicated hosted instance, you can specify the `cloud-url` input to point to your instance.
