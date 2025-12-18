import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ChoosePlanScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Choose your Plan</Text>
    </View>
  );
};

export default ChoosePlanScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, fontWeight: '600' },
});
