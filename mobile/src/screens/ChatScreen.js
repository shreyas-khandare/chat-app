import { useState, useEffect, useContext, useRef } from "react";

import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";

import api from "../services/api";

import MessageBubble from "../components/MessageBubble";

import { AuthContext } from "../context/AuthContext";

import useSocket from "../hooks/useSocket";

export default function ChatScreen() {
  const { token, user, logout } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [text, setText] = useState("");

  const listRef = useRef(null);

  const { socketStatus, sendMessage } = useSocket(
    token,

    (msg) => {
      setMessages((prev) => [...prev, msg]);
    },
  );

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    setLoading(true);

    try {
      const res = await api.get("/api/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages(res.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    if (!text.trim()) {
      return;
    }

    sendMessage(text);

    setText("");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <Text style={styles.status}>{socketStatus}</Text>

        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            ref={listRef}
            data={messages}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <MessageBubble message={item} isMine={item.sender === user.id} />
            )}
            onContentSizeChange={() => {
              listRef.current?.scrollToEnd();
            }}
          />
        )}

        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Message"
          />

          <TouchableOpacity
            style={[styles.sendBtn, !text.trim() && styles.disabled]}
            onPress={handleSend}
          >
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 10,
  },

  status: {
    textAlign: "center",

    marginBottom: 5,
  },

  logout: {
    textAlign: "right",

    marginBottom: 10,

    fontWeight: "bold",
  },

  inputBox: {
    flexDirection: "row",

    alignItems: "center",

    paddingVertical: 8,

    gap: 10,
  },

  input: {
    flex: 1,

    borderWidth: 1,

    padding: 10,

    borderRadius: 10,
  },

  sendBtn: {
    backgroundColor: "black",

    padding: 12,

    borderRadius: 8,
  },

  disabled: {
    opacity: 0.5,
  },

  sendText: {
    color: "white",
  },
});
