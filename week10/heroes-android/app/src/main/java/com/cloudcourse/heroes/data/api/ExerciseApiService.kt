package com.cloudcourse.heroes.data.api

import com.cloudcourse.heroes.data.model.Exercise
import retrofit2.http.GET

interface ExerciseApiService {
    @GET("tasks/exercise")
    suspend fun getExercise(): Exercise
}
