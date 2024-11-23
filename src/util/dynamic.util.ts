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
 *  * Created: 3-11-2024
 *  ******************************************************
 */

export type Params = Promise<{ slug: string }>
export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
