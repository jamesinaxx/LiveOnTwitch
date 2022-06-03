use wasm_bindgen::prelude::*;

const ENV_FILE: &str = include_str!("../../.env");

#[wasm_bindgen]
pub struct EnvFile {
    pub client_id: &'static str,
    pub client_secret: &'static str,
}

#[wasm_bindgen]
impl EnvFile {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        let mut client_id = "";
        let mut client_secret = "";

        for line in ENV_FILE.lines() {
            let parts: Vec<&str> = line.split('=').collect();
            if parts.len() == 2 {
                if parts[0] == "CLIENT_ID" {
                    client_id = parts[1];
                } else if parts[0] == "CLIENT_SECRET" {
                    client_secret = parts[1];
                }
            }
        }

        Self {
            client_id,
            client_secret,
        }
    }
}

impl Default for EnvFile {
    fn default() -> Self {
        Self::new()
    }
}
