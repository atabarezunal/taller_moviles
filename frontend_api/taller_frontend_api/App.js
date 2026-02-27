import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'

export default function App() {

  const [variable, setVariable] = useState([])
  const [name, setName] = useState("")
  const [franchise, setFranchise] = useState("")

  


  function traerDatos() {
    fetch('http://10.14.174.27:8000/api/character')
    .then(function (response){
      return response.json()
    })
    .then(function (data){
      setVariable(data)
    })
  }

  function mandarDatos(){
    const datos = { 
      name: name, 
      franchise: franchise
    }
    fetch('http://10.14.174.27:8000/api/character',{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(datos),
    })
    .then(response => response.json())
    .then(data=>{
      setName("")
      setFranchise("")
    })
    .catch(error => console.error(error))
  }

  function ocultarDatos() {
      setVariable([])
  }

  useEffect(traerDatos, [])

  return (

    <View style={styles.container}>

    <TextInput
      placeholder='Ingresa Tu Personaje'
        maxLength={25}
        value={name}
        onChangeText={setName}
    >
    </TextInput>

    <TextInput
      placeholder='Ingresa la franquisia de tu personaje'
        maxLength={25}
        value={franchise}
        onChangeText={setFranchise}
    >
    </TextInput>

    <Pressable onPress={mandarDatos}>
        <Text>
          Guardar
        </Text>
      </Pressable>

      <Pressable style={styles.button} onPress={traerDatos}>
        <Text style={styles.text}>
          Traer Datos
        </Text>
      </Pressable>

      <Pressable style={styles.button} onPress={ocultarDatos}>
        <Text style={styles.text}>
          Ocultar Datos
        </Text>
      </Pressable>

        <View>
          {variable.map(dato => 
          <View key={dato.id}>
            <Text>
            {dato.name}
            {dato.franchise}
            </Text>
          </View>
          )}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

})
