/*
 * ******************************************************
 *  * Copyright (c) 2024 htilssu
 *  *
 *  * This code is the property of htilssu. All rights reserved.
 *  * Redistribution or reproduction of any part of this code
 *  * in any form, with or without modification, is strictly
 *  * prohibited without prior written permission from the author.
 *  *
 *  * Author: htilssu
 *  * Created: 21-10-2024
 *  ******************************************************
 */

import React from 'react';
import {CircleStencil, Cropper} from "react-advanced-cropper";
import 'react-advanced-cropper/dist/style.css';
import 'react-advanced-cropper/dist/themes/compact.css';

const ImageCropper = () => {

    return (
        <Cropper stencilComponent={CircleStencil}
        stencilProps={{
            aspectRatio: 1,
            grid: true
        }}/>
    );
};

export default ImageCropper;