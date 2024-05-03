import { useLocalSearchParams } from "expo-router";
import { View , Text} from "react-native";
const Userpage = () =>{
    const {id} = useLocalSearchParams<{id:string }>() ;
    return (
    <View>
        <Text>User page = {id}</Text>
        </View> 
    );
};
export default Userpage;
