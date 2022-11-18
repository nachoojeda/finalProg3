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
          <Text>Comments</Text>
          <View>
            <FlatList
            data={this.state.data.comments}
            keyExtractor={item => item.createdAt.toString()}
            renderItem={({item}) => <View>
              <Text>{item.owner} comentó:</Text>
              <Text>{item.comment}</Text>
            </View>
              }
            />
          </View>
          <View>
            <TextInput
              onChangeText={text => this.setState({newComment: text})}
              style = {styles.input}
              keyboardType='default'
              placeholder='Agrega un comentario'
              value={this.state.newComment}
            />
            <TouchableOpacity onPress={()=> this.addComment(this.state.id, this.state.newComment)}>
              <Text>Enviar comentario</Text>
            </TouchableOpacity>
          </View>

          <Text onPress={ () => this.props.navigation.navigate ("TabNavigation")} style={styles.link}>Volver al inicio</Text>
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    input: {
      borderWidth:1,
      height:32
    }
  })
  
  export default Comment