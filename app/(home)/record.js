import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Text, View, TouchableOpacity } from "react-native";
import axios from "axios";
import EmployeeItem from "../../components/employeeItem";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://192.168.29.173:8000/employees"
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDeleteEmployee = (deletedEmployeeId) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee._id !== deletedEmployeeId)
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Employees</Text>
      <View style={styles.employeeListContainer}>
        <FlatList
          data={employees}
          renderItem={({ item }) => (
            <EmployeeItem employee={item} onDelete={handleDeleteEmployee} />
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a2a2d0",
    paddingHorizontal: 12,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#e6e6fa",
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  employeeListContainer: {
    flex: 1,
    backgroundColor: "#e6e6fa",
    borderRadius: 12,
    paddingVertical: 10,
  },
  flatListContent: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
});

export default EmployeesList;
