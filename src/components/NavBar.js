import {TouchableHighlight, Text, View, Image, StatusBar, TouchableWithoutFeedback} from 'react-native';
import React, {Component} from 'react';
import Images from '../constants/Images';
import Colors from "../constants/Colors";

class NavBar extends Component {

    render() {
        return (
            <View style={styles.background}>
                <TouchableHighlight style={styles.backarrowTouchable}
                    onPress={() =>this.props.backFunction(this.props.context)}>
                    <Image style={styles.backarrow} source={Images.back}/>
                </TouchableHighlight>
                <Text style={styles.title}>{this.props.title}</Text>
                <TouchableHighlight style={styles.rightTouchable}
                    onPress={() => this.props.imageFunction(this.props.context)}>
                    <Image source={this.props.image} style={styles.right}/>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = {
    background: {
        flexDirection: 'row',
        backgroundColor: Colors.blue,
        justifyContent: 'space-between',
        alignItems:'center',
        height: 50,
    },
    backarrowTouchable: {
        width: 30,
        height: 30,
        margin:10,
    },
    backarrow: {
        width: 30,
        height: 30,
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    rightTouchable: {
        width: 50,
        height: 50,
        margin:10,
    },
    right: {
        width: 50,
        height: 50,
    }
};

export default NavBar;