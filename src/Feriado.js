import React, { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';

export const Feriado = () => {
  const [feriados, setFeriados] = useState('');
  const [reveillon, setReveillon] = useState('');
  const [carnaval, setCarnaval] = useState('');
  const [tiradentes, setTiradentes] = useState('');

  const recuperarFeriados = () => {
    Keyboard.dismiss();
    try {
      let feriados = '[{"date":"2024-01-01","name":"Confraternização mundial","type":"national"},{"date":"2024-02-13","name":"Carnaval","type":"national"},{"date":"2024-03-29","name":"Sexta-feira Santa","type":"national"},{"date":"2024-03-31","name":"Páscoa","type":"national"},{"date":"2024-04-21","name":"Tiradentes","type":"national"},{"date":"2024-05-01","name":"Dia do trabalho","type":"national"},{"date":"2024-05-30","name":"Corpus Christi","type":"national"},{"date":"2024-09-07","name":"Independência do Brasil","type":"national"},{"date":"2024-10-12","name":"Nossa Senhora Aparecida","type":"national"},{"date":"2024-11-02","name":"Finados","type":"national"},{"date":"2024-11-15","name":"Proclamação da República","type":"national"},{"date":"2024-12-25","name":"Natal","type":"national"}]';  
      const jsonData = JSON.parse(feriados);
      for(let i in jsonData){
        if (jsonData[i].name==="Confraternização mundial") setReveillon(jsonData[i].date);
        if (jsonData[i].name==="Carnaval") setCarnaval(jsonData[i].date);
        if (jsonData[i].name==="Tiradentes") setTiradentes(jsonData[i].date);
        console.log(jsonData[i].name);
      }
    } catch (error) {
      alert('JSON Error');
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
      <Text style={styles.header}>Feriados:</Text>
      <TextInput
        multiline
        onChangeText={setFeriados}
        value={feriados}
        style={styles.input}
      />
      <Button title="Quais são os feriados?" onPress={recuperarFeriados} />
      <View style={styles.resultContainer}>
      <Text>Reveillon {reveillon}</Text>
      <Text>Carnaval {carnaval}</Text>
      <Text>Tiradentes {tiradentes}</Text>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 16,
    padding: 8,
  },
  resultContainer: {
    marginTop: 16,
  },
});