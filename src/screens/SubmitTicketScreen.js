import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useTicketContext } from '../components/TicketContext';
import { myTheme } from './../../eva.theme';
import { Input, Button, Text } from '@ui-kitten/components';
import * as ImagePicker from 'react-native-image-picker';

const SubmitTicketScreen = ({ navigation }) => {
  const { updateTicket } = useTicketContext();

  const [newTicket, setNewTicket] = useState({
    name: '',
    email: '',
    photo: '',
    description: '',
    status: 'new',
  });

  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [selectPhotoButtonText, setSelectPhotoButtonText] = useState('Select Photo');
  const [photoInputPlaceholder, setPhotoInputPlaceholder] = useState('Photo / Attachment');

  // Function to pick an image from the device's library
  const pickImage = async () => {
    try {
      const options = {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 400,
        quality: 1,
      };

      ImagePicker.launchImageLibrary(options, (response) => {
        if (!response.didCancel) {
          setSelectedImage(response.uri);
          setNewTicket({ ...newTicket, photo: response.uri });
          setSelectPhotoButtonText('Change Photo');
          setPhotoInputPlaceholder('Selected');
        }
      });
    } catch (error) {
      console.error('ImagePicker Error: ', error);
    }
  };

  // Function to create a new ticket
  const createTicket = async () => {
    try {
      setError(null);

      // Validate form fields
      if (!newTicket.name || !newTicket.email || !newTicket.description) {
        Alert.alert('Validation Error', 'Name, Email, and Description are required fields.');
        return;
      }

      // Call the updateTicket function to create a new ticket
      await updateTicket(newTicket);

      // Provide feedback to the user
      Alert.alert('Success', 'Ticket submitted successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('TicketListScreen') },
      ]);

      // Reset the form fields after successful submission
      setNewTicket({
        name: '',
        email: '',
        photo: '',
        description: '',
        status: 'new',
      });
    } catch (error) {
      console.error('Error creating ticket:', error);
      setError('Failed to create ticket. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Input field for Name */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Name:</Text>
        <Input
          style={styles.input}
          placeholder="Name"
          value={newTicket.name}
          onChangeText={(text) => setNewTicket({ ...newTicket, name: text })}
        />
      </View>

      {/* Input field for Email */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Email:</Text>
        <Input
          style={styles.input}
          placeholder="Email"
          value={newTicket.email}
          onChangeText={(text) => setNewTicket({ ...newTicket, email: text })}
        />
      </View>

      {/* Input field for Description */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Description:</Text>
        <Input
          style={[styles.input, styles.multilineInput]}
          placeholder="Description"
          value={newTicket.description}
          onChangeText={(text) => setNewTicket({ ...newTicket, description: text })}
          multiline
        />
      </View>

      {/* Input field for Photo / Attachment */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Photo / Attachment:</Text>
        <Input
          style={styles.input}
          placeholder={photoInputPlaceholder}
          value={newTicket.photo}
          disabled
          accessoryRight={() => (
            <Button onPress={pickImage} appearance="ghost">
              {selectPhotoButtonText}
            </Button>
          )}
        />
      </View>

      {/* Submit Button */}
      <Button onPress={createTicket} style={styles.button}>
        Submit Ticket
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: myTheme.colors.background,
  },
  inputRow: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: myTheme.colors.text,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: myTheme.colors.primary,
    borderWidth: 1,
    backgroundColor: myTheme.colors.background,
  },
  multilineInput: {
    height: 80,
  },
  button: {
    backgroundColor: myTheme.colors.primary,
    alignSelf: 'center', 
    width: '50%',
    borderColor: myTheme.colors.primary,
    marginTop: 20, 
    marginBottom: 20, 
  }
});

export default SubmitTicketScreen;
