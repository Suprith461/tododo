import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'; 
import { FontAwesome,Ionicons,Feather,Entypo} from '@expo/vector-icons';
import Calendar from './../screens/Calendar/Calendar'
import Todo from './../screens/Todo/Todo'
import Timer from './../screens/Timer/Timer'
import Statistics from './../screens/Statistics/Statistics'
import Settings from '../screens/Settings/Settings';


export default function BottomNavigator() {
 
  const Tabs = createMaterialBottomTabNavigator();
    return (
            

            <Tabs.Navigator barStyle={{ backgroundColor: '#f69b31'}} initialRouteName={"Timer"}>
            
              <Tabs.Screen name="Calendar"
                component={Calendar}
                options={{
                headerShown:false,
                tabBarLabel: 'Calendar',
                tabBarIcon: ({ color }) => (
                  <FontAwesome name="home" size={24} color="black" />
                ),
              }}
               />
              
              <Tabs.Screen 
                name="Todo" 
                component={Todo}
                options={{
                  tabBarLabel: 'Todo',
                  tabBarIcon: ({ color }) => (
                    <Ionicons name="md-grid" size={24} color="black" />                ),
              }}
                />
              
              <Tabs.Screen 
                name="Timer"
                component={Timer}
                options={{    
                  tabBarLabel: 'Timer',
                  tabBarIcon: ({ color }) => (
                    <FontAwesome name="search" size={24} color="black" />),
              }}  
                />


              <Tabs.Screen 
                name="MyList"
                component={Statistics}
                options={{
                  tabBarLabel: 'Statistics',
                  tabBarIcon: ({ color }) => (
                    <Entypo name="camera" size={24} color="black" />            ),
              }}
              />
              

              <Tabs.Screen 
                name="Settings" 
                component={Settings}
                options={{
                  tabBarLabel: 'Settings',
                  tabBarIcon: ({ color }) => (
                    <Feather name="shopping-bag" size={24} color="black" />),
                 
                   
                }}
                />

            </Tabs.Navigator>
            
      );
}