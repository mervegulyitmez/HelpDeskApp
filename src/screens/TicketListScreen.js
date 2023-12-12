import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTicketContext } from '../components/TicketContext';
import { myTheme } from './../../eva.theme';
import { Text } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableWithoutFeedback } from 'react-native';

const TicketListScreen = () => {
  const { tickets } = useTicketContext();
  const navigation = useNavigation();
  const [filterStatus, setFilterStatus] = useState('All');
  const statusOptions = ['All', 'New', 'In Progress', 'Resolved'];

  // Function to navigate to TicketDetailsScreen on ticket press
  const handleTicketPress = (ticketId) => {
    navigation.navigate('TicketDetailsScreen', { ticketId });
  };

  // Function to determine the style based on the ticket status
  const getStatusStyle = (status) => {
    const lowercaseStatus = status.toLowerCase();

    switch (lowercaseStatus) {
      case 'new':
        return styles.newStatus;
      case 'in progress':
        return styles.inProgressStatus;
      case 'resolved':
        return styles.resolvedStatus;
      default:
        return styles.defaultStatus;
    }
  };

  const [isModalVisible, setModalVisible] = useState(false);

  // Function to toggle the filter modal visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Function to handle the status change in the filter modal
  const handleStatusChange = (selectedItem) => {
    setFilterStatus(selectedItem);
    toggleModal(); // Close the modal after selection
  };

  // Filter tickets based on the selected status
  const filteredTickets =
    filterStatus === 'All'
      ? tickets
      : tickets.filter(
          (ticket) =>
            ticket.status.toLowerCase() === filterStatus.toLowerCase()
        );

  return (
    <View style={styles.container}>
      {/* Filter by Status Section */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Status:</Text>
        <TouchableOpacity onPress={toggleModal}>
          <Icon name="filter" size={30} color={myTheme.colors.primary} />
        </TouchableOpacity>

        {/* Modal for Status Filter */}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={toggleModal}>
          <TouchableWithoutFeedback onPress={toggleModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {statusOptions.map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={styles.statusItem}
                    onPress={() => handleStatusChange(status)}>
                    <Text>{status}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>

      {/* List of Tickets */}
      <FlatList
        data={filteredTickets}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTicketPress(item.id)}>
            <View style={styles.ticket}>
              <Text>Name: {item.name}</Text>
              <Text>Email: {item.email}</Text>
              <Text style={[styles.status, getStatusStyle(item.status)]}>
                Status: {item.status}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: myTheme.colors.background,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'flex-end',
  },
  filterLabel: {
    marginRight: 8,
    fontSize: 16,
    color: myTheme.colors.text,
  },
  ticket: {
    borderColor: myTheme.colors.primary,
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
    backgroundColor: myTheme.colors.inputBackground,
  },
  status: {
    color: '#333',
    fontWeight: 'bold',
  },
  newStatus: {
    color: myTheme.statusColors.new,
  },
  inProgressStatus: {
    color: myTheme.statusColors.inProgress,
  },
  resolvedStatus: {
    color: myTheme.statusColors.resolved,
  },
  defaultStatus: {
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  statusItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default TicketListScreen;
