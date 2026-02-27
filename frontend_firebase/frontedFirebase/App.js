import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { ref, push, onValue } from "firebase/database";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  const [nameProducto, setNameProducto] = useState("");
  const [categorie, setCategorie] = useState("");
  const [producto, setProducto] = useState([]);

  function enviarDatos() {
    push(ref(db, "usuarios"), {
      name: name,
      email: email,
    }).then(function () {
      Alert.alert("Se han guardado los datos");
      setName("");
      setEmail("");
    });
  }
  function enviarProducto() {
    push(ref(db, "productos"), {
      nameProducto: nameProducto,
      categorie: categorie,
    }).then(() => {
      Alert.alert("Producto guardado");
      setNameProducto("");
      setCategorie("");
    });
  }

  useEffect(() => {
    const productosRef = ref(db, "productos");

    onValue(productosRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const lista = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setProducto(lista);
      } else {
        setProducto([]);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold" }}>REGISTRO DE USUSARIO</Text>
      <TextInput
        placeholder="Ingrese Su nombre"
        value={name}
        onChangeText={function (text) {
          setName(text);
        }}
      ></TextInput>
      <TextInput
        placeholder="Ingrese Su Correo"
        value={email}
        onChangeText={function (text) {
          setEmail(text);
        }}
      ></TextInput>
      <Button title="Enviar" onPress={enviarDatos}></Button>

      <Text style={{ fontWeight: "bold", marginTop: 20 }}>
        REGISTRO DE PRODUCTO
      </Text>

      <TextInput
        placeholder="Nombre del producto"
        value={nameProducto}
        onChangeText={setNameProducto}
      />

      <TextInput
        placeholder="Categoría"
        value={categorie}
        onChangeText={setCategorie}
      />

      <Button title="Guardar Producto" onPress={enviarProducto} />

      <Text style={{ fontWeight: "bold", marginTop: 20 }}>
        LISTA DE PRODUCTOS
      </Text>

      <FlatList
        data={producto}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginTop: 10 }}>
            <Text>Nombre: {item.nameProducto}</Text>
            <Text>Categoría: {item.categorie}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  buttonContainer: {
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
  },

  productCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },

  productCategory: {
    color: "#666",
    marginTop: 4,
  }
});