import { useState, useContext } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import api from "../services/api";

import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Enter all fields");

      return;
    }

    try {
      const res = await api.post("/api/auth/login", {
        username,
        password,
      });

      await login(
        res.data.token,

        res.data.user,
      );
    } catch (error) {
      Alert.alert("Login failed");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={styles.title}>Chat Login</Text>

        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={styles.link}>Create Account</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",

    padding: 20,
  },

  title: {
    fontSize: 30,

    textAlign: "center",

    marginBottom: 30,
  },

  input: {
    borderWidth: 1,

    padding: 12,

    marginBottom: 15,

    borderRadius: 8,
  },

  button: {
    backgroundColor: "black",

    padding: 15,

    borderRadius: 8,

    marginBottom: 20,
  },

  btnText: {
    color: "white",

    textAlign: "center",
  },

  link: {
    textAlign: "center",

    fontSize: 16,
  },
});
