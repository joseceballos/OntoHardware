export interface SparqlBinding {
  [key: string]: { type: string; value: string };
}

export interface SparqlSelect {
  head: { vars: string[] };
  results: { bindings: SparqlBinding[] };
}
