import { Text, View , TouchableOpacity, Image, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import {FontAwesome} from '@expo/vector-icons'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'

class Posteo extends Component {

  constructor(props){
    super(props)
    this.state = {
      likeCount: props.data.likes.lenght,
      commentCount: props.data.comments.lenght,
      isMyLike: false
    }
  }

  // componentDidMount(){
  //   let myLike = this.props.data.likes.includes(auth.currentUser.email)
  //   if(myLike){
  //     this.setState({
  //       isMyLike:true
  //     })
  //   }
  // }

  like(){
    db
    .collection('post')
    .doc(this.props.id)
    .update({
      likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then(()=> {
      this.setState({
        isMyLike:true,
        likeCount: this.state.likeCount + 1
      })
    })
    .catch(err => console.log(err))

  }


  unlike(){
    db
    .collection('post')
    .doc(this.props.id)
    .update({
      likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then(()=> {
      this.setState({
        isMyLike:false,
        likeCount: this.state.likeCount - 1
      })
    })
    .catch(e => console.log(e))
  }


  render() {
    return (
      <View>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate(
        'HomeNavigation',
        {
          screen: 'FriendProfile',
          params:{
            email:this.props.data.owner
          }
        }
      )}>
        <Text> Posteo de : {this.props.data.owner}</Text>
      </TouchableOpacity>
        <Image style={styles.image} 
                         source={{uri:this.props.data.foto}}
                         resizeMode='contain'/>

        <Text>{this.props.data.description}</Text>
      
       <View>
       {/* <Text>{this.state.likeCount}</Text>  */}
      {
          this.state.isMyLike ? 
          <TouchableOpacity onPress={()=> this.unlike()}>
          <FontAwesome name='heart' color='black' size={14} />
        </TouchableOpacity> 
        :
        <TouchableOpacity onPress={()=> this.like()}>
          <FontAwesome name='heart-o' color='red' size={14} />
        </TouchableOpacity>
        }
       </View>

       <View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate(
            'Comment',
            {id:this.props.id}
            )}>
            <Text>Agregar comentario</Text>
          </TouchableOpacity>
        </View>
        
      </View>

    )
  }
}

const styles = StyleSheet.create({
  image: {
   height: 400,
   width: 400, 
   alignItems: 'center',

 }

})

export default Posteo



















