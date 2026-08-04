# @pipeworx/anapioficeandfire

[An API of Ice and Fire](https://anapioficeandfire.com) MCP — A Song of Ice and Fire (Game of Thrones) books, characters, houses. Keyless.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

- `books(name?, fromReleaseDate?, toReleaseDate?, page?, pageSize?)`
- `book(id)`
- `characters(name?, culture?, born?, died?, isAlive?, gender?, page?, pageSize?)`
- `character(id)`
- `houses(name?, region?, words?, hasTitles?, hasSeats?, hasDiedOut?, hasAncestralWeapons?, page?, pageSize?)`
- `house(id)`

## Data source

`https://anapioficeandfire.com/api/`

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "anapioficeandfire": {
      "url": "https://gateway.pipeworx.io/anapioficeandfire/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Anapioficeandfire data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
