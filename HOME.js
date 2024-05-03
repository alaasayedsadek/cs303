import { StatusBar } from "expo-status-bar";

import {
  View,
  TextInput,
  Button,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator
} from "react-native";
import React, { useState, useEffect } from "react";

import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc
} from "firebase/firestore";
import { auth,db } from "../FireBase/Config";
import SignOut from "../screens/SignOut";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Item from "./item";
export default function Home() {
  const [userData, setUserData] = useState();
  const [flag, setflage] = useState(false);
  const [todos, setTodos] = useState([]);
  const [add,setadd]= useState({});
  const [change,setchage]= useState(false);
  //const userId = auth.currentUser.uid;
  const fetchData = async () => {
    try {
      const docRef = doc(db, "users", await AsyncStorage.getItem('@user_id'));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
        setflage(true);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };
  const fetchtodo = async () => {
    const q = query(collection(db, "Todos"), where("userid", "==",  await AsyncStorage.getItem('@user_id')));
    const querySnapshot = await getDocs(q).then((snap) => {
      let book = [];
      snap.docs.forEach((doc) => {
        book.push({ ...doc.data(), id: doc.id });
      });
      //console.log(book);
      const back = book;
      setTodos(back);
      setchage(false);
    });
  };
  const additem =async ()=>{const docRef = await addDoc(collection(db, "Todos"), {
    userid: await AsyncStorage.getItem('@user_id'),
    title: add,
    completed:false,
  });
  setchage(true);
}
  useEffect(() => {
    fetchData();
    fetchtodo();
  }, [!flag]);
  useEffect(() => {
    fetchtodo();
  }, [change]);
  //console.log(todos.length);
  return (
    <SafeAreaView style={styles.container}>
      <SignOut />
      <View>
        {userData ? (
          <View >
            <View style={styles.user}>
            <Text style={styles.txt}>User Name: {userData.userName}</Text>
            <Text style={styles.txt}>Email: {userData.email}</Text>
            <Text style={styles.txt}>address : {userData.address}</Text>
            <Text style={styles.txt}>phone : {userData.phone}</Text>
            </View>
            <TextInput
        placeholder="Email"
        value={add}
        onChangeText={setadd}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
            <Pressable onPress={additem} style={styles.butto}>
              <Text>add item </Text>
            </Pressable>
            <FlatList
            style={styles.list}
              data={todos}
              renderItem={({ item }) => {
                return (
                  <Item prop={item}/>
                );
              }}
              keyExtractor={(item) => item.id}
            />
            
          </View>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'#FEFAF6'
  },
  txt:{
    fontSize:20,
    fontWeight:'800',
    margin:6,
    fontStyle: "normal",
    color:'#FEFAF6'
  },
  user:{
    backgroundColor:'#102C57',
    margin:10,
    padding:18,
    borderRadius:40,
  },
  list:{
    backgroundColor:'#102C57',
    height:'auto',
    marginBottom:100,
    borderRadius:5,
  },
  item:{
    backgroundColor:'#FEFAF6',
    margin:10,
    borderRadius:40,
    padding:10,
  },
  itemtxt:{
    fontSize:20,
    fontWeight:'800',
    margin:6,
    fontStyle: "normal",
  },
  butto:{
    backgroundColor:"#DAC0A3",
    margin:10,
    marginLeft:250,
    borderRadius:10,
    padding:10,
},
});
