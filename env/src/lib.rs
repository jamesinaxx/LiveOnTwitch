use wasm_bindgen::prelude::*;

const ENV_FILE: &str = include_str!("../../.env");

#[wasm_bindgen]
pub struct EnvFile {
    client_id: String,
    client_secret: String,
}

#[wasm_bindgen]
impl EnvFile {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        let mut client_id = String::new();
        let mut client_secret = String::new();

        for line in ENV_FILE.lines() {
            let parts: Vec<&str> = line.split('=').collect();
            if parts.len() == 2 {
                if parts[0] == "CLIENT_ID" {
                    client_id = parts[1].to_string();
                } else if parts[0] == "CLIENT_SECRET" {
                    client_secret = parts[1].to_string();
                }
            }
        }

        Self {
            client_id,
            client_secret,
        }
    }

    #[wasm_bindgen(getter)]
    pub fn client_id(&self) -> String {
        Self::new().client_id
    }

    #[wasm_bindgen(getter)]
    pub fn client_secret(&self) -> String {
        Self::new().client_secret
    }
}

impl Default for EnvFile {
    fn default() -> Self {
        Self::new()
    }
}
