import { FlashList } from '@shopify/flash-list';
import React, { useMemo, useState } from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

type Company = {
    id: string;
    name: string;
};

type Props = {
    listData: Company[];
};

export default function SelectModal({ listData }: Props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [search, setSearch] = useState('');

    const filteredData = useMemo(() => {
        const keyword = search.toLowerCase();
        return listData.filter(
            item =>
                item.name.toLowerCase().includes(keyword) ||
                item.id.toLowerCase().includes(keyword)
        );
    }, [search, listData]);

    const handleSelect = (item: Company) => {
        setSelectedCompany(item);
        setSearch('');
        setModalVisible(false);
    };

    return (
        <>
            <Text style={styles.label}>Company</Text>

            <Pressable
                style={styles.dropdown}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.dropdownText}>
                    {selectedCompany
                        ? `${selectedCompany.name} [${selectedCompany.id}]`
                        : 'Select company / code'}
                </Text>
            </Pressable>

            <Modal
                transparent
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackdrop}>
                    {/* Backdrop */}
                    <Pressable
                        style={StyleSheet.absoluteFill}
                        onPress={() => setModalVisible(false)}
                    />

                    {/* Modal Card */}
                    <View style={styles.modalCard}>
                        <TextInput
                            placeholder="Search company"
                            value={search}
                            onChangeText={setSearch}
                            style={styles.input}
                        />

                        {/* ✅ FIXED HEIGHT CONTAINER */}
                        <View style={styles.listContainer}>
                            {filteredData.length === 0 ? (
                                <Text style={styles.emptyText}>
                                    No companies found
                                </Text>
                            ) : (
                                <FlashList
                                    data={filteredData}
                                    keyExtractor={(item) => item.id}
                                    estimatedItemSize={60}
                                    keyboardShouldPersistTaps="handled"
                                    style={styles.flashList}
                                    renderItem={({ item }) => (
                                        <Pressable
                                            style={styles.item}
                                            onPress={() => handleSelect(item)}
                                        >
                                            <Text style={styles.itemText}>
                                                {item.name} [{item.id}]
                                            </Text>
                                        </Pressable>
                                    )}
                                />
                            )}
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}
const styles = StyleSheet.create({
    label: {
        marginBottom: 6,
        fontSize: 14,
        fontWeight: '500',
    },

    dropdown: {
        height: 45,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 6,
        justifyContent: 'center',
        paddingHorizontal: 12,
        backgroundColor: '#fff',
    },

    dropdownText: {
        color: '#333',
    },

    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalCard: {
        width: '85%',
        maxHeight: '70%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
    },

    input: {
        height: 45,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        paddingHorizontal: 12,
        marginBottom: 12,
        backgroundColor: '#fff',
    },

    /* 🔑 FLASHLIST FIX */
    listContainer: {
        minHeight: 200,
    },

    flashList: {
        height: 300, // 👈 REQUIRED
    },

    item: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#fff',
    },

    itemText: {
        fontSize: 16,
        color: '#333',
    },

    emptyText: {
        textAlign: 'center',
        paddingVertical: 32,
        color: '#999',
    },
});
