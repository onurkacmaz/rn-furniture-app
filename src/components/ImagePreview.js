import React, { useContext } from 'react'
import { Image, TouchableOpacity } from 'react-native';
import ImageSlider from 'react-native-image-slider';
import {OverlayContext} from '../context/overylayContext'

const ImagePreview = (props) => {

  const {images} = props
  const context = useContext(OverlayContext)

  const handleOpenImagePreview = (item) => {
    context.overlayActive ? context.hideOverlay() : context.showOverlay()
    context.setChilds(
      <TouchableOpacity onPress={() => context.hideOverlay()}>
        <Image source={{uri: item.image, width:'100%', height:'100%'}} style={{transform: [{scale:2}]}} resizeMode="center" />
      </TouchableOpacity>
    )
  }

  return (
    <>
    {images ? <ImageSlider onPress={(item) => handleOpenImagePreview(item)} style={{backgroundColor:'transparent'}} images={images}/> : null}
    </>
  )
}

export default ImagePreview