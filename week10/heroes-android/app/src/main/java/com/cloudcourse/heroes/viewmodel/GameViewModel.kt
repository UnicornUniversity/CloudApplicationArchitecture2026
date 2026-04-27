package com.cloudcourse.heroes.viewmodel

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.cloudcourse.heroes.data.model.Exercise
import com.cloudcourse.heroes.data.model.GameState
import com.cloudcourse.heroes.data.repository.ExerciseRepository
import com.cloudcourse.heroes.util.Constants
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class GameViewModel(private val repository: ExerciseRepository) : ViewModel() {

    private val _gameState = MutableStateFlow<GameState>(GameState.Loading)
    val gameState: StateFlow<GameState> = _gameState.asStateFlow()

    private var currentRound = 0
    private var failures = 0
    private var currentExercises: List<Exercise> = emptyList()

    init {
        loadExercises()
    }

    fun loadExercises() {
        _gameState.value = GameState.Loading

        viewModelScope.launch {
            repository.fetchExercises().fold(
                onSuccess = { exercises ->
                    currentExercises = exercises
                    Log.d("GameViewModel", "Round ${currentRound + 1}: ${exercises[0].v1} × ${exercises[0].v2} = ?")
                    _gameState.value = GameState.Playing(
                        currentRound = currentRound,
                        failures = failures,
                        exercises = exercises
                    )
                },
                onFailure = { error ->
                    Log.e("GameViewModel", "Failed to load exercises", error)
                    _gameState.value = GameState.Error(
                        error.message ?: "Failed to load exercises. Check your network connection."
                    )
                }
            )
        }
    }

    fun checkAnswer(selectedResult: Int) {
        val correctAnswer = currentExercises[0].result
        val isCorrect = selectedResult == correctAnswer

        Log.d(
            "GameViewModel",
            "Answer: $selectedResult, Correct: $correctAnswer, Result: ${if (isCorrect) "✓" else "✗"}"
        )

        if (!isCorrect) {
            failures++
            Log.d("GameViewModel", "Wrong answer! Failures: $failures/${Constants.MAX_FAILURES}")

            if (failures >= Constants.MAX_FAILURES) {
                Log.d("GameViewModel", "Game Over - Too many failures!")
                _gameState.value = GameState.Lost
                return
            }
        }

        currentRound++
        Log.d("GameViewModel", "Round complete: $currentRound/${Constants.MAX_ROUNDS}")

        if (currentRound >= Constants.MAX_ROUNDS) {
            Log.d("GameViewModel", "Game Won - All rounds completed!")
            _gameState.value = GameState.Won
        } else {
            // Load next round
            loadExercises()
        }
    }

    fun resetGame() {
        Log.d("GameViewModel", "Resetting game...")
        currentRound = 0
        failures = 0
        currentExercises = emptyList()
        loadExercises()
    }

    fun retry() {
        loadExercises()
    }
}
