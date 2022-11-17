import { Text, View , TouchableOpacity} from 'react-native'
import React, { Component } from 'react'

class Posteo extends Component {

  constructor(props){
    super(props)
    this.state = {
      likeCount: props.data.likes.lenght,
      commentCount: props.data.comments.lenght,
      myLike: false
    }
  }
  render() {
    return (
      <View>

        <Text>{this.props.data.description}</Text>

        {
          this.state.myLike ? 
          <TouchableOpacity>
          <Text>
            No me gusta
          </Text>
        </TouchableOpacity> 
        :
        <TouchableOpacity>
          <Text>
            Me gusta
          </Text>
        </TouchableOpacity>
        }
        
        
      </View>
    )
  }
}

export default Posteo



















