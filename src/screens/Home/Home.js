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
    db.collection('post').onSnapshot(docs => {
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
          <Text>Home</Text>
          {/* <ActivityIndicator color='lightblue' size={20} /> */}
        </View>
        <View style={styles.container3}>
          <FlatList
            data={this.state.allPosts}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Posteo data={item.data}/>}
          /> 
        {/* <Posteo data={item.data}/> */}
        {/* <Text>{item.data.description}</Text> */}
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text>Ir a login</Text>
          </TouchableOpacity>
          
        </View>
      </>
    )
  }
  
}

const styles = StyleSheet.create({
  container1:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  container2:{
    flex:3
  },
  container3:{
    flex:5
  },
  image:{
    height:300
  }
})

export default Home