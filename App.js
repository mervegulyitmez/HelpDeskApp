import React from 'react';
import {ApplicationProvider} from '@ui-kitten/components';
import {myTheme} from './eva.theme'; 
import * as eva from '@eva-design/eva';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SubmitTicketScreen from './src/screens/SubmitTicketScreen';
import TicketListScreen from './src/screens/TicketListScreen';
import {TicketProvider} from './src/components/TicketContext';
import {createStackNavigator} from '@react-navigation/stack';
import TicketDetailsScreen from './src/screens/TicketDetailsScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const TicketDetailsStack = createStackNavigator();
const TicketSubmitStack = createStackNavigator();

const TicketDetailsNavigator = () => {
  return (
    <TicketDetailsStack.Navigator>
      <TicketDetailsStack.Screen
        name="Ticket List"
        component={TicketListScreen}
        options={{
          headerTitle: null,
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: myTheme.colors.primary,
          },
        }}
      />
      <TicketDetailsStack.Screen
        name="TicketDetailsScreen"
        component={TicketDetailsScreen}
        options={{
          headerTitle: null,
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: myTheme.colors.primary,
          },
          headerBackTitleStyle: {
            fontSize: 18,
          },
        }}
      />
      {/* Add other screens related to ticket details here */}
    </TicketDetailsStack.Navigator>
  );
};



const TicketSubmissionNavigator = () => {
  return (
    <TicketSubmitStack.Navigator>
      <TicketSubmitStack.Screen
        name="Submit Ticket"
        component={SubmitTicketScreen}
        options={{
          headerTitle: null,
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: myTheme.colors.primary,
          },
        }}
      />
    </TicketSubmitStack.Navigator>
  );
};

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={myTheme}>
      <SafeAreaProvider>
        <NavigationContainer theme={myTheme}>
          <TicketProvider>
            <Tab.Navigator
              screenOptions={({route}) => ({
                headerShown: false,
                tabBarStyle: {
                  backgroundColor: '#FEFBEA',
                  borderColor: '#FEFBEA',
                  paddingBottom: 10,
                },
                tabBarActiveTintColor: myTheme.colors.primary,
                tabBarInactiveTintColor: myTheme.colors.text,
                tabBarIcon: ({color, size}) => {
                  let iconName;

                  if (route.name === 'Submit Ticket') {
                    iconName = 'file-document-edit-outline';
                  } else if (route.name === 'Tickets') {
                    iconName = 'format-list-bulleted-square';
                  }

                  // Use the Icon component from react-native-vector-icons
                  return <Icon name={iconName} size={size} color={color} />;
                },
              })}>
              <Tab.Screen
                name="Submit Ticket"
                component={TicketSubmissionNavigator}
              />
              <Tab.Screen
                name="Tickets"
                component={TicketDetailsNavigator}
                options={{headerTitle: null}}
              />
            </Tab.Navigator>
          </TicketProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </ApplicationProvider>
  );
};

export default App;
