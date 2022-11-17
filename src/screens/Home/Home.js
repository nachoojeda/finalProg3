// import { 
//     View, 
//     Text, 
//     StyleSheet, 
//     Image, 
//     FlatList,
//     ActivityIndicator,
//     TouchableOpacity
//   } from 'react-native'
//   import React, {Component} from 'react'
// //   import Contador from '../../components/Contador/Contador'
//   import {info} from '../../api/data'
//   import Post from '../../components/Post/Post'
//   import {db} from '../../firebase/config'
  
//   class Home extends Component {
//     constructor(){
//       super()
//       this.state={
//         allPosts:[]
//       }
//     }
  
//     componentDidMount(){
//       db.collection('posts')
//       .orderBy('createdAt', 'desc')
//       .limit(3)
//       .onSnapshot(docs => {
//         let publicaciones = []
//         docs.forEach(doc => {
//           publicaciones.push({
//             id:doc.id,
//             data:doc.data()
//           })
//         })
  
//       this.setState({
//         allPosts: publicaciones
//       })
  
//       })
//     }
    
//     render(){
//       return (
//         <>
//           <View style={styles.container1}>
//             <Text>Home</Text>
//           </View>
//           <View style={styles.container3}>
//             <FlatList
//               data={this.state.allPosts}
//               keyExtractor={item => item.id.toString()}
//               renderItem={({item}) => <Post navigation={this.props.navigation} id={item.id} data={item.data} />}
//             />
//           </View>
//         </>
//       )
//     }
//   }
  
//   const styles = StyleSheet.create({
//     container1:{
//       flex:1,
//       justifyContent:'center',
//       alignItems:'center'
//     },
//     container2:{
//       flex:3
//     },
//     container3:{
//       flex:5
//     },
//     image:{
//       height:300
//     }
//   })
  
//   export default Home

import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'
import React from 'react'
// import Contador from '../../components/Contador/Contador'
import {info} from '../../api/data'

function Home(props) {
  return (
    <>
      <View style={styles.container1}>
        <Text>Home</Text>
        <ActivityIndicator color='lightblue' size={20} />
      </View>
      {/* <View style={styles.container2}>
        <Image
          style={styles.image}
          source={require('../../../assets/beder.jpg')}
          resizeMode='contain'
        />
        <Image
          style={styles.image}
          source={{uri:'https://www.purina-latam.com/sites/g/files/auxxlc391/files/styles/kraken_generic_max_width_960/public/01_%C2%BFQu%C3%A9-puedo-hacer-si-mi-gato-est%C3%A1-triste-.png?itok=cOA5aYW-'}}
          resizeMode='contain'
        />
      </View> */}
      <View style={styles.container3}>
        <FlatList
          data={info}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <Text>{item.title}</Text>}
        />
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Text>Ir a login</Text>
        </TouchableOpacity>
        
      </View>
    </>
  )
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