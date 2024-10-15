import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Container from '@component/shared/Containner';
import { useStore } from '@provider/store/testZustand';

export default function moreTab() {
  const bears = useStore(state => state.bears);
  return (
    <Container>
      <View style={styles.container}>
        <Text>Brif Description here about the company</Text>
        <Text style={{ fontSize: 30 }}>{bears}</Text>
        <Add />
      </View>
    </Container>
  );
}

// const Add = () => {
//   const { increasePopulation, removeAllBears } = useStore(state => ({
//     bears: state.bears,
//     increasePopulation: state.increasePopulation,
//     removeAllBears: state.removeAllBears,
//   }));
//   return (
//     <View>
//       <Button title="add" onPress={increasePopulation} />
//       <Button title="clear" onPress={removeAllBears} />
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Add = () => {
  const increasePopulation = useStore(state => state.increasePopulation);
  const removeAllBears = useStore(state => state.removeAllBears);
  return (
    <View>
      <Button title="Add Bear" onPress={increasePopulation} />
      <Button title="Clear Bears" onPress={removeAllBears} />
    </View>
  );
};
