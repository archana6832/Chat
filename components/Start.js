import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import backgroundImg from '../assets/image/bgimage.png';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Start extends React.Component {
    state = {
        name: '',
        bgColor: '#ffffff',
    };

    /*
   Updates the state with the background color choice of a user
   from the colors list
   */
    changeBgColor = newColor => {
        this.setState({ bgColor: newColor });
    };
    //background color options
    colors = {
        pink: '#f9d5e5',
        purple: '#baa6d0',
        green: '#c4df9b',
        blue: '#7accc8',
    };

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={backgroundImg}
                    resizeMode="cover"
                    style={styles.bgImage}
                >
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Chat App</Text>
                    </View>

                    <View style={styles.box}>
                        <View style={styles.inputField}>
                            <Icon style={styles.icon} name="user" size={30} color="#888" />
                            <TextInput
                                accessible={true}
                                accessibilityLabel="Your Name"
                                accessibilityHint="Type the name you want to use in the chat session"
                                style={styles.inputText}
                                onChangeText={text => this.setState({ name: text })}
                                value={this.state.name}
                                placeholder="Your Name ..."
                            />
                        </View>

                        <View style={styles.colorSelector}>
                            <Text style={styles.colorsTitle}>Choose a Background Color</Text>

                            <View style={styles.colorsList}>
                                {/* pink background */}
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Select pink background"
                                    accessibilityHint="Choose pink background for the chat screen"
                                    accessibilityRole="button"
                                    onPress={() => this.changeBgColor(this.colors.pink)}
                                >
                                    <View style={styles.pink}></View>
                                </TouchableOpacity>

                                {/* Purple background */}
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Select purple background"
                                    accessibilityHint="Choose purple background for the chat screen"
                                    accessibilityRole="button"
                                    onPress={() => this.changeBgColor(this.colors.purple)}
                                >
                                    <View style={styles.purple}></View>
                                </TouchableOpacity>

                                {/* GREEN background */}
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Select green background"
                                    accessibilityHint="Choose green background for the chat screen"
                                    accessibilityRole="button"
                                    onPress={() => this.changeBgColor(this.colors.green)}
                                >
                                    <View style={styles.green}></View>
                                </TouchableOpacity>

                                {/* BLUE background */}
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Select blue background"
                                    accessibilityHint="Choose blue background for the chat screen"
                                    accessibilityRole="button"
                                    onPress={() => this.changeBgColor(this.colors.blue)}
                                >
                                    <View style={styles.blue}></View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Pressable
                            style={styles.button}
                            accessible={true}
                            accessibilityLabel="Tab here to Start chatting"
                            accessibilityHint="Enter the chat screen"
                            accessibilityRole="button"
                            onPress={() =>
                                this.props.navigation.navigate('Chat', {
                                    name: this.state.name,
                                    bgColor: this.state.bgColor,
                                })
                            }
                        >
                            <Text style={styles.buttonText}>Start Chatting</Text>
                        </Pressable>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    bgImage: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    titleContainer: {
        width: '60%',
        height: 'auto',
        alignItems: 'center',
        marginTop: 60,
        resizeMode: 'contain',
        flex: 1,
    },
    titleText: {
        fontSize: 50,
        fontWeight: '600',
        color: '#ffffff',
    },
    box: {
        width: '88%',
        height: '44%',
        marginBottom: 30,
        backgroundColor: '#ffffff',
        flexGrow: 1,
        flexShrink: 0,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 30,
        borderRadius: 10,
        height: 260,
        minHeight: 260,
        maxHeight: 300,
    },
    inputField: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#000',
        height: 50,
        width: '88%',
        borderRadius: 5,
        marginBottom: 25,
        padding: 10,
    },
    icon: {
        marginRight: 15,
        height: 25,
        width: 25,
    },
    inputText: {
        fontSize: 16,
        fontWeight: '300',
        opacity: 0.5,
        color: '#757083',
    },
    colorSelector: {
        flex: 1,
        width: '70%',
    },
    colorsTitle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '300',
        /*color: '#736357',*/
        color: '#757083',
        opacity: 1,
        marginBottom: 10,
    },
    colorsList: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pink: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f9d5e5',

    },
    purple: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#baa6d0',
    },
    green: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#c4df9b',

    },
    blue: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#7accc8',
    },
    button: {
        width: '88%',
        height: 60,
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#1e4158',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: '#ffffff',
    },
});