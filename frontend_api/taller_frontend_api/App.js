import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'

export default function App() {

  const [variable, setVariable] = useState([])
  const [character, setCharacter] = useState([])

  const datos = { name: character }


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
    fetch('http://10.14.174.27:8000/api/character',{
      method: 'POST',
      headers: {
        'Content-Type' : 'aplication/json'
      },
      body: JSON.stringify(datos),
    })
    .then(response => response.json())
    .then(data=>{
      setCharacter("")
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
        value={character}
        onChangeText={setCharacter}
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

        <View> style={styles.container}
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
  button:{
    marginTop: 30
  }
})
