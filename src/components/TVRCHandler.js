/**
 * TVRCHandler component: 
 * Control and dispatch approach, keeps the current index and the current node updated 
 * in the node graph.
 * @author Daniel Diaz
 */

import { useState, useEffect, useMemo } from "react";
import { TVEventHandler } from "react-native";
import Proptypes from "prop-types";

import Graph from "../lib/graph";
import constants from "../lib/constants";

function TVRCHandler({ enable, children, initialElementId, graphModel }) {
  const [currentElementId, setCurrentElementId] = useState(initialElementId);
  let currentActions = {};

  useEffect(() => {
    if (enable) {
      enableTVEventHandler();
    } else {
      disableTVEventHandler();
    }

    return function cleanup() {
      disableTVEventHandler();
    };
  }, [enable, currentElementId]);
  // https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often

  useEffect(() => {
    // build graph.
    this.grap = new Graph();
    this.grap.buildGraph(graphModel);
    //this.grap.show();
  }, []);

  const handleTVRemoteEvent = (cmp, event) => {
    const { eventKeyAction, eventType } = event;

    if (!this.grap) return;

    // release action or fisrt app focus
    if (eventKeyAction === 0 || eventKeyAction === -1) {
      return;
    }

    const currentVertexInfo = this.grap.getVertex(currentElementId);

    if (eventType) {
      const newElementId = currentVertexInfo.refs[eventType];

      if (newElementId) {
        setCurrentElementId(newElementId);
      }

      if (currentActions[eventType]) {
        currentActions[eventType](currentElementId);
      }
    }
  };

  const enableTVEventHandler = () => {
    if (this.evtHandler) return;
    this.evtHandler = new TVEventHandler();
    this.evtHandler.enable(this, handleTVRemoteEvent);
  };

  const disableTVEventHandler = () => {
    if (this.evtHandler) {
      this.evtHandler.disable();
      delete this.evtHandler;
    }
  };

  const registerActions = (id, actions) => {
    try {
      // Todo move to contex api store
      if (actions[constants.actions.onFocus]) {
        actions[constants.actions.onFocus](id);
      }

      currentActions = actions;
    } catch (error) {
      const msg = constants.errorMessages(error).registerActions;
      console.error(msg);
    }
  };

  const MemoChildren = useMemo(() => {
    return children({ currentElementId, registerActions });
  }, [currentElementId]);

  return MemoChildren || null;
}

TVRCHandler.prototype = {
  enable: Proptypes.bool.isRequired,
  children: Proptypes.element.isRequired,
  graphModel: Proptypes.object.isRequired,
  initialElementId: Proptypes.string.isRequired,
};

export { TVRCHandler };
