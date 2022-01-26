import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import backgroundImg from '../assets/image/bgimage.png';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            bgColor: '#ffffff',
        };
    }

    /*
   Updates the state with the background color choice of a user 
   from the colors list
   */
    changeBgColor = newColor => {
        this.setState({ bgColor: newColor });
    };

    //background color choices
    colors = {
        black: "#090C08",
        independence: "#474056",
        duskGray: "#8A95A5",
        composedGreen: "#B9C6AE",
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
                                {/* Black background */}
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Select black background"
                                    accessibilityHint="Choose black background for the chat screen"
                                    accessibilityRole="button"
                                    onPress={() => this.changeBgColor(this.colors.black)}
                                >
                                    <View style={styles.black}></View>
                                </TouchableOpacity>

                                {/* Independence background */}
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Select independence background"
                                    accessibilityHint="Choose independence background for the chat screen"
                                    accessibilityRole="button"
                                    onPress={() => this.changeBgColor(this.colors.independence)}
                                >
                                    <View style={styles.independence}></View>
                                </TouchableOpacity>

                                {/* DuskGray background */}
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Select duskGray background"
                                    accessibilityHint="Choose duskGray background for the chat screen"
                                    accessibilityRole="button"
                                    onPress={() => this.changeBgColor(this.colors.duskGray)}
                                >
                                    <View style={styles.duskGray}></View>
                                </TouchableOpacity>

                                {/* ComposedGreen background */}
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Select composedGreen background"
                                    accessibilityHint="Choose composedGreen background for the chat screen"
                                    accessibilityRole="button"
                                    onPress={() => this.changeBgColor(this.colors.composedGreen)}
                                >
                                    <View style={styles.composedGreen}></View>
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
        //marginLeft: 15,
        //marginRight: 15,
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
        color: '#736357',
        opacity: 1,
        marginBottom: 10,
    },
    colorsList: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    black: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#090C08',
    },
    independence: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#474056',
    },
    duskGray: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#8A95A5',
    },
    composedGreen: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#B9C6AE',
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