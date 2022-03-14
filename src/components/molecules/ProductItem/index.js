import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MiniCategory from '../../atoms/MiniCategory';
import { useNavigation } from '@react-navigation/native';

const ProductItem = ({type = 'default', image, title, desc, categories, func, id, alert}) => {

  const price = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumSignificantDigits: 3 }).format(desc);

  const navigation = useNavigation();

  const onPress = () => {
    func(image)
  }

  const onDelete = () => {
    alert(id)
  }

  if (type === 'default') {
    return (
      <View style={styles.container(type)}>
        <TouchableOpacity activeOpacity={0.7} onPress={onPress} >
          <Image source={{ uri: image }} resizeMode="cover" style={styles.image(type)} />
        </TouchableOpacity>
        <View style={styles.content}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.price}>{price}</Text>
            </View>
            <View style={styles.category(type)}>
              <View style={styles.categoryWrapper}>
                {
                  categories.map((e ,i) => (
                    <MiniCategory label={e.category_name} key={i} />
                  ))
                }
              </View>
            </View>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container(type)}>
        <TouchableOpacity activeOpacity={0.7} onPress={onPress} >
          <Image source={{ uri: image }} resizeMode="cover" style={styles.image(type)} />
        </TouchableOpacity>
        <View style={styles.content}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.price}>{price}</Text>
            </View>
            <View style={styles.category(type)}>
              <View style={styles.categoryWrapper}>
                {
                  categories.map((e, i) => (
                    <MiniCategory label={e.category_name} key={i} />
                  ))
                }
              </View>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => navigation.navigate('UpdateProduct', { id })} activeOpacity={0.7} style={styles.button}>
                <Text style={styles.text}>Ubah</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} style={[styles.button, styles.deleteButton]} onPress={onDelete} >
                <Text style={[styles.text, styles.deleteText]}>Hapus</Text>
              </TouchableOpacity>
            </View>
        </View>
    </View>
  )

}

export default ProductItem

const styles = StyleSheet.create({
  container: (type) => ({
    flexDirection: 'row',
    height: type === 'default' ? 130 : 180,
    borderRadius: 10,
    backgroundColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginTop: 10
  }),
  image: (type) => ({
    width: type === 'default' ? 120 : 140,
    height: type === 'default' ? 130 : 180,
    borderRadius: 10
  }),
  content: {
    paddingLeft: 15,
    paddingTop: 11
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#232323'
  },
  price: {
    fontSize: 12,
    fontWeight: '500',
    color: '#232323',
    marginTop: 8
  },
  category: (type) => ({
    width: type === 'default' ? '100%': '85%',
    marginTop: 10,
  }),
  categoryWrapper: {
    width:'100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  actions: {
    flexDirection: 'row',
    paddingTop: 20
  },
  button: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#2DE834'
  },
  deleteButton: {
    backgroundColor: '#E82D2D',
    marginLeft: 8,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    color: 'black'
  },
  deleteText: {
    color: 'white'
  }
})