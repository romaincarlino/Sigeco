import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Colors from '../constants/Colors';

class ListItem_TestsList extends Component {

    render() {

        contexte = this.props.contenu_test.contexte.replace(/<br>/g, "\n");
        fourniture = this.props.contenu_test.fourniture.replace(/<br>/g, "\n");
        demande = this.props.contenu_test.demande.replace(/<br>/g, "\n");

        return (
            <View style={this.props.item.fait == '1' ? styles.itemGreen : styles.itemNormal}>
                <View style={styles.titleView}>
                    <Text style={styles.userName}>{this.props.item.Nom_prenom}</Text>
                    <Text style={styles.name}>{this.props.item.Titre_du_test}</Text>
                </View>
                <View style={styles.contentView}>
                    <View style={styles.column}>
                        <Text style={styles.title}>Contexte</Text>
                        <Text style={styles.content}>{contexte}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.title}>Fournitures</Text>
                        <Text style={styles.content}>{fourniture}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.title}>Demande</Text>
                        <Text style={styles.content}>{demande}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    itemGreen: {
        marginBottom: 10,
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1,
        backgroundColor: Colors.green,
    },
    itemNormal: {
        marginBottom: 10,
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1,
    },
    titleView: {
        borderBottomColor: Colors.black,
        borderBottomWidth: 1,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.black,
    },
    name: {
        marginLeft: 10,
        fontSize: 18,
        color: Colors.black,
    },
    done:{
      height:25,
      width:25,
    },
    contentView: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
    },
    column: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        color: Colors.black,
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1,
        padding: 5,
        margin: 3,
    },
    content: {
        color: Colors.black,
        padding: 5,
        paddingBottom: 20,
    },
};

export default ListItem_TestsList;

