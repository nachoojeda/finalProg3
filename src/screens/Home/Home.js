import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'
import React , {Component} from 'react'
import Posteo from '../../components/Posteo/Posteo'
import {db} from '../../firebase/config'

class Home extends Component {
  constructor(){
    super()
    this.state={
      allPosts:[]

    }
  }

  componentDidMount(){
    db.collection('post')
    .orderBy('createdAt' , 'desc')
    .limit(20) 
    .onSnapshot(docs => {
      let publicaciones = []

      docs.forEach(doc => {
        publicaciones.push({
          id: doc.id,
          data: doc.data()
        })
      })
      this.setState({
      allPosts: publicaciones
      })
    })

  }
  render(){
    return (
      <>
        <View style={styles.container1}>
          
          {/* <ActivityIndicator color='lightblue' size={20} /> */}
        </View>
        <View style={styles.container3}>
          <FlatList
            data={this.state.allPosts}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Posteo navigation={this.props.navigation} id={item.id} data={item.data}/>}
          /> 
       
        </View>
      </>
    )
  }
  
}

const styles = StyleSheet.create({
  container1:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'rgb(128,128,128)'
  },
  container2:{
    flex:3,
    backgroundColor: 'rgb(128,128,128)'
  },
  container3:{
    flex:6,
    backgroundColor: 'rgb(128,128,128)'
  },
  image:{
    height:300
  }
})

export default Home