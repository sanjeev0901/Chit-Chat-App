import { View, Text, ALert, TouchableOpacity } from "react-native";
import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { auth, db } from "../firebase";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Avatar } from "react-native-elements";
import { GiftedChat } from "react-native-gifted-chat";

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const signout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={signout}>
          <AntDesign name='logout' size={30} color='black' />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View>
          <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
        </View>
      ),
    });
  });

  useLayoutEffect(() => {
    db.collection("chats")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.id,
            text: doc.data().text,
            createdAt: doc.data().createdAt.toDate(),
            user: {
              _id: doc.data().user.id,
              name: doc.data().user.name,
              avatar: doc.data().user.avatar,
            },
          }))
        );
      });
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages));
    const {_id,createdAt,text,user} = messages[0];
    db.collection("chats").add({_id,createdAt,text,user}); 
  }, []);
  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL,
      }}
    />
  );
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
};
