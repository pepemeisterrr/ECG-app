#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use std::path::Path;
use log::{info, warn};

#[tauri::command]
fn read_file(file_path: &str) -> Result<String, String> {
    // Проверяем, существует ли файл
    if !Path::new(file_path).exists() {
        return Err(format!("File does not exist: {}", file_path));
    }
    fs::read_to_string(file_path).map_err(|e| e.to_string())
}

#[tauri::command]
fn write_file(file_path: &str, contents: &str) -> Result<(), String> {
    // Создаем папку, если она не существует
    if let Some(parent) = Path::new(file_path).parent() {
        if !parent.exists() {
            info!("Creating directory: {:?}", parent);
            fs::create_dir_all(parent).map_err(|e| e.to_string())?;
        }
    }

    // Записываем данные в файл
    info!("Writing to file: {}", file_path);
    fs::write(file_path, contents).map_err(|e| e.to_string())
}

#[tauri::command]
fn register_user(email: String, username: String, password: String) -> Result<(), String> {
    // Логируем информацию о регистрации
    info!("New user registered: email={}, username={}", email, username);

    // Читаем текущих пользователей из файла
    let file_path = "data/users.json";
    let users_data = read_file(file_path).unwrap_or_else(|_| "[]".to_string()); // Если файла нет, используем пустой массив
    let mut users: Vec<serde_json::Value> = serde_json::from_str(&users_data).map_err(|e| e.to_string())?;

    // Проверяем, существует ли пользователь с таким email
    if users.iter().any(|user| user["email"] == email) {
        return Err("User with this email already exists".to_string());
    }

    // Добавляем нового пользователя
    let new_user = serde_json::json!({
        "email": email,
        "username": username,
        "password": password,
    });
    users.push(new_user);

    // Сохраняем обновлённый список пользователей в файл
    write_file(file_path, &serde_json::to_string(&users).map_err(|e| e.to_string())?)?;

    Ok(())
}

#[tauri::command]
fn login_user(email: String, password: String) -> Result<String, String> {
    // Логируем попытку входа
    info!("User attempting to log in: email={}", email);

    // Читаем текущих пользователей из файла
    let file_path = "data/users.json";
    let users_data = read_file(file_path).unwrap_or_else(|_| "[]".to_string()); // Если файла нет, используем пустой массив
    let users: Vec<serde_json::Value> = serde_json::from_str(&users_data).map_err(|e| e.to_string())?;

    // Ищем пользователя с указанными email и паролем
    if let Some(user) = users.iter().find(|user| user["email"] == email && user["password"] == password) {
        info!("User logged in successfully: email={}", email);
        Ok(user["username"].as_str().unwrap_or("").to_string()) // Возвращаем имя пользователя
    } else {
        warn!("Login failed: email={}", email);
        Err("Invalid email or password".to_string())
    }
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // Настройка логирования
            app.handle().plugin(
                tauri_plugin_log::Builder::default()
                    .level(log::LevelFilter::Info) // Логируем INFO и выше (INFO, WARN, ERROR)
                    .build(),
            )?;

            // Проверяем, существует ли папка data
            let data_dir = "data";
            if !Path::new(data_dir).exists() {
                info!("Creating data directory: {}", data_dir);
                fs::create_dir_all(data_dir).map_err(|e| e.to_string())?;
            }

            // Проверяем, существует ли файл users.json
            let users_file = "data/users.json";
            if !Path::new(users_file).exists() {
                info!("Creating users file: {}", users_file);
                write_file(users_file, "[]")?; // Создаём файл с пустым массивом пользователей
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![read_file, write_file, register_user, login_user])
        .run(tauri::generate_context!())
        .expect("Failed to run Tauri application");
}