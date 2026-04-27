package com.cloudcourse.heroes.data.repository

import android.util.Log
import com.cloudcourse.heroes.data.api.ExerciseApiService
import com.cloudcourse.heroes.data.model.Exercise
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class ExerciseRepository(private val api: ExerciseApiService) {

    suspend fun fetchExercises(): Result<List<Exercise>> = withContext(Dispatchers.IO) {
        try {
            Log.d("ExerciseRepository", "Fetching 3 exercises from API...")

            // Fetch 3 exercises in parallel (one correct, two random)
            val exercises = List(3) { index ->
                val exercise = api.getExercise()
                Log.d("ExerciseRepository", "Exercise $index: ${exercise.v1} × ${exercise.v2} = ${exercise.result}")
                exercise
            }

            // Shuffle to randomize correct answer position
            Result.success(exercises.shuffled())
        } catch (e: Exception) {
            Log.e("ExerciseRepository", "Error fetching exercises", e)
            Result.failure(e)
        }
    }
}
