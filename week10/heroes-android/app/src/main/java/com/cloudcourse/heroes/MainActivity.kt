package com.cloudcourse.heroes

import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.cloudcourse.heroes.data.api.ExerciseApiService
import com.cloudcourse.heroes.data.repository.ExerciseRepository
import com.cloudcourse.heroes.ui.GameScreen
import com.cloudcourse.heroes.ui.theme.HeroesTheme
import com.cloudcourse.heroes.viewmodel.GameViewModel
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import java.util.concurrent.TimeUnit

class MainActivity : ComponentActivity() {

    private lateinit var viewModel: GameViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Get backend URL from resources
        val backendUrl = getString(R.string.backend_url)
        Log.d("MainActivity", "Backend URL: $backendUrl")

        // Setup networking
        val loggingInterceptor = HttpLoggingInterceptor { message ->
            Log.d("HTTP", message)
        }.apply {
            level = HttpLoggingInterceptor.Level.BODY
        }

        val okHttpClient = OkHttpClient.Builder()
            .addInterceptor(loggingInterceptor)
            .connectTimeout(10, TimeUnit.SECONDS)
            .readTimeout(10, TimeUnit.SECONDS)
            .writeTimeout(10, TimeUnit.SECONDS)
            .build()

        val moshi = Moshi.Builder()
            .add(KotlinJsonAdapterFactory())
            .build()

        val retrofit = Retrofit.Builder()
            .baseUrl(backendUrl)
            .client(okHttpClient)
            .addConverterFactory(MoshiConverterFactory.create(moshi))
            .build()

        val apiService = retrofit.create(ExerciseApiService::class.java)
        val repository = ExerciseRepository(apiService)
        viewModel = GameViewModel(repository)

        setContent {
            HeroesTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    GameScreen(viewModel = viewModel)
                }
            }
        }
    }
}
