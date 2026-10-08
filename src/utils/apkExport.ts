export interface ProjectFile {
  path: string;
  language: string;
  description: string;
  content: string;
}

export const KOTLIN_PROJECT_FILES: ProjectFile[] = [
  {
    path: 'app/src/main/AndroidManifest.xml',
    language: 'xml',
    description: 'تنظیمات مانیفست اندروید، دسترسی‌ها و حالت راست‌چین (RTL)',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.zibano">

    <!-- دسترسی اینترنت برای ارتباط با سرور و فایربیس -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <!-- دسترسی نوتیفیکیشن برای اندروید 13 به بالا -->
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    <!-- دسترسی تماس سریع با مشتری -->
    <uses-permission android:name="android.permission.CALL_PHONE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="زیبانو"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.Zibano">
        
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:windowSoftInputMode="adjustResize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <!-- سرویس پوش نوتیفیکیشن فایربیس -->
        <service
            android:name=".utils.MyFirebaseMessagingService"
            android:exported="false">
            <intent-filter>
                <action android:name="com.google.firebase.MESSAGING_EVENT" />
            </intent-filter>
        </service>
    </application>
</manifest>`
  },
  {
    path: 'app/build.gradle.kts',
    language: 'kotlin',
    description: 'پیکربندی گریدل، کامپایلر Jetpack Compose و وابستگی‌ها',
    content: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "com.example.zibano"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.example.zibano"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            signingConfig = signingConfigs.getByName("debug")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        compose = true
    }
}

dependencies {
    // Jetpack Compose & Material 3
    implementation(platform("androidx.compose:compose-bom:2024.10.01"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.material:material-icons-extended")

    // Lifecycle & Navigation
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.8.7")
    implementation("androidx.activity:activity-compose:1.9.3")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.7")
    implementation("androidx.navigation:navigation-compose:2.8.3")

    // Firebase (Authentication, Firestore, Messaging)
    implementation(platform("com.google.firebase:firebase-bom:33.5.1"))
    implementation("com.google.firebase:firebase-auth-ktx")
    implementation("com.google.firebase:firebase-firestore-ktx")
    implementation("com.google.firebase:firebase-messaging-ktx")

    // Coil for Image Loading
    implementation("io.coil-kt:coil-compose:2.7.0")

    // Persian Date Picker & Utilities
    implementation("com.github.samanzamani:PersianDate:1.7.1")
}`
  },
  {
    path: 'app/src/main/java/com/example/zibano/MainActivity.kt',
    language: 'kotlin',
    description: 'اکتیویتی اصلی و مسیریابی کامل ناوبری Jetpack Compose',
    content: `package com.example.zibano

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.zibano.ui.theme.ZibanoTheme
import com.example.zibano.ui.auth.LoginScreen
import com.example.zibano.ui.owner.OwnerHomeScreen
import com.example.zibano.ui.owner.AppointmentsScreen
import com.example.zibano.ui.owner.ReportsScreen
import com.example.zibano.ui.customer.CustomerHomeScreen
import com.example.zibano.ui.customer.BookingScreen

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ZibanoTheme {
                ZibanoAppNavigation()
            }
        }
    }
}

@Composable
fun ZibanoAppNavigation() {
    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = "login") {
        composable("login") {
            LoginScreen(
                onLoginSuccess = { role ->
                    if (role == "OWNER") {
                        navController.navigate("owner_home") {
                            popUpTo("login") { inclusive = true }
                        }
                    } else {
                        navController.navigate("customer_home") {
                            popUpTo("login") { inclusive = true }
                        }
                    }
                }
            )
        }

        composable("owner_home") {
            OwnerHomeScreen(
                salonName = "سالن زیبایی مریم",
                navController = navController
            )
        }

        composable("appointments") {
            AppointmentsScreen(navController = navController)
        }

        composable("reports") {
            ReportsScreen(navController = navController)
        }

        composable("customer_home") {
            CustomerHomeScreen(userName = "سارا", navController = navController)
        }

        composable("booking/{salonId}") { backStackEntry ->
            val salonId = backStackEntry.arguments?.getString("salonId") ?: "1"
            BookingScreen(salonId = salonId, navController = navController)
        }
    }
}`
  },
  {
    path: 'app/src/main/java/com/example/zibano/ui/theme/Color.kt',
    language: 'kotlin',
    description: 'رنگ‌های تم لوکس آرایشگاهی (RoseGold, PinkSoft, Cream, Gold)',
    content: `package com.example.zibano.ui.theme

import androidx.compose.ui.graphics.Color

val PinkSoft = Color(0xFFFFD1DC)
val RoseGold = Color(0xFFB76E79)
val Cream = Color(0xFFFFF5E1)
val Gold = Color(0xFFD4AF37)
val White = Color(0xFFFFFFFF)
val TextDark = Color(0xFF333333)
val TextGray = Color(0xFF888888)
val LightBg = Color(0xFFFAF7F5)
val AccentTeal = Color(0xFF26A69A)`
  },
  {
    path: 'app/src/main/java/com/example/zibano/ui/theme/Theme.kt',
    language: 'kotlin',
    description: 'تم اختصاصی Zibano با اعمال راست‌چین (RTL) سراسری',
    content: `package com.example.zibano.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.platform.LocalLayoutDirection
import androidx.compose.ui.unit.LayoutDirection

private val LightColors = lightColorScheme(
    primary = RoseGold,
    secondary = Gold,
    background = LightBg,
    surface = White,
    onPrimary = White,
    onBackground = TextDark
)

@Composable
fun ZibanoTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = LightColors,
        typography = Typography
    ) {
        CompositionLocalProvider(LocalLayoutDirection provides LayoutDirection.Rtl) {
            content()
        }
    }
}`
  },
  {
    path: 'app/src/main/java/com/example/zibano/domain/usecases/CheckTimeSlotAvailabilityUseCase.kt',
    language: 'kotlin',
    description: 'یوزکیس هوشمند بررسی تداخل زمانی نوبت‌ها',
    content: `package com.example.zibano.domain.usecases

import com.example.zibano.domain.models.Appointment
import com.example.zibano.domain.models.AppointmentStatus
import java.time.LocalTime

class CheckTimeSlotAvailabilityUseCase {
    fun execute(
        requestedStartTime: LocalTime,
        serviceDurationMinutes: Long,
        existingAppointments: List<Appointment>
    ): Boolean {
        val requestedEndTime = requestedStartTime.plusMinutes(serviceDurationMinutes)

        for (appointment in existingAppointments) {
            if (appointment.status == AppointmentStatus.CANCELLED) continue

            val existingStartTime = LocalTime.parse(appointment.time)
            val existingEndTime = existingStartTime.plusMinutes(appointment.durationMinutes.toLong())

            val isOverlapping = requestedStartTime.isBefore(existingEndTime) && 
                                requestedEndTime.isAfter(existingStartTime)

            if (isOverlapping) {
                return false
            }
        }
        return true
    }
}`
  },
  {
    path: '.github/workflows/android-build-apk.yml',
    language: 'yaml',
    description: 'پایپ‌لاین گیت‌هاب اکشنز جهت ساخت خودکار فایل APK در فضای ابری',
    content: `name: Build Android Debug APK

on:
  push:
    branches: [ "main" ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Repository
      uses: actions/checkout@v4

    - name: Set up JDK 17
      uses: actions/setup-java@v4
      with:
        java-version: '17'
        distribution: 'temurin'
        cache: gradle

    - name: Grant execute permission for gradlew
      run: chmod +x gradlew

    - name: Build Debug APK with Gradle
      run: ./gradlew assembleDebug --stacktrace

    - name: Upload APK Artifact
      uses: actions/upload-artifact@v4
      with:
        name: Zibano-App-Debug.apk
        path: app/build/outputs/apk/debug/app-debug.apk
        retention-days: 14`
  }
];
