import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
  Image
} from 'react-native';
import { useEffect, useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { useSelector, useDispatch } from 'react-redux';
import { updateTodoList } from '../store/todoListDataSlice';
import type { RootState } from '../store';
import ArrowDown from '../assets/svg/arrow-down.svg';
import ArrowUp from '../assets/svg/arrow-up.svg';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
const { height, width } = Dimensions.get('window');

interface taskData {
  id: number;
  title: string;
  detail: string;
  startDate: string;
  endDate: string;
  status: string;
  isShowDetail: boolean;
  isCheck: boolean;
}

const TodolistScreen = ({navigation}: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch()
  const todolist = useSelector((state: RootState) => state.todolist.data)

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  // const [dataList, setDataList] = useState<taskData[]>([
  //   {
  //     id: 1,
  //     title: "Learning",
  //     date: "04-09-2024 15:20:00",
  //     status: "pending",
  //     isShowDetail: false,
  //     isCheck: false,
  //   },
  //   {
  //     id: 2,
  //     title: "Exercise",
  //     date: "04-09-2024 15:20:00",
  //     status: "done",
  //     isShowDetail: false,
  //     isCheck: false,
  //   }
  // ])
  const [isVisibleAddTaskModal, setIsVisibleAddTaskModal] = useState<boolean>(false)
  const [textNewTask, setTextNewTask] = useState<string>('')
  const [dateNewTask, setDateNewTask] = useState<string>('')
  const [statusNewTask, setStatusNewTask] = useState<string>('')
  const [selectedTask, setSelectedTask] = useState<number[]>([])

  useEffect(() => {
    const sortList = [...todolist]
    sortList.sort((a, b) => b.id - a.id)
    dispatch(updateTodoList(sortList))
  }, [])

  const addNewTask = () => {
    // setDataList([
    //   ...dataList,
    //   {
    //     id: dataList.length,
    //     title: textNewTask,
    //     date: dateNewTask,
    //     status: statusNewTask,
    //     isCheck: false,
    //   }
    // ])
    dispatch(updateTodoList([
      {
        id: todolist[0].id + 1,
        title: textNewTask,
        detail: "",
        startDate: dateNewTask,
        endDate: dateNewTask,
        status: statusNewTask,
        isShowDetail: false,
        isCheck: false,
      },
      ...todolist,
    ]))
    setTextNewTask('')
    setDateNewTask('')
    setStatusNewTask('')
    setIsVisibleAddTaskModal(false)
  }

  const onToggleIsCheckTask = (id: number, value: boolean) => {
    if (value === true) {
      setSelectedTask([...selectedTask, id])
    } else {
      let newSelectedList = selectedTask.filter((item) => {
        return item !== id
      })
      setSelectedTask(newSelectedList)
    }
    const newlist = todolist.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isCheck: value
        }
      }
      return item
    })
    // setDataList(newlist)
    dispatch(updateTodoList(newlist))
  }

  const onDeleteTask = () => {
    const newlist = todolist.filter((item) => {
      return !selectedTask.includes(item.id) 
    })
    setSelectedTask([])
    // setDataList(newlist)
    dispatch(updateTodoList(newlist))
  }

  const statueText = (status: string) => {
    switch (status) {
      case "todo": 
        return "To Do"
        break;
      case "inProgress": 
        return "Doing"
        break;
      case "pending": 
        return "Pending"
        break;
      case "done": 
        return "Done"
        break;
    }
  }

  const toggleShowDetail = (id: number) => {
    const newlist = todolist.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isShowDetail: !item.isShowDetail
        }
      }
      return item
    })
    dispatch(updateTodoList(newlist))
  }

  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
          padding: width * 0.04267,
          height: height
        }}>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: height * 0.01970}}>
              <Text style={{ fontSize: width * 0.07467, color: "black", fontWeight: 700}}>Todo List</Text>
              <TouchableOpacity 
                style={{ borderWidth: 1, borderRadius: 10, borderColor: "#828282", padding: width * 0.01600}}
                onPress={() => setIsVisibleAddTaskModal(true)}
              >
                <View>
                  <Text style={{color: "black"}}>
                    + New Task
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{marginVertical: height * 0.01478}}>
              <Text>Search</Text>
            </View>
            {
              todolist.map((item) => {
                return (
                  <View 
                    style={{
                      paddingVertical: height * 0.01478,
                      borderTopWidth: 1,
                      borderColor: "#d6d6d6",
                      marginBottom: height * 0.01970,
                      flexDirection: "column",
                    }}
                    key={item.id}
                  >
                    <View style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      <View style={{flexDirection: "row", alignItems: "center"}}>
                        <CheckBox
                          disabled={false}
                          value={item.isCheck}
                          onValueChange={(newValue) => onToggleIsCheckTask(item.id, newValue)}
                        />
                        <View>
                          <Text 
                            style={{ 
                              textDecorationLine: item.status == "done" ? 'line-through': 'none',
                              fontWeight: 600,
                              color: "black",
                              fontSize: width * 0.04800 
                            }}
                          >{item.title}</Text>
                          <Text>Create date: {item.startDate}</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection:"row", alignItems: "center"}}>
                        <View style={{
                          borderWidth: 1,
                          borderRadius: 16,
                          paddingHorizontal: 12,
                          paddingVertical: 6,
                          borderColor: item.status == "todo" ? '#29c7e3' :  
                            item.status == "inProgress" ? '#e8e192' : 
                            item.status == "pending" ? '#cc8c1f' : 
                            item.status == "done" ? '#9ae64e' : '',
                          backgroundColor: item.status == "todo" ? '#34ebe5' :  
                          item.status == "inProgress" ? '#e8e192' : 
                          item.status == "pending" ? '#e3a829' : 
                          item.status == "done" ? '#a8eb34' : '',
                        }}>
                          <Text style={{ color: "black" }}>{statueText(item.status)}</Text>
                        </View>
                        <TouchableOpacity onPress={() => toggleShowDetail(item.id)} style={{ marginLeft: 6, width: 20 }}>
                            {
                              item.isShowDetail ? 
                              <ArrowUp width={20} height={20} />
                              :
                              <ArrowDown width={15} height={15} />
                            }
                        </TouchableOpacity>
                      </View>

                    </View>
                    <View>
                      {
                        item.isShowDetail && 
                        <View style={{ paddingHorizontal: width * 0.08533 }}>
                          <Text>Detail: {item.detail}</Text>
                          <Text>Deadline: {item.endDate}</Text>
                        </View>
                      }
                    </View>
                  </View>
                )
            })}
          </View>
          <TouchableOpacity 
            style={{
              padding: width * 0.02133, 
              borderWidth: 1, 
              borderRadius: 10, 
              marginVertical: width * 0.03200, 
              alignSelf: 'center'
            }}
            onPress={onDeleteTask}
            disabled={selectedTask.length == 0}
          >
            <Text>Delete Task</Text>
          </TouchableOpacity>
          <Button
            title="Back to Home page"
            onPress={() => navigation.navigate('Home')}
          ></Button>

          <Modal 
            visible={isVisibleAddTaskModal}
            animationType="slide"
            transparent
          >
            <View 
              style={{
                backgroundColor: "white", 
                borderRadius: width * 0.04267, 
                width: width * 0.9, 
                // height: height * 0.28448, 
                margin: "auto",
                padding: width * 0.03200,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5
              }}
            >
              <View  style={{ marginBottom: width * 0.04800}}>
                <Text style={{ fontSize: width * 0.04800, fontWeight: 600, color: "black"}}>Add New Task</Text>
              </View>
              <View style={{ flexDirection: "row", width: "100%"}}>
                <Text style={{ textAlignVertical: "center", marginRight: width * 0.01067, width: width * 0.13333}}>Title: </Text>
                <TextInput
                  style={{ borderBottomWidth: 1, padding: 0, width: "80%"}}
                  onChangeText={setTextNewTask}
                  value={textNewTask}
                  placeholder="input your task title"
                ></TextInput>
              </View>
              <View style={{ flexDirection: "row", width: "100%"}}>
                <Text style={{ textAlignVertical: "center", marginRight: width * 0.01067, width: width * 0.13333}}>Date: </Text>
                <TextInput
                  style={{ borderBottomWidth: 1, padding: 0, width: "80%"}}
                  onChangeText={setDateNewTask}
                  value={dateNewTask}
                  placeholder="input your task date"
                ></TextInput>
              </View>
              <View style={{ flexDirection: "row", width: "100%"}}>
                <Text style={{ textAlignVertical: "center", marginRight: width * 0.01067, width: width * 0.13333}}>Status: </Text>
                <TextInput
                  style={{ borderBottomWidth: 1, padding: 0, width: "80%"}}
                  onChangeText={setStatusNewTask}
                  value={statusNewTask}
                  placeholder="input your task status"
                ></TextInput>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: width * 0.04267, paddingHorizontal: width * 0.06400}}>
                <TouchableOpacity onPress={addNewTask}>
                  <Icon name="rocket" size={30} color="#900" />
                  <Text>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsVisibleAddTaskModal(false)}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default TodolistScreen;