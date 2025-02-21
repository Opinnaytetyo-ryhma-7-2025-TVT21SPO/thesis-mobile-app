import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Modal, Platform } from 'react-native';
import BlockChart from '../../components/ui/BlockChart';
import BlockProgress from '../../components/ui/BlockProgress';
import { getStyles } from '../../components/styles';
import { useTheme } from '../../components/ThemeContext';

export default function HomeScreen() {
  const { isDarkMode } = useTheme();
  const styles = getStyles();

  const [blocks, setBlocks] = useState<{ type: 'chart' | 'progress'; id: number }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const addBlock = (type: 'chart' | 'progress') => {
    setBlocks([...blocks, { type, id: blocks.length }]);
    setModalVisible(false);
  };

  const deleteBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.grid}>
        {blocks.map((block, index) => (
          block.type === 'chart' ? (
            <BlockChart key={index} onDelete={() => deleteBlock(index)} />
          ) : (
            <BlockProgress key={index} onDelete={() => deleteBlock(index)} />
          )
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Block</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => addBlock('chart')}>
              <Text style={styles.modalButtonText}>Add BlockChart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => addBlock('progress')}>
              <Text style={styles.modalButtonText}>Add BlockProgress</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}