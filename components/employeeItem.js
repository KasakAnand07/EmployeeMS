import React from "react";
import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import axios from "axios";

const EmployeeItem = ({ employee, onDelete }) => {
  const handleDelete = async () => {
    try {
      // Make a DELETE request to the backend API to delete the employee
      await axios.delete(`http://192.168.29.173:8000/employees/${employee._id}`);
      // Call the onDelete callback to update the employee list after deletion
      onDelete(employee._id);
      Alert.alert("Success", "Employee deleted successfully");
    } catch (error) {
      console.error("Error deleting employee:", error);
      Alert.alert("Error", "Failed to delete employee");
    }
  };

  return (
    <View style={styles.employeeItem}>
      <Text>{employee.employeeName}</Text>
      <Pressable onPress={handleDelete}>
        <Text style={styles.deleteButton}>Delete</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  employeeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  deleteButton: {
    color: "red",
  },
});

export default EmployeeItem;
