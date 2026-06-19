import { useState } from "react";

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

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert("Enter all fields");

      return;
    }

    try {
      await api.post("/api/auth/register", {
        username,
        password,
      });

      Alert.alert("Account created");

      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Registration failed");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={styles.title}>Create Account</Text>

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

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.btnText}>Register</Text>
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
  },

  btnText: {
    color: "white",

    textAlign: "center",
  },
});
