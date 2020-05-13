import React from 'react';
import {
    Image as CloudinaryImage,
    Transformation as CloudinaryTransformation,
} from 'cloudinary-react';

const DeviceFaceImage = ({ publicId, ...props }) => (
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
        <CloudinaryTransformation
            effect="improve"
            height="910"
            width="460"
            x="202"
            y="54"
            zoom="1"
            crop="crop"
            quality="auto"
            fetchFormat="auto"
        />
    </CloudinaryImage>
);

export default DeviceFaceImage;
