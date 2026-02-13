import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View
} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');


/**
 * Props for the DropdownList component
 * Now works with ANY data structure!
 */
interface DropdownListProps<T = any> {
  // Data and selection
  data: T[];
  renderItem: (item: T) => string;
  getItemId: (item: T) => string | number;
  multiSelect?: boolean;
  onSelectionChange: (selectedItems: T | T[] | null) => void;

  // Label customization
  label?: string;
  labelStyle?: TextStyle;
  showLabel?: boolean;

  // Placeholder customization
  placeholder?: string;
  placeholderColor?: string;

  // Search customization
  searchable?: boolean;
  searchPlaceholder?: string;
  searchAutoFocus?: boolean;
  searchFilter?: (item: T, query: string) => boolean;

  // Dropdown appearance
  dropdownMaxHeight?: number;
  dropdownBorderRadius?: number;
  dropdownBackgroundColor?: string;
  dropdownBorderColor?: string;
  dropdownBorderWidth?: number;

  // Header appearance
  headerBorderRadius?: number;
  headerBackgroundColor?: string;
  headerBorderColor?: string;
  headerBorderWidth?: number;
  headerPadding?: number;

  // Selected item appearance
  selectedTextColor?: string;
  selectedTextFontWeight?: TextStyle['fontWeight'];
  selectedTextFontSize?: number;

  // List item appearance
  itemBackgroundColor?: string;
  itemSelectedBackgroundColor?: string;
  itemTextColor?: string;
  itemSelectedTextColor?: string;
  itemPadding?: number;
  itemFontSize?: number;

  // Icons
  leftIcon?: ReactNode;
  chevronColor?: string;
  chevronSize?: number;
  checkIconColor?: string;
  checkIconSize?: number;

  // Backdrop
  backdropColor?: string;
  backdropOpacity?: number;

  // Empty state
  emptyMessage?: string;
  emptyMessageColor?: string;

  // Advanced options
  disabled?: boolean;
  animationType?: 'none' | 'fade' | 'slide';
  closeOnSelect?: boolean;
}


/* ===================== COMPONENT ===================== */

/**
 * A flexible, customizable dropdown component for React Native
 * Works with ANY data structure - you define how to render and identify items
 * Supports both single and multi-select modes with search functionality
 * Automatically handles keyboard to keep dropdown visible on both iOS and Android
 */
export const DropdownList = <T,>({
  // Data and selection
  data,
  renderItem,
  getItemId,
  multiSelect = false,
  onSelectionChange,

  // Label
  label,
  labelStyle,
  showLabel = true,

  // Placeholder
  placeholder = 'Select an option',
  placeholderColor = '#999',

  // Search
  searchable = true,
  searchPlaceholder = 'Search...',
  searchAutoFocus = true,
  searchFilter,

  // Dropdown appearance
  dropdownMaxHeight = SCREEN_HEIGHT * 0.45,
  dropdownBorderRadius = 14,
  dropdownBackgroundColor = '#ffffff',
  dropdownBorderColor = '#ddd',
  dropdownBorderWidth = 1,

  // Header appearance
  headerBorderRadius = 12,
  headerBackgroundColor = '#ffffff',
  headerBorderColor = '#ddd',
  headerBorderWidth = 1,
  headerPadding = 18,

  // Selected text appearance
  selectedTextColor = '#333',
  selectedTextFontWeight = '600',
  selectedTextFontSize = 16,

  // List item appearance
  itemBackgroundColor = 'transparent',
  itemSelectedBackgroundColor = '#E3F2FD',
  itemTextColor = '#333',
  itemSelectedTextColor = '#1976D2',
  itemPadding = 16,
  itemFontSize = 16,

  // Icons
  leftIcon,
  chevronColor = '#555',
  chevronSize = 22,
  checkIconColor = '#1976D2',
  checkIconSize = 22,

  // Backdrop
  backdropColor = '#000000',
  backdropOpacity = 0.15,

  // Empty state
  emptyMessage = 'No results found',
  emptyMessageColor = '#999',

  // Advanced
  disabled = false,
  animationType = 'fade',
  closeOnSelect = true,
}: DropdownListProps<T>) => {
  // Ref to measure the header position for floating dropdown
  const headerRef = useRef<View>(null);

  // State management
  const [showList, setShowList] = useState(false);
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, maxHeight: 0 });
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // Keyboard event listeners
  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );

    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  /**
   * Filter data based on search query
   */
  const filteredData = data.filter((item) => {
    if (!searchQuery) return true;

    if (searchFilter) {
      return searchFilter(item, searchQuery);
    }

    const renderedText = renderItem(item);
    return renderedText.toLowerCase().includes(searchQuery.toLowerCase());
  });

  /**
   * Calculate optimal dropdown position considering keyboard
   */
  const calculateDropdownPosition = (x: number, y: number, width: number, height: number) => {
    // Calculate available space
    const screenBottom = SCREEN_HEIGHT - keyboardHeight;
    const availableSpaceBelow = screenBottom - y - height;
    const availableSpaceAbove = y;

    // Estimate dropdown height
    const searchBarHeight = searchable ? 56 : 0;
    const emptyStateHeight = 86; // Height for "No results found" message

    // If no data, use minimum height including empty state
    const estimatedItemsHeight = filteredData.length > 0
      ? filteredData.length * (itemPadding * 2 + itemFontSize + 1)
      : emptyStateHeight;

    const estimatedDropdownHeight = Math.min(
      dropdownMaxHeight,
      estimatedItemsHeight + searchBarHeight + 20
    );

    let calculatedTop: number;
    let calculatedMaxHeight: number;

    // Minimum height that ensures empty state is visible
    const minHeightForEmptyState = searchBarHeight + emptyStateHeight + 20;
    const minDisplayHeight = filteredData.length > 0 ? 200 : minHeightForEmptyState;

    // Priority 1: Try to fit below if there's reasonable space
    if (availableSpaceBelow >= Math.min(minDisplayHeight, estimatedDropdownHeight)) {
      calculatedTop = y + height + 6;
      calculatedMaxHeight = Math.min(
        dropdownMaxHeight,
        Math.max(minDisplayHeight, availableSpaceBelow - 10)
      );
    }
    // Priority 2: Try to fit above if there's reasonable space
    else if (availableSpaceAbove >= Math.min(minDisplayHeight, estimatedDropdownHeight)) {
      const heightToUse = Math.min(
        estimatedDropdownHeight,
        Math.max(minDisplayHeight, availableSpaceAbove - 10)
      );
      calculatedTop = y - heightToUse - 6;
      calculatedMaxHeight = heightToUse;
    }
    // Priority 3: Use the larger available space
    else {
      if (availableSpaceBelow >= availableSpaceAbove) {
        calculatedTop = y + height + 6;
        calculatedMaxHeight = Math.max(minDisplayHeight, availableSpaceBelow - 10);
      } else {
        calculatedMaxHeight = Math.max(minDisplayHeight, availableSpaceAbove - 10);
        calculatedTop = y - calculatedMaxHeight - 6;
      }
    }

    // Ensure dropdown doesn't go off-screen
    calculatedTop = Math.max(10, Math.min(calculatedTop, screenBottom - minDisplayHeight));

    // Ensure minimum and maximum heights
    calculatedMaxHeight = Math.max(minDisplayHeight, Math.min(calculatedMaxHeight, dropdownMaxHeight));

    return {
      top: calculatedTop,
      left: x,
      width,
      maxHeight: calculatedMaxHeight,
    };
  };

  /**
   * Toggle dropdown visibility
   */
  const toggleList = () => {
    if (disabled) return;

    if (!showList) {
      headerRef.current?.measureInWindow((x, y, width, height) => {
        const calculatedPosition = calculateDropdownPosition(x, y, width, height);
        setPosition(calculatedPosition);
        setShowList(true);
      });
    } else {
      setShowList(false);
      setSearchQuery('');
    }
  };

  /**
   * Recalculate position when keyboard height changes or filtered data changes
   */
  useEffect(() => {
    if (showList && headerRef.current) {
      const timer = setTimeout(() => {
        headerRef.current?.measureInWindow((x, y, width, height) => {
          const calculatedPosition = calculateDropdownPosition(x, y, width, height);
          setPosition(calculatedPosition);
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [keyboardHeight, filteredData.length, showList]);

  /**
   * Handle item selection
   */
  const handleSelect = (item: T) => {
    if (!multiSelect) {
      setSelectedItems([item]);
      setSearchQuery('');

      if (closeOnSelect) {
        setShowList(false);
      }

      onSelectionChange(item);
    } else {
      const itemId = getItemId(item);
      const isSelected = selectedItems.some((i) => getItemId(i) === itemId);
      const newSelected = isSelected
        ? selectedItems.filter((i) => getItemId(i) !== itemId)
        : [...selectedItems, item];

      setSelectedItems(newSelected);
      onSelectionChange(newSelected);
    }
  };

  /**
   * Render the selected items display in the header
   */
  const renderSelectedDisplay = () => {
    if (selectedItems.length === 0) {
      return (
        <Text style={[styles.placeholder, { color: placeholderColor, fontSize: selectedTextFontSize }]}>
          {placeholder}
        </Text>
      );
    }

    if (!multiSelect) {
      return (
        <Text
          style={[
            styles.selectedText,
            {
              color: selectedTextColor,
              fontWeight: selectedTextFontWeight,
              fontSize: selectedTextFontSize,
            },
          ]}
        >
          {renderItem(selectedItems[0])}
        </Text>
      );
    }

    return (
      <Text
        style={[
          styles.selectedText,
          {
            color: selectedTextColor,
            fontWeight: selectedTextFontWeight,
            fontSize: selectedTextFontSize,
          },
        ]}
        numberOfLines={1}
      >
        {selectedItems.map((i) => renderItem(i)).join(', ')}
      </Text>
    );
  };

  /**
   * Render individual list item
   */
  const renderListItem = ({ item }: { item: T }) => {
    const itemId = getItemId(item);
    const isSelected = selectedItems.some((i) => getItemId(i) === itemId);

    return (
      <TouchableOpacity
        style={[
          styles.listItem,
          {
            paddingVertical: itemPadding,
            paddingHorizontal: itemPadding + 2,
            backgroundColor: isSelected ? itemSelectedBackgroundColor : itemBackgroundColor,
          },
        ]}
        onPress={() => handleSelect(item)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.itemText,
            {
              fontSize: itemFontSize,
              color: isSelected ? itemSelectedTextColor : itemTextColor,
              fontWeight: isSelected ? '700' : 'normal',
            },
          ]}
        >
          {renderItem(item)}
        </Text>

        {multiSelect && isSelected && (
          <MaterialIcons name="check" size={checkIconSize} color={checkIconColor} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        {label && showLabel && (
          <View style={[styles.labelContainer, labelStyle]}>
            <Text style={styles.labelText}>{label}</Text>
          </View>
        )}

        <TouchableOpacity
          ref={headerRef}
          style={[
            styles.dropdownHeader,
            {
              padding: headerPadding,
              backgroundColor: headerBackgroundColor,
              borderRadius: headerBorderRadius,
              borderWidth: headerBorderWidth,
              borderColor: headerBorderColor,
              opacity: disabled ? 0.5 : 1,
            },
          ]}
          onPress={toggleList}
          activeOpacity={0.8}
          disabled={disabled}
        >
          {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

          <View style={styles.selectedContainer}>{renderSelectedDisplay()}</View>

          <Ionicons
            name={showList ? 'chevron-up' : 'chevron-down'}
            size={chevronSize}
            color={chevronColor}
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showList}
        transparent
        animationType={animationType}
        statusBarTranslucent
        onRequestClose={() => {
          setShowList(false);
          setSearchQuery('');
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalContainer}
          keyboardVerticalOffset={0}
        >
          <Pressable
            style={[
              styles.backdrop,
              {
                backgroundColor: backdropColor,
                opacity: backdropOpacity,
              },
            ]}
            onPress={() => {
              setShowList(false);
              setSearchQuery('');
            }}
          />

          <View
            style={[
              styles.floatingDropdown,
              {
                top: position.top,
                left: position.left,
                width: position.width,
                maxHeight: position.maxHeight || dropdownMaxHeight,
                backgroundColor: dropdownBackgroundColor,
                borderRadius: dropdownBorderRadius,
                borderWidth: dropdownBorderWidth,
                borderColor: dropdownBorderColor,
              },
            ]}
          >
            {searchable && (
              <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#777" />
                <TextInput
                  style={styles.searchInput}
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoFocus={searchAutoFocus}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <Ionicons name="close-circle" size={22} color="#999" />
                  </TouchableOpacity>
                )}
              </View>
            )}

            <FlatList
              data={filteredData}
              renderItem={renderListItem}
              keyExtractor={(item) => getItemId(item).toString()}
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled
              showsVerticalScrollIndicator={true}
              style={{ flexGrow: 1 }}
              contentContainerStyle={{
                flexGrow: 1,
              }}
              ListEmptyComponent={
                <View style={styles.noResults}>
                  <Text style={[styles.noResultsText, { color: emptyMessageColor }]}>
                    {emptyMessage}
                  </Text>
                </View>
              }
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  container: {
    marginBottom: 30,
  },
  headerWrapper: {
    position: 'relative',
  },
  labelContainer: {
    position: 'absolute',
    top: -10,
    left: 14,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    zIndex: 10,
  },
  labelText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  leftIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedContainer: {
    flex: 1,
  },
  placeholder: {
    fontSize: 16,
  },
  selectedText: {
    fontSize: 16,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  floatingDropdown: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
    overflow: 'hidden',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    height: 44,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
  },
  noResults: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minHeight: 86,
  },
  noResultsText: {
    fontSize: 15,
    textAlign: 'center',
  },
});