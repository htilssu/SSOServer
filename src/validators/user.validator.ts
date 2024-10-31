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
 *  * Created: 31-10-2024
 *  ******************************************************
 */

const isContainNumberAndSpecialCharacterPattern = /\W|_|\d/g

export function nameValidator(name: string) {
    if (!name || name?.length === 0) return "Tên không được để trống";

    if (isContainNumberAndSpecialCharacterPattern.test(name)) return "Tên không được chứa ký tự đặc biệt hoặc số";
}