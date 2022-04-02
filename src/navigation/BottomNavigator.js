import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'; 
import { FontAwesome,Ionicons,Feather,Entypo,MaterialIcons,FontAwesome5,Foundation} from '@expo/vector-icons';
import Calendar from './../screens/Calendar/Calendar'
import Todo from './../screens/Todo/Todo'
//import Timer from './../screens/Timer/Timer'
import Statistics from './../screens/Statistics/Statistics'
import Settings from '../screens/Settings/Settings';
import {TimerStack} from './TimerNavigation'



export default function BottomNavigator() {
 
  const Tabs = createMaterialBottomTabNavigator();
    return (
            
          
            <Tabs.Navigator barStyle={{ backgroundColor: 'white'}} initialRouteName={"Timer"} shifting={false}>
            
              <Tabs.Screen name="Calendar"
                component={Calendar}
                options={{
                headerShown:false,
                tabBarLabel: 'Calendar',
                tabBarIcon: ({ color }) => (
                  <FontAwesome5 name="calendar" size={24} color={color} />
                ),
              }}
               />
              
              <Tabs.Screen 
                name="Todo" 
                component={Todo}
                options={{
                  tabBarLabel: 'Todo',
                  tabBarIcon: ({ color }) => (
                    <Ionicons name="checkmark-done" size={24} color={color} />                ),
              }}
                />
              
              <Tabs.Screen 
                name="Timer"
                component={TimerStack}
                options={{    
                  tabBarLabel: 'Timer',
                  tabBarIcon: ({ color }) => (
                    <MaterialIcons name="timer" size={24} color={color} />),
              }}  
                />


              <Tabs.Screen 
                name="MyList"
                component={Statistics}
                options={{
                  tabBarLabel: 'Statistics',
                  tabBarIcon: ({ color }) => (
                    <Foundation name="graph-bar" size={24} color={color} />            ),
              }}
              />
              

              <Tabs.Screen 
                name="Settings" 
                component={Settings}
                options={{
                  tabBarLabel: 'Settings',
                  tabBarIcon: ({ color }) => (
                    <Feather name="settings" size={24} color={color} />),
                 
                   
                }}
                />

            </Tabs.Navigator>
         
            
      );
}