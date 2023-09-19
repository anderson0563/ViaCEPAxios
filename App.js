import React, { useState } from "react";
import { Alert, FlatList, StyleSheet, View, Text, Button, SafeAreaView, ActivityIndicator, TextInput, ScrollView } from "react-native";
import { Keyboard } from 'react-native';
import axios from "axios";

export default ApiContainer = () => {
  const [loading, setLoading] = useState(false)
  const [cepUsuario, setCEPUsuario] = useState(null)
  const [fromAxios, setFromAxios] = useState(false)
  const [bairro, setBairro] = useState(null);
  const [cep, setCEP] = useState(null);
  const [complemento, setComplemento] = useState(null);
  const [ddd, setDdd] = useState(null);
  const [gia, setGia] = useState(null);
  const [ibge, setIbge] = useState(null);
  const [localidade, setLocalidade] = useState(null);
  const [logradouro, setLogradouro] = useState(null);
  const [siafi, setSiafi] = useState(null);
  const [uf, setUf] = useState(null);
  const [operacao, setOperacao] = useState(false);

  const setEndereco = (json) => {
    setCEP(json.cep);
    setBairro(json.bairro);
    setComplemento(json.complemento);
    setDdd(json.ddd);
    setGia(json.gia);
    setIbge(json.ibge);
    setLocalidade(json.localidade);
    setLogradouro(json.logradouro);
    setSiafi(json.siafi);
    setUf(json.uf);
    setIbge(json.ibge);
    setFromAxios(true);
  }

  const goAPICEP = () => {
    setFromAxios(false);
    setLoading(true);

    axios.get(`https://viacep.com.br/ws/${cepUsuario}/json`)
      .then(response => {
        console.log(response.data);
        setTimeout(() => {
          setLoading(false);
          setEndereco(response.data);
          setFromAxios(true);
          Keyboard.dismiss();
          setOperacao(false);
        }, 2000)
      })
      .catch(error => {
        console.log(error);
      });
  }



  const separadorItem = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#000'
        }}
      />
    );
  };

  const mensagemVazia = (status) => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text style={{ fontSize: 25, textAlign: 'center' }}>Nenhum registro
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ top: 30 }}>
      <View style={{ margin: 18 }}>
        <TextInput
          style={{ margin: 18 }}
          onChangeText={(value) => setCEPUsuario(value)}
          placeholder="Entre com o CEP"
        />
        <Button
          title={'Buscar o endereço'}
          onPress={() => { goAPICEP() }}
          color='green'
        />
      </View>

      {
        operacao?
        <View style={{ margin: 18 }}>
          {empty ? mensagemVazia(empty) :
            <FlatList
              data={items}
              ItemSeparatorComponent={separadorItem}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                <View key={item.indice} style={styles.container}>
                  <Text style={styles.itemsStyle}> {item.indice}) {item.cep}</Text>
                </View>
              }
            />
          }
        </View>
      : ""
        }

      {fromAxios ?
        <View>
          <Text style={{ margin: 18 }}>CEP:{cep}</Text>
          <Text style={{ margin: 18 }}>Bairro:{bairro}</Text>
          <Text style={{ margin: 18 }}>Logradouro:{logradouro}</Text>
          <Text style={{ margin: 18 }}>Complemento:{complemento}</Text>
          <Text style={{ margin: 18 }}>Localidade:{localidade}</Text>
          <Text style={{ margin: 18 }}>GIA:{gia}</Text>
          <Text style={{ margin: 18 }}>IBGE:{ibge}</Text>
          <Text style={{ margin: 18 }}>Siafi:{siafi}</Text>
          <Text style={{ margin: 18 }}>DDD:{ddd}</Text>
          <Text style={{ margin: 18 }}>UF:{uf}</Text>
        </View>
        :
        <Text style={{ margin: 18 }}></Text>
      }
      {loading &&
        <View>
          <Text style={{ fontSize: 16, color: 'red', margin: 18 }}>Carregando...</Text>
          <ActivityIndicator size="large" color="red" />
        </View>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 5,
    padding: 5,
  },
});