import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'; 
import { FontAwesome,Ionicons,Feather,Entypo} from '@expo/vector-icons';
const Tabs = createMaterialBottomTabNavigator();

export default function BottomNavigator() {
 
 
    return (
            

            <Tabs.Navigator barStyle={{ backgroundColor: '#f69b31' }} >
            
              <Tabs.Screen name="Home"
               
                options={{
                headerShown:false,
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                  <FontAwesome name="home" size={24} color="black" />
                ),
              }}
               />
              
              <Tabs.Screen 
                name="Categories" 
                
                options={{
                  tabBarLabel: 'Categories',
                  tabBarIcon: ({ color }) => (
                    <Ionicons name="md-grid" size={24} color="black" />                ),
              }}
                />
              
              <Tabs.Screen 
                name="Search"
               
                options={{    
                  tabBarLabel: 'Search',
                  tabBarIcon: ({ color }) => (
                    <FontAwesome name="search" size={24} color="black" />),
              }}  
                />


              <Tabs.Screen 
                name="MyList"
               
                options={{
                  tabBarLabel: 'My List',
                  tabBarIcon: ({ color }) => (
                    <Entypo name="camera" size={24} color="black" />            ),
              }}
              />
              

              <Tabs.Screen 
                name="MyBasket" 
               
                options={{
                  tabBarLabel: 'MyBasket',
                  tabBarIcon: ({ color }) => (
                    <Feather name="shopping-bag" size={24} color="black" />),
                 
                   
                }}
                />

            </Tabs.Navigator>
            
      );
}