import React from 'react';
import {
    Image as CloudinaryImage,
    Transformation as CloudinaryTransformation,
} from 'cloudinary-react';

const ResponsiveImage = ({ publicId, ...props }) => (
    <CloudinaryImage
        dpr="auto"
        responsive
        width="auto"
        crop="scale"
        responsiveUseBreakpoints="true"
        cloudName="dixbbbpco"
        publicId={publicId}
        {...props}
    >
        <CloudinaryTransformation quality="auto" fetchFormat="auto" />
    </CloudinaryImage>
);

export default ResponsiveImage;
