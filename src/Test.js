import React from 'react';
//import DOMParser from 'react-native-html-parser';
import {FlatList, ActivityIndicator, Text, View} from 'react-native';

export default class Test extends React.Component {

    static navigationOptions = {title: 'Test',};

    constructor(props) {
        super(props);
        this.state = {isLoading: true}
    }
    componentDidMount() {
        return fetch('https://app.sigeco.fr', {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body:
            "forms[id_client_identification]=testmobile&" +
            "forms[pass_identification]=tbrtdEUSQ!37&" +
            "robot=1972&" +
            "tab_mobile=1",
        })
            .then((response) => response.text())
            .then((responseText) => {
                json = JSON.parse(responseText.substring(1));
                this.setState({
                    isLoading: false,
                    dataSource: json.tests,
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }




    render() {

        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return (
            <View>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => <Text>{item.id}, {item.token}</Text>}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}
