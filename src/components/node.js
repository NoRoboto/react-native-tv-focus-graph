import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Proptypes from "prop-types";

import { usePrevious } from "../lib/hooks";

export function FocusableNode({
  children,
  contentContainerStyle,
  id,
  activeId,
  registerActions,
  actions
}) {
  const isActive = id === activeId;
  const previousId = usePrevious(activeId);

  useEffect(() => {
    if (previousId === id) {
      if (actions.blur) {
        actions.blur(previousId);
      }
    }
  }, [previousId]);

  useEffect(() => {
    if (isActive) {
      registerActions(id, actions);
    }
  }, [activeId]);

  const styles = contentContainerStyle || StyleSheet.flatten([
    defaultContainerStyles.button,
    isActive && defaultContainerStyles.active,
  ]);

  return (
    <View hasTVPreferredFocus={isActive} style={styles}>
      {children}
    </View>
  );
}

const defaultContainerStyles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4ecdc4",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  active: {
    backgroundColor: "#e63946",
  },
});

FocusableNode.prototype = {
  children: Proptypes.element.isRequired,
  contentContainerStyle: Proptypes.object,
  id: Proptypes.oneOfType([
    Proptypes.string,
    Proptypes.number
  ]),
  activeId: Proptypes.oneOfType([
    Proptypes.string,
    Proptypes.number
  ]),
  registerActions: Proptypes.object,
  actions: Proptypes.object
};