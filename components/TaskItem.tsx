import React, { useState } from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity, // Add import
} from "react-native";
import { taskItemStyles as styles } from "./ui/styles";
import StyledInput from "./ui/StyledInput";
import IconButton from "./ui/IconButton";

interface Task {
  id: number;
  text: string;
}

interface TaskItemProps {
  task: Task;
  isEditing: boolean;
  onStartEdit: (id: number, text: string) => void;
  onSaveEdit: (text: string) => void;
  onCancelEdit: () => void;
  onDelete: (id: number) => void;
}

/**
 * TaskItem component represents a single task in the task list.
 * It supports viewing, editing, and deleting a task.
 * 
 * Props:
 * - task: The task object containing id and text.
 * - isEditing: Boolean flag to indicate if the task is in edit mode.
 * - onStartEdit: Callback to initiate editing mode for the task.
 * - onSaveEdit: Callback to save the edited task text.
 * - onCancelEdit: Callback to cancel editing and revert changes.
 * - onDelete: Callback to delete the task.
 */
const TaskItem: React.FC<TaskItemProps> = ({
  task,
  isEditing,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}) => {
  // Local state to hold the current text value during editing
  const [localText, setLocalText] = useState(task.text);

  return (
    <View style={styles.taskItem}>
      {/* Conditionally render input field or static text based on editing state */}
      {isEditing ? (
        <StyledInput
          style={styles.taskInput}
          value={localText}
          onChangeText={setLocalText}
          onSubmitEditing={() => onSaveEdit(localText)}
          autoFocus
          onBlur={Platform.OS !== "web" ? () => onSaveEdit(localText) : undefined}
        />
      ) : Platform.OS !== "web" ? (
        <TouchableOpacity onPress={() => onStartEdit(task.id, task.text)}>
          <Text style={styles.taskText}>{task.text}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.taskText}>{task.text}</Text>
      )}

      {/* Render action icons only on web platform for better UX */}
      {Platform.OS === "web" && (
        <View style={styles.icons}>
          {isEditing ? (
            <>
              {/* Save and cancel buttons during editing */}
              <IconButton onPress={() => onSaveEdit(localText)} name="checkmark" size={24} color="green" />
              <IconButton onPress={onCancelEdit} name="close" size={24} color="red" />
            </>
          ) : (
            <>
              {/* Edit and delete buttons when not editing */}
              <IconButton
                onPress={() => onStartEdit(task.id, task.text)}
                name="create-outline"
                size={24}
                color="blue"
              />
              <IconButton
                onPress={() => onDelete(task.id)}
                name="trash-outline"
                size={24}
                color="red"
              />
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default TaskItem;