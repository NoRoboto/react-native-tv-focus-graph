/**
 * constants file.
 * @author Daniel Diaz
 */

function errorMessages (entity) {
  return {
    default: "Ups something went wrong",
    graph: {
      addVertexError: `Vertex: ${entity} already Exist!`
    },
    registerActions: `[registerActions] error: ${entity}`
  }
};

const actions = {
  default: "onFocus",
  onFocus: "focus",
  onBlur: "blur",
  onSelect: "select",
};

export default {
  errorMessages,
  actions
};