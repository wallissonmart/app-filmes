import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import Details from '../pages/Details';
import Search from '../pages/Search';
import Series from '../pages/Series';
import Movies from '../pages/Movies';

const Stack = createNativeStackNavigator();

function StackRoutesFav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorites"
        component={Movies}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Series"
        component={Series}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerShown: false,
          title: 'Detalhes',
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: 'Sua busca',
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
          },
          headerStyle: {
            backgroundColor: '#141a29',
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default StackRoutesFav;
