package com.cloudcourse.heroes.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.cloudcourse.heroes.data.model.GameState
import com.cloudcourse.heroes.ui.theme.SuccessGreen
import com.cloudcourse.heroes.ui.theme.DangerRed
import com.cloudcourse.heroes.viewmodel.GameViewModel

@Composable
fun GameScreen(viewModel: GameViewModel, modifier: Modifier = Modifier) {
    val gameState by viewModel.gameState.collectAsState()

    Box(
        modifier = modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        when (val state = gameState) {
            is GameState.Loading -> {
                LoadingScreen()
            }

            is GameState.Playing -> {
                PlayingScreen(
                    currentRound = state.currentRound,
                    failures = state.failures,
                    exercises = state.exercises,
                    onAnswerClick = { answer -> viewModel.checkAnswer(answer) }
                )
            }

            is GameState.Won -> {
                GameOverScreen(
                    won = true,
                    onPlayAgain = { viewModel.resetGame() }
                )
            }

            is GameState.Lost -> {
                GameOverScreen(
                    won = false,
                    onPlayAgain = { viewModel.resetGame() }
                )
            }

            is GameState.Error -> {
                ErrorScreen(
                    message = state.message,
                    onRetry = { viewModel.retry() }
                )
            }
        }
    }
}

@Composable
fun LoadingScreen() {
    Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        CircularProgressIndicator(
            modifier = Modifier.padding(16.dp)
        )
        Text(
            text = "Loading exercise...",
            style = MaterialTheme.typography.bodyLarge
        )
    }
}

@Composable
fun PlayingScreen(
    currentRound: Int,
    failures: Int,
    exercises: List<com.cloudcourse.heroes.data.model.Exercise>,
    onAnswerClick: (Int) -> Unit
) {
    Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Round counter
        Text(
            text = "Round ${currentRound + 1} / ${com.cloudcourse.heroes.util.Constants.MAX_ROUNDS}",
            style = MaterialTheme.typography.titleLarge,
            modifier = Modifier.padding(top = 24.dp, bottom = 8.dp)
        )

        // Health bar
        HealthBar(failures = failures)

        // Characters
        CharacterDisplay(currentRound = currentRound)

        // Exercise
        ExerciseView(
            exercises = exercises,
            onAnswerClick = onAnswerClick
        )
    }
}

@Composable
fun GameOverScreen(won: Boolean, onPlayAgain: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = if (won) "🎉" else "😢",
            fontSize = 80.sp,
            modifier = Modifier.padding(bottom = 24.dp)
        )

        Text(
            text = if (won) "Victory!" else "Game Over",
            style = MaterialTheme.typography.titleLarge,
            fontSize = 48.sp,
            fontWeight = FontWeight.Bold,
            color = if (won) SuccessGreen else DangerRed,
            modifier = Modifier.padding(bottom = 16.dp)
        )

        Text(
            text = if (won)
                "You defeated all the monsters!"
            else
                "Too many wrong answers. Try again!",
            style = MaterialTheme.typography.bodyLarge,
            fontSize = 18.sp,
            textAlign = TextAlign.Center,
            modifier = Modifier.padding(bottom = 32.dp)
        )

        Button(
            onClick = onPlayAgain,
            modifier = Modifier.fillMaxWidth(0.6f)
        ) {
            Text(
                text = "Play Again",
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(vertical = 8.dp)
            )
        }
    }
}

@Composable
fun ErrorScreen(message: String, onRetry: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "⚠️",
            fontSize = 64.sp,
            modifier = Modifier.padding(bottom = 16.dp)
        )

        Text(
            text = "Error",
            style = MaterialTheme.typography.titleLarge,
            fontSize = 32.sp,
            fontWeight = FontWeight.Bold,
            color = DangerRed,
            modifier = Modifier.padding(bottom = 8.dp)
        )

        Text(
            text = message,
            style = MaterialTheme.typography.bodyLarge,
            textAlign = TextAlign.Center,
            modifier = Modifier.padding(bottom = 32.dp)
        )

        Button(
            onClick = onRetry,
            modifier = Modifier.fillMaxWidth(0.6f)
        ) {
            Text(
                text = "Retry",
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(vertical = 8.dp)
            )
        }
    }
}
