import {  Tabs } from 'expo-router';

const TabsLayout = () =>{
  return(
  <Tabs>
  <Tabs.Screen name = "index" options={{
    headerTitle :"Home",
  }}
  />
  <Tabs.Screen name ="Users/[id]"
   options={{
headerTitle:"user page",
  }}
  />
  </Tabs>
  );
};
export default TabsLayout;