#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::fs;
use std::path::Path;
use tauri::command;
use serde::Deserialize;
use serde_json::json;

// Structure to represent registration data
#[derive(Deserialize)]
struct RegistrationData {
    username: String,
    email: String,
    password: String,
}

#[command]
fn save_registration(data: RegistrationData) -> Result<String, String> {
    let file_path = Path::new("registration_data.json");

    // Read existing data if the file exists
    let mut all_data = if file_path.exists() {
        let content = fs::read_to_string(file_path)
            .map_err(|err| format!("Failed to read file: {}", err))?;
        serde_json::from_str(&content).unwrap_or_else(|_| vec![])
    } else {
        vec![]
    };

    // Add new data to the array
    all_data.push(json!({
        "username": data.username,
        "email": data.email,
        "password": data.password,
    }));

    // Serialize the updated data and save it back to the file
    let serialized = serde_json::to_string_pretty(&all_data)
        .map_err(|err| format!("Failed to serialize data: {}", err))?;
    fs::write(file_path, serialized)
        .map_err(|err| format!("Failed to write to file: {}", err))?;

    Ok("Registration data saved successfully!".to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save_registration])
        .run(tauri::generate_context!())
        .expect("Error running Tauri application");
}
