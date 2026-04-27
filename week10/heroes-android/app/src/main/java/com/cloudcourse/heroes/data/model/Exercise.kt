package com.cloudcourse.heroes.data.model

import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class Exercise(
    val v1: Int,
    val v2: Int,
    val result: Int
)
