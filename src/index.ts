interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * An API of Ice and Fire MCP.
 */


const BASE = 'https://anapioficeandfire.com/api';
const UA = 'pipeworx-mcp-anapioficeandfire/1.0 (+https://pipeworx.io)';

const tools: McpToolExport['tools'] = [
  { name: 'books', description: 'Search/list books.', inputSchema: { type: 'object', properties: { name: { type: 'string' }, fromReleaseDate: { type: 'string' }, toReleaseDate: { type: 'string' }, page: { type: 'number' }, pageSize: { type: 'number' } } } },
  { name: 'book', description: 'Single book by id.', inputSchema: { type: 'object', properties: { id: { type: 'number' } }, required: ['id'] } },
  { name: 'characters', description: 'Search/list characters.', inputSchema: { type: 'object', properties: { name: { type: 'string' }, culture: { type: 'string' }, born: { type: 'string' }, died: { type: 'string' }, isAlive: { type: 'boolean' }, gender: { type: 'string' }, page: { type: 'number' }, pageSize: { type: 'number' } } } },
  { name: 'character', description: 'Single character by id.', inputSchema: { type: 'object', properties: { id: { type: 'number' } }, required: ['id'] } },
  { name: 'houses', description: 'Search/list houses.', inputSchema: { type: 'object', properties: { name: { type: 'string' }, region: { type: 'string' }, words: { type: 'string' }, hasTitles: { type: 'boolean' }, hasSeats: { type: 'boolean' }, hasDiedOut: { type: 'boolean' }, hasAncestralWeapons: { type: 'boolean' }, page: { type: 'number' }, pageSize: { type: 'number' } } } },
  { name: 'house', description: 'Single house by id.', inputSchema: { type: 'object', properties: { id: { type: 'number' } }, required: ['id'] } },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'books': return iceGet(`/books?${qsFromArgs(args)}`);
    case 'book': return iceGet(`/books/${(args.id as number) | 0}`);
    case 'characters': return iceGet(`/characters?${qsFromArgs(args)}`);
    case 'character': return iceGet(`/characters/${(args.id as number) | 0}`);
    case 'houses': return iceGet(`/houses?${qsFromArgs(args)}`);
    case 'house': return iceGet(`/houses/${(args.id as number) | 0}`);
    default: throw new Error(`Unknown tool: ${name}`);
  }
}

function qsFromArgs(args: Record<string, unknown>): string {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(args)) {
    if (v == null) continue;
    if (typeof v === 'boolean') p.set(k, v ? 'true' : 'false');
    else p.set(k, String(v));
  }
  return p.toString();
}

async function iceGet(path: string): Promise<unknown> {
  const res = await fetch(`${BASE}${path}`, { headers: { Accept: 'application/json', 'User-Agent': UA } });
  if (res.status === 404) throw new Error('IceAndFire: not found');
  if (!res.ok) throw new Error(`IceAndFire: ${res.status}`);
  return res.json();
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;
