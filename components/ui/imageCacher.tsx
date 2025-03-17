import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import Animated from 'react-native-reanimated';

type ImageCacherProps = {
  source: { uri: string };
  style?: object;
  className?: string;
  uri: string;
};

const ImageCacher: React.FC<ImageCacherProps> = (props) => {
    const [cachedSource, setCachedSource] = useState<ImageSourcePropType | null>(null);
    const { uri } = props;

    useEffect(() => {
        const getCachedImage = async () => {
            try {
                const cachedImageData = await AsyncStorage.getItem(uri);
                if (cachedImageData) {
                    setCachedSource({ uri: cachedImageData });
                } else {
                    const response = await fetch(uri);
                    const imageBlob = await response.blob();
                    const base64Data = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(imageBlob);
                        reader.onloadend = () => {
                            resolve(reader.result as string);
                        };
                    });
                    await AsyncStorage.setItem(uri, base64Data as string);
                    setCachedSource({ uri: base64Data as string });
                }
            } catch (error) {
                console.error('Error caching image: ', error);
            }
        };

        getCachedImage();
    }, [uri]);

    if (!cachedSource) {
        return null;
    }

    const { source, ...restProps } = props;
    return <Animated.Image source={cachedSource} {...restProps} />;
};

export default ImageCacher;