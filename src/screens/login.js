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
                    


    render(){
        return(
            <View style={styles.contenedor}>

                


                <Text style={styles.titulo}>Logueate</Text>
                
                
                <View style={styles.formulario}>
                <Text style={styles.error}>{this.state.errors}</Text>


                    <TextInput 
                        placeholder= 'Email'
                        keyboardType= 'email-address'
                        onChangeText={ 
                            texto => this.setState({
                                email : texto
                            })
                        }
                        value = {this.state.email}
                        style={styles.texto}
                    />
                    <TextInput 
                        placeholder= 'password'
                        keyboardType= 'default'
                        secureTextEntry = {true}
                        onChangeText={ texto => this.setState({password : texto})}
                        value = {this.state.password}
                        style={styles.texto}
                    />

            


            {
                this.state.email =="" || this.state.password =="" ? 
                    <TouchableOpacity>
                        <Text style={styles.botonerror}>Loguearme</Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity onPress={ () => this.loguearUsuario ( this.state.email, this.state.password,)}>
                        <Text style={styles.boton}>Loguearme</Text>
                    </TouchableOpacity>
            }
                    <Text onPress={ () => this.props.navigation.navigate ("Register")} style={styles.link}>¿No tenés una cuenta? Registrate</Text>
                    
                </View>
            </View>
        

        )
    }
}

const styles = StyleSheet.create({

    contenedor:{

    },

    titulo:{

    },

    formulario:{

    },

    error:{

    },

    texto:{

    },

    botonerror:{

    },

    boton:{

    },

    link:{

    }

})

export default Login;