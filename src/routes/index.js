import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import StackRoutes from './stackRoutes';
import StackRoutesSeries from './stackRoutesSeries';
import StackRoutesFav from './stackRoutesFav';

const Drawer = createDrawerNavigator();

function Routes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#141a29',
          paddingTop: 20,
        },
        drawerActiveBackgroundColor: '#5068A3',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#fff',
      }}
    >
      <Drawer.Screen
        name="HomeDrawer"
        component={StackRoutes}
        options={{
          title: 'Filmes',
          drawerIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name={focused ? 'movie-open' : 'movie-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="SeriesDrawer"
        component={StackRoutesSeries}
        options={{
          title: 'Séries',
          drawerIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? 'tv' : 'tv-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Movies"
        component={StackRoutesFav}
        options={{
          title: 'Favoritos',
          drawerIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name={focused ? 'movie-star' : 'movie-star-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default Routes;
