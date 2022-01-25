import React, { Component } from 'react';
import {
    View, Text, StyleSheet,
    ImageBackground,
} from 'react-native';


export default class Chat extends React.Component {
    constructor() {
        super();
    };


    render() {

        let name = this.props.route.params.name; // OR ...
        // let { name } = this.props.route.params;
        this.props.navigation.setOptions({ title: name });

        let bgColor = this.props.route.params.bgColor;

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View
                    style={{
                        backgroundColor: bgColor,
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Text style={{ textAlign: 'center', fontSize: 30 }}>Welcome to Chat Room</Text>
                </View>
            </View>
        )
    }
}

