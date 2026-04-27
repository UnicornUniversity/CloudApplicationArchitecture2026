package com.cloudcourse.heroes.data.model

sealed class GameState {
    data class Playing(
        val currentRound: Int,
        val failures: Int,
        val exercises: List<Exercise>
    ) : GameState()

    object Won : GameState()
    object Lost : GameState()
    object Loading : GameState()
    data class Error(val message: String) : GameState()
}
