import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 20
  },
  infoBox: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12
  },
  studentsBox: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    padding: 12
  },
  titleBox: {
    backgroundColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    margin: 5
  },
  studentsDesription: {
    marginLeft: 15,
    fontSize: 16
  },
  studentsLine: {
    flexDirection: 'row'
  }
});

export default styles;