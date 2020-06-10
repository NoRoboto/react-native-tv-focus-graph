/**
 * based on https://medium.com/@ziyoshams/graphs-in-javascript-cc0ed170b156
 * @author Daniel Diaz
 * simple graph.
 */

export default class Graph {
  constructor() {
    this.AdjList = new Map();
  }

  addVertex(vertex) {
    if (!this.AdjList.has(vertex)) {
      this.AdjList.set(vertex, {nodes: [], refs: {}});
    } else {
      throw `Vertex: ${vertex} already Exist!`;
    }
  }

  addVertexReferences(vertex, refs) {
    if (this.AdjList.has(vertex)) {
      let obj = this.AdjList.get(vertex);
      obj.refs = refs;
    } else {
      throw `You should add '${vertex}' first`;
    }
  }

  addEdge(vertex, node) {
    if (this.AdjList.has(vertex)) {
      if (this.AdjList.has(node)) {
        let arr = this.AdjList.get(vertex).nodes;
        if (!arr.includes(node)) {
          arr.push(node);
        }
      }
    } else {
      throw `You should add '${vertex}' first`;
    }
  }

  show() {
    if (this.AdjList.size === 0) return;

    for (let [key, value] of this.AdjList) {
      console.log(key, value);
    }
  }

  buildAllVertexGraph(vertexList) {
    vertexList.map(vertex => this.addVertex(vertex));
  }

  buildAllEdgesGraph(edgeList) {
    edgeList.map(({vertex, ...refs}) => {
      for (refKey of Object.keys(refs)) {
        const node = refs[refKey];
        this.addEdge(vertex, node);
      }

      this.addVertexReferences(vertex, refs);
    });
  }

  buildGraph({vertexList, edgeList}) {
    this.buildAllVertexGraph(vertexList);
    this.buildAllEdgesGraph(edgeList);
  }

  getVertex(vertexName) {
    return this.AdjList.get(vertexName);
  }
}
