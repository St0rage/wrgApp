import React from 'react'
import { Image, StyleSheet } from 'react-native'
import Modal from 'react-native-modalbox'
import { useDispatch, useSelector } from 'react-redux'

const ProductImage = () => {
    const dispatch = useDispatch()

    const { imageModal, imageUri } = useSelector((state) => state.globalReducer)

    const onClosedModal = () => {
        dispatch({type: 'SET_IMAGE_MODAL', value: false})
        dispatch({type: 'SET_IMAGE_URI', value: ''})
    }

    return (
        <Modal isOpen={imageModal} onClosed={onClosedModal} position={'center'} entry={'top'} animationDuration={100} style={{ height: 400, width: 400 }} backButtonClose={true} >
            <Image source={{ uri : imageUri }} style={{ height: 400, width: 400 }} />
        </Modal>
    )
}

export default ProductImage

const styles = StyleSheet.create({})