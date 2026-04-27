package com.cloudcourse.heroes.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.cloudcourse.heroes.util.Constants

@Composable
fun HealthBar(failures: Int, modifier: Modifier = Modifier) {
    Row(
        modifier = modifier.padding(16.dp),
        horizontalArrangement = Arrangement.Center,
        verticalAlignment = Alignment.CenterVertically
    ) {
        repeat(Constants.MAX_FAILURES) { index ->
            val heart = if (index < failures) "🖤" else "❤️"
            Text(
                text = heart,
                fontSize = 32.sp,
                modifier = Modifier
                    .padding(horizontal = 4.dp)
                    .size(40.dp)
            )
        }
    }
}
