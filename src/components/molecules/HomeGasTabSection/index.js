import React, { memo, useState } from 'react';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import FirstRoute from './FirstRoute';
import SecondRoute from './SecondRoute';

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute
})

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'black'}}
    style={{ backgroundColor: 'white' }}
    labelStyle={{ fontWeight: '500', color: 'black' }}
  />
);

const HomeGasTabSection = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {key: 'first', 'title': 'Belum Diambil'},
    {key: 'second', 'title': 'Diambil'}
  ])

  return (
    <TabView 
        navigationState={{ index, routes }}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
  )
}

export default memo(HomeGasTabSection)