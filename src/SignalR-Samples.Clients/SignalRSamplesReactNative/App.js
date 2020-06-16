/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
import {HubConnectionBuilder, LogLevel, HttpTransportType} from '@microsoft/signalr'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      notifications: []
    };
  }
  
  _hubConnection = new HubConnectionBuilder()
  .withUrl("BACKEND_AZURE_URL/notificationhub")
  .configureLogging(LogLevel.Debug)
  .build();
  async componentDidMount() {
    //let 
    console.log(this._hubConnection)
    

    this._hubConnection.on('notification', notification => {
      console.log(notification);
      let notificationsState = this.state.notifications;
      notificationsState.push(notification);
      this.setState({notifications: notificationsState});
    });

    this._hubConnection.start()
        .then(() => { console.log("Connection Started"); })
        .catch(err => console.log("Unable to start Connection: " + err));
    console.log(this._hubConnection)
    
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to SignalR Demo with React Native</Text>
        <FlatList
          data={this.state.notifications}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

export default App