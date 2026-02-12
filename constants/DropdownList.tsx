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
 * All styling and behavior can be customized through these props
 */
interface DropdownListProps {
  // Data and selection
  data: Item[];
  titleKey?: keyof Item;
  multiSelect?: boolean;
  onSelectionChange: (selectedItems: Item | Item[] | null) => void;

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
  leftIcon?: ReactNode; // NEW: Left icon support (like CustomTextInput)
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
  closeOnSelect?: boolean; // Only for single select
}


/* ===================== TYPES ===================== */

/**
 * Generic item structure - can be extended based on your data needs
 */
interface Item {
  id: string | number;
  name: string;
  category: string;
  color: string;
  price: number;
  unit: string;
  origin: string;
  stock: number;
  rating: number;
  description: string;
}


/* ===================== COMPONENT ===================== */

/**
 * A flexible, customizable dropdown component for React Native
 * Supports both single and multi-select modes with search functionality
 * Automatically handles keyboard to keep dropdown visible on both iOS and Android
 */
export const DropdownList: React.FC<DropdownListProps> = ({
  // Data and selection
  data,
  titleKey = 'name',
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
  leftIcon, // NEW: Left icon
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
  closeOnSelect = true, // Only applies to single select
}) => {
  // Ref to measure the header position for floating dropdown
  const headerRef = useRef<View>(null);

  // State management
  const [showList, setShowList] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
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

  // Log selected items when they change (can be removed in production)
  useEffect(() => {
    console.log('Selected Items:', selectedItems);
  }, [selectedItems]);

  /**
   * Filter data based on search query
   * Searches in the field specified by titleKey
   */
  const filteredData = data.filter((item) => {
    const itemValue = item[titleKey];
    if (itemValue === null || itemValue === undefined) {
      return false;
    }
    return itemValue
      .toString()
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  /**
   * Calculate optimal dropdown position considering keyboard
   */
  const calculateDropdownPosition = (x: number, y: number, width: number, height: number) => {
    const availableSpaceBelow = SCREEN_HEIGHT - y - height - keyboardHeight;
    const availableSpaceAbove = y;
    const dropdownHeight = Math.min(dropdownMaxHeight, filteredData.length * (itemPadding * 2 + itemFontSize) + (searchable ? 56 : 0));

    // Check if dropdown fits below the header
    const fitsBelow = availableSpaceBelow >= dropdownHeight;

    // Check if dropdown fits above the header
    const fitsAbove = availableSpaceAbove >= dropdownHeight;

    let calculatedTop: number;
    let calculatedMaxHeight: number;

    if (fitsBelow) {
      // Position below header
      calculatedTop = y + height + 6;
      calculatedMaxHeight = Math.min(dropdownMaxHeight, availableSpaceBelow - 10);
    } else if (fitsAbove) {
      // Position above header
      calculatedTop = y - dropdownHeight - 6;
      calculatedMaxHeight = Math.min(dropdownMaxHeight, availableSpaceAbove - 10);
    } else {
      // Not enough space either way - use available space below and make scrollable
      if (availableSpaceBelow > availableSpaceAbove) {
        calculatedTop = y + height + 6;
        calculatedMaxHeight = availableSpaceBelow - 10;
      } else {
        calculatedTop = 10;
        calculatedMaxHeight = y - 20;
      }
    }

    return {
      top: calculatedTop,
      left: x,
      width,
      maxHeight: calculatedMaxHeight,
    };
  };

  /**
   * Toggle dropdown visibility
   * Measures header position to properly position the floating dropdown
   */
  const toggleList = () => {
    if (disabled) {
      return;
    }

    if (!showList) {
      // Measure header position before opening
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
   * Recalculate position when keyboard height changes
   */
  useEffect(() => {
    if (showList) {
      headerRef.current?.measureInWindow((x, y, width, height) => {
        const calculatedPosition = calculateDropdownPosition(x, y, width, height);
        setPosition(calculatedPosition);
      });
    }
  }, [keyboardHeight]);

  /**
   * Handle item selection
   * For single select: replaces selection and closes dropdown
   * For multi select: toggles item in selection array
   */
  const handleSelect = (item: Item) => {
    if (!multiSelect) {
      // Single select mode
      setSelectedItems([item]);
      setSearchQuery('');

      // Close dropdown if closeOnSelect is enabled
      if (closeOnSelect) {
        setShowList(false);
      }

      onSelectionChange(item);
    } else {
      // Multi select mode
      const isSelected = selectedItems.some((i) => i.id === item.id);
      const newSelected = isSelected
        ? selectedItems.filter((i) => i.id !== item.id)
        : [...selectedItems, item];

      setSelectedItems(newSelected);
      onSelectionChange(newSelected);
    }
  };

  /**
   * Render the selected items display in the header
   * Shows placeholder if nothing is selected
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
      // Single select: show only the selected item
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
          {selectedItems[0][titleKey]}
        </Text>
      );
    }

    // Multi select: show comma-separated list
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
        {selectedItems.map((i) => i[titleKey]).join(', ')}
      </Text>
    );
  };

  /**
   * Render individual list item
   * Shows checkmark for selected items in multi-select mode
   */
  const renderItem = ({ item }: { item: Item }) => {
    const isSelected = selectedItems.some((i) => i.id === item.id);

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
          {item[titleKey]}
        </Text>

        {multiSelect && isSelected && (
          <MaterialIcons name="check" size={checkIconSize} color={checkIconColor} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Wrapper */}
      <View style={styles.headerWrapper}>
        {/* Label positioned above the dropdown */}
        {label && showLabel && (
          <View
            style={[
              styles.labelContainer,
              labelStyle,
            ]}
          >
            <Text style={styles.labelText}>
              {label}
            </Text>
          </View>
        )}

        {/* Dropdown Header (clickable area) */}
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
          {/* Left Icon */}
          {leftIcon && (
            <View style={styles.leftIconContainer}>
              {leftIcon}
            </View>
          )}

          <View style={styles.selectedContainer}>
            {renderSelectedDisplay()}
          </View>

          {/* Chevron icon (up/down arrow) */}
          <Ionicons
            name={showList ? 'chevron-up' : 'chevron-down'}
            size={chevronSize}
            color={chevronColor}
          />
        </TouchableOpacity>
      </View>

      {/* Floating Dropdown Modal */}
      <Modal
        visible={showList}
        transparent
        animationType={animationType}
        onRequestClose={() => {
          setShowList(false);
          setSearchQuery('');
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          {/* Backdrop - clicking closes the dropdown */}
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

          {/* Dropdown content container */}
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
            {/* Search Input */}
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

            {/* List of items */}
            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled
            />

            {/* Empty state when no results found */}
            {filteredData.length === 0 && (
              <View style={styles.noResults}>
                <Text style={[styles.noResultsText, { color: emptyMessageColor }]}>
                  {emptyMessage}
                </Text>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  // Modal container
  modalContainer: {
    flex: 1,
  },

  // Main container for each dropdown instance
  container: {
    marginBottom: 30,
  },

  // Header wrapper (contains label and dropdown header)
  headerWrapper: {
    position: 'relative',
  },

  // Label styling (floating above the dropdown)
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

  // Dropdown header (clickable button area)
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  // Left icon container
  leftIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Container for selected items display
  selectedContainer: {
    flex: 1,
  },

  // Placeholder text when nothing is selected
  placeholder: {
    fontSize: 16,
  },

  // Selected items text
  selectedText: {
    fontSize: 16,
  },

  // Backdrop overlay
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },

  // Floating dropdown container
  floatingDropdown: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
    overflow: 'hidden',
  },

  // Search input container
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    gap: 10,
  },

  // Search text input
  searchInput: {
    flex: 1,
    fontSize: 17,
    height: 44,
  },

  // Individual list item
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // List item text
  itemText: {
    fontSize: 16,
  },

  // Empty state container
  noResults: {
    padding: 30,
    alignItems: 'center',
  },

  // Empty state text
  noResultsText: {
    fontSize: 15,
  },
});