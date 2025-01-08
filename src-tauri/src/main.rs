#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::fs;
use std::path::Path;
use tauri::command;
use serde::{Deserialize, Serialize};
use serde_json::json;

// Структура для регистрации (username, email, password)
#[derive(Deserialize, Serialize, Clone)]
struct RegistrationData {
    username: String,
    email: String,
    password: String,
}

// Структура для входа (только email и password)
#[derive(Deserialize, Serialize, Clone)]
struct LoginData {
    email: String,
    password: String,
}

#[command]
fn save_registration(data: RegistrationData) -> Result<String, String> {
    let file_path = Path::new("registration_data.json");

    let mut all_data = if file_path.exists() {
        let content = fs::read_to_string(file_path)
            .map_err(|err| format!("Failed to read file: {}", err))?;
        serde_json::from_str(&content).unwrap_or_else(|_| vec![])
    } else {
        vec![]
    };

    // Добавление данных
    all_data.push(data);

    let serialized = serde_json::to_string_pretty(&all_data)
        .map_err(|err| format!("Failed to serialize data: {}", err))?;
    fs::write(file_path, serialized)
        .map_err(|err| format!("Failed to write to file: {}", err))?;

    Ok("Registration data saved successfully!".to_string())
}

#[command]
fn login_user(data: LoginData) -> Result<String, String> {
    let file_path = Path::new("registration_data.json");
    if file_path.exists() {
        let content = fs::read_to_string(file_path)
            .map_err(|err| format!("Failed to read file: {}", err))?;
        let all_data: Vec<RegistrationData> = serde_json::from_str(&content)
            .map_err(|_| "Failed to parse data".to_string())?;

        // Поиск пользователя по email и password
        if let Some(user) = all_data.iter().find(|user| user.email == data.email && user.password == data.password) {
            // Отправляем имя пользователя обратно
            return Ok(format!("Login successful! Welcome, {}!", user.username));
        }
    }
    Err("Invalid credentials".to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save_registration, login_user])
        .run(tauri::generate_context!())
        .expect("Error running Tauri application");
}
