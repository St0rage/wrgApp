import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Gap, Header, HomeGasTabSection, Search } from '../../components';

const HomeGas = ({navigation}) => {
  return (
    <View style={styles.page}>
      <View style={styles.wrapper}>
        <Header onPress={() => navigation.toggleDrawer()} />
      </View>
      <Gap height={20} />
      <HomeGasTabSection />
    </View>
  )
}

export default HomeGas

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapper: {
    paddingHorizontal: 16
  }
})