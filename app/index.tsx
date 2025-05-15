import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  Pressable,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  isEditing: boolean;
  editingText: string;
  setEditingText: (text: string) => void;
  onSaveEdit: () => void;
  onStartEdit: (id: string, currentText: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onDelete,
  onEdit,
  isEditing,
  editingText,
  setEditingText,
  onSaveEdit,
  onStartEdit,
}) => {
  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => onToggleComplete(task.id)}>
        <Ionicons
          name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={task.completed ? '#4CAF50' : '#aaa'}
          style={styles.icon}
        />
      </TouchableOpacity>

      {isEditing ? (
        <TextInput
          style={[styles.taskText, styles.editInput]}
          value={editingText}
          onChangeText={setEditingText}
          onBlur={Platform.OS !== 'web' ? onSaveEdit : undefined}
          onSubmitEditing={onSaveEdit}
        />
      ) : (
        Platform.OS !== 'web' ? (
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => onStartEdit(task.id, task.text)}
            activeOpacity={0.7}
          >
            <Text style={[styles.taskText, task.completed && styles.completed]}>
              {task.text}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={[styles.taskText, task.completed && styles.completed]}>
            {task.text}
          </Text>
        )
      )}

      {Platform.OS === 'web' && (
        isEditing ? (
          <TouchableOpacity onPress={onSaveEdit}>
            <Ionicons name="save-outline" size={24} color="#2196F3" style={styles.icon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => onStartEdit(task.id, task.text)}>
            <Ionicons name="pencil" size={24} color="#2196F3" style={styles.icon} />
          </TouchableOpacity>
        )
      )}

      {Platform.OS === 'web' && (
        <TouchableOpacity onPress={() => onDelete(task.id)}>
          <Ionicons name="trash" size={24} color="#f44336" style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleComplete = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const startEditing = (id: string, currentText: string) => {
    setEditingTaskId(id);
    setEditingText(currentText);
  };

  const saveEdit = () => {
    if (editingTaskId !== null) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTaskId ? { ...task, text: editingText } : task
        )
      );
      setEditingTaskId(null);
      setEditingText('');
    }
  };

  const renderRightActions = (id: string) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => deleteTask(id)}
    >
      <Ionicons name="trash" size={32} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task"
          value={newTask}
          onChangeText={setNewTask}
          placeholderTextColor="#666"
          onSubmitEditing={Platform.OS === 'web' ? addTask : undefined}
        />
        <Pressable style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={() => renderRightActions(item.id)}
          >
            <TaskItem
              task={item}
              onToggleComplete={toggleComplete}
              onDelete={deleteTask}
              onEdit={saveEdit}
              isEditing={editingTaskId === item.id}
              editingText={editingText}
              setEditingText={setEditingText}
              onSaveEdit={saveEdit}
              onStartEdit={startEditing}
            />
          </Swipeable>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#f7f7f7' },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
    alignSelf: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    justifyContent: 'space-between',
  },
  taskText: {
    flex: 1,
    fontSize: 18,
    marginHorizontal: 10,
    color: '#333',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  icon: {
    paddingHorizontal: 4,
  },
  editInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 12,
    marginBottom: 12,
    marginLeft: 10,
  },
});

export default App;