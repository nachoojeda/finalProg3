import React, {Component} from 'react';
import {auth, db} from '../firebase/config';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            email: "",
            password: "",
            errors: "",
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user){
                this.props.navigation.navigate('Home')
            } 
           
        })
    }

loguearUsuario(email,pass){
    auth.signInWithEmailAndPassword(email, pass)
    .then( res => {
        this.props.navigation.navigate("Home")
    })
    .catch(error => 
        this.setState({
        errors: `El error es: ${error.message}`
    })
    )}
                    


}
export default Login;