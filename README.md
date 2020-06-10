# react-native-focus-graph

# Under Construction :building_construction:

The purpose of this library is overwrite the current of focus layout (at logic level, no native) for TV, using a graph (adjacency list) as a reference.

## Getting started

`$ npm install react-native-focus-graph --save`

### Mostly automatic installation

`$ react-native link react-native-focus-graph`

## Usage
```javascript
import React from 'react';
import {StyleSheet, View, TouchableHighlight, Text} from 'react-native';
import {TVRCHandler, FocusableNode} from 'react-native-focus-graph';

export default function TestPanel() {
  this.graphModel = {
    vertexList: ['1A', '1B', '1C', '1D'],
    edgeList: [
      {vertex: '1A', right: '1B'},
      {vertex: '1B', left: '1A', right: '1C'},
      {vertex: '1C', left: '1B', right: '1D'},
      {vertex: '1D', left: '1C'},
    ],
  };

  return (
    <TVRCHandler
      graphModel={this.graphModel}
      initialElementId="1C"
      children={TestModel}
      enable
    />
  );
}

const TestModel = ({currentElementId, registerActions}) => {

  return (
    <View style={styles.container}>
      <View style={styles.row}>
         {['A', 'B', 'C', 'D'].map(element => (
          <FocusableNode
            registerActions={registerActions}
            id={`1${element}`}
            activeId={currentElementId}
            key={element}
            actions={{
              select: (id) => console.log(`onPress ${id}`),
              focus: (id) => console.log(`focused ${id}`),
              blur: (id) => console.log(`onBlur ${id}`),
            }}
          >
            <TouchableHighlight>
              <Text>{`1${element}`}</Text>
            </TouchableHighlight>
          </FocusableNode>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
```
