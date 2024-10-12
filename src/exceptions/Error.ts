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
 *  * Created: 11-10-2024
 *  ******************************************************
 */
import {ErrorModel} from "@/dtos/error.model.ts";

export const USER_NOT_FOUND = new ErrorModel("USER_NOT_FOUND", "Người dùng không tồn tại", -1);
export const WRONG_PASSWORD = new ErrorModel("WRONG_PASSWORD", "Mật khẩu không đúng!", -1);
