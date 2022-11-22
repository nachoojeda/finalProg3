import { Text, View, TextInput, TouchableOpacity, StyleSheet,FlatList} from 'react-native'
  import React, { Component } from 'react'
  import {db, auth} from '../../firebase/config'
  import firebase from 'firebase'
  
  
  class Comment extends Component {
    constructor(props){
      super(props)
      this.state = {
        newComment:'',
        id:'',
        data:{}
      }
    }
  
    componentDidMount(){
      db
      .collection('post')
      .doc(this.props.route.params.id)
      .onSnapshot(doc => {
        this.setState({
          id: doc.id,
          data: doc.data(),
        })
      })
    }
  
    addComment(idDoc, text){
      db
      .collection('post')
      .doc(idDoc)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          owner:auth.currentUser.email,
          createdAt: Date.now(),
          comment: text
        })
      })
    }
  
    render() {
      return (
        <View>
        
          <View style={styles.texto}>
            <FlatList
            data={this.state.data.comments}
            keyExtractor={item => item.createdAt.toString()}
            renderItem={({item}) => <View>
              <Text style={styles.textox}>{item.owner} comentó:</Text>
              <Text style={styles.textox}>{item.comment}</Text>
            </View>
              }
            />
          </View>
          <View style={styles.boton}>
            <TextInput
              onChangeText={text => this.setState({newComment: text})}
              style = {styles.input}
              keyboardType='default'
              placeholder='Agrega un comentario'
              value={this.state.newComment}
            />
            <TouchableOpacity onPress={()=> this.addComment(this.state.id, this.state.newComment)}>
              <Text style={styles.boton}>Enviar comentario</Text>
            </TouchableOpacity>
          </View>

          <Text onPress={ () => this.props.navigation.navigate ("TabNavigation")} style={styles.botonx}>Volver al inicio</Text>
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    input: {
      justifyContent: 'center',
      textAlign: 'center' ,
      fontFamily: 'monospace',
    } ,

    texto:{
      backgroundColor: 'rgb(255,255,242)',
      fontFamily: 'monospace',
      fontSize: 13,
      margin: 14,
      borderRadius: 12,
      textAlign: 'center',
      color: 'rgb(128, 128, 128)',
      padding: 8

  }, 

  textox:{
    backgroundColor: 'rgb(255,255,242)',
    fontFamily: 'monospace',
    fontSize: 13,
    margin: 1,
    borderRadius: 12,
    textAlign: 'center',
    color: 'rgb(128, 128, 128)',
    padding: 8

}, 

  boton:{
    fontFamily: 'monospace',
    fontSize: 16,
    margin: 10,
    backgroundColor: 'rgb(173, 216, 230)',
    borderRadius: 20,
    textAlign: 'center',
    padding: 5
  
  },

  botonx:{
    fontFamily: 'monospace',
    fontSize: 16,
    margin: 10,
    backgroundColor: 'rgb(173, 216, 230)',
    borderRadius: 20,
    textAlign: 'center',
    justifyContent: 'flex-end' ,
    padding: 5
  
  },
  })
  
  export default Comment