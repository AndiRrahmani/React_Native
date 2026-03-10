import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Avatar } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigation.navigate('Home');
  };

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.profileHeader}>
          <Avatar.Image size={80} source={{ uri: user.avatar }} />
          <View style={styles.userInfo}>
            <Title>{user.name}</Title>
            <Paragraph>{user.email}</Paragraph>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Account Settings</Title>
          <Button mode="outlined" onPress={() => {}} style={styles.button}>
            Edit Profile
          </Button>
          <Button mode="outlined" onPress={() => navigation.navigate('Favorites')} style={styles.button}>
            My Favorites
          </Button>
          <Button mode="outlined" onPress={() => {}} style={styles.button}>
            Purchase History
          </Button>
          <Button mode="outlined" onPress={() => {}} style={styles.button}>
            Settings
          </Button>
        </Card.Content>
      </Card>

      <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  card: {
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 20,
    flex: 1,
  },
  button: {
    marginBottom: 10,
  },
  logoutButton: {
    margin: 20,
    backgroundColor: '#e74c3c',
  },
});

export default ProfileScreen;