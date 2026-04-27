package com.cloudcourse.heroes.ui

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import com.cloudcourse.heroes.R

@Composable
fun CharacterDisplay(currentRound: Int, modifier: Modifier = Modifier) {
    // Cycle through monster variants
    val monsterResource = when (currentRound % 3) {
        0 -> R.drawable.monster1
        1 -> R.drawable.monster2
        else -> R.drawable.monster3
    }

    Row(
        modifier = modifier
            .fillMaxWidth()
            .padding(vertical = 24.dp),
        horizontalArrangement = Arrangement.SpaceEvenly,
        verticalAlignment = Alignment.CenterVertically
    ) {
        // Hero
        Image(
            painter = painterResource(id = R.drawable.hero),
            contentDescription = "Hero character",
            modifier = Modifier.size(120.dp)
        )

        // Monster
        Image(
            painter = painterResource(id = monsterResource),
            contentDescription = "Monster character",
            modifier = Modifier.size(120.dp)
        )
    }
}
