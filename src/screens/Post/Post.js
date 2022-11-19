import { Text, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import {auth, db} from '../../firebase/config'
import Camara from '../../components/Camara/Camara'


 class Post extends Component {

    constructor(){
        super()
        this.state = {
            description: ''
        }
    }

    enviar(description){
        db.collection('post').add({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            description: description,
            likes: [],
            comments:[]

        })

        .then(resp => console.log('funciono el posteo'))
        .catch(err => console.log(err))
    }
    render() {
        return (
            <View styles = {styles.container}>
                <Camara/>
                <TextInput
                keyboardType='default'
                onChangeText={text => this.setState({description: text})}
                value={this.state.description}
                style={styles.input}
                placeholder='Deja la descripcion'
                />
                <TouchableOpacity onPress={() => this.enviar(this.state.description)}>
                    <Text>
                        Enviar
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
    flex: 1
    }, 
    input:{
        borderWidth:1,
        height:48
    }
})

export default Post